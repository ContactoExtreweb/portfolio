#!/usr/bin/env node
/*
  seo-audit.mjs — auditoría SEO (y de scripts inline frente a la CSP) del build estático.

  Uso:
    node seo-audit.mjs [directorio] [--site https://dominio.es] [--json]

  - directorio: salida del build (por defecto "dist"). Con el adapter de Vercel,
    apunta a ".vercel/output/static".
  - --site: dominio final. Comprueba que canonical, Open Graph y sitemap lo usan.
  - --json: salida en JSON en vez de texto.

  Sale con código 1 si hay errores (para usarlo en CI) y con 2 si no encuentra el directorio.
*/

import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

// ---------- argumentos ----------

const args = process.argv.slice(2)
const siteIndex = args.indexOf('--site')
const siteValueIndex = siteIndex === -1 ? -1 : siteIndex + 1
const SITE = siteIndex !== -1 ? (args[siteValueIndex] ?? '').replace(/\/+$/, '') : ''
const AS_JSON = args.includes('--json')
const DIST = args.find((a, i) => !a.startsWith('--') && i !== siteValueIndex) ?? 'dist'

if (siteIndex !== -1 && !/^https?:\/\/[^/]+$/.test(SITE)) {
  console.error('--site debe ser un origen completo, p. ej. --site https://dominio.es')
  process.exit(2)
}

if (!existsSync(DIST) || !statSync(DIST).isDirectory()) {
  console.error(`No existe el directorio "${DIST}". Ejecuta antes "npm run build".`)
  process.exit(2)
}

// ---------- utilidades ----------

const FAKE_ORIGIN = 'https://audit.invalid'
const PLACEHOLDER_HOST = /(^|\.)(localhost|example\.(com|org|net)|127\.0\.0\.1)$/i
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : match
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match
  })
}

const stripTags = (html) => decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()

// Atributos de una etiqueta, respetando comillas (un ">" dentro de un valor no corta la etiqueta).
const ATTRS = `((?:[^>"']|"[^"]*"|'[^']*')*)`

function parseAttrs(source) {
  const out = {}
  const re = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  for (const m of source.matchAll(re)) {
    out[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '')
  }
  return out
}

function findTags(html, tag) {
  const re = new RegExp(`<${tag}\\b${ATTRS}>`, 'gi')
  return [...html.matchAll(re)].map((m) => ({ attrs: parseAttrs(m[1]), index: m.index }))
}

function walkHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return walkHtml(full)
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : []
  })
}

function pagePathFromFile(file) {
  const rel = relative(DIST, file).split(sep).join('/')
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel.slice(0, -'.html'.length)}`
}

const normalizePath = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'
const is404 = (p) => /^\/404\/?$/.test(p)

function safeDecode(pathname) {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

function originOf(url) {
  try {
    return new URL(url).origin
  } catch {
    return ''
  }
}

function hostOf(url) {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

const isFile = (p) => existsSync(p) && statSync(p).isFile()

// Origen del sitio para reconocer URLs absolutas propias: el de --site o, si no se pasa,
// el de la canonical de la home.
function detectOrigin() {
  if (SITE) return SITE
  const home = join(DIST, 'index.html')
  if (!isFile(home)) return ''
  const homeLinks = findTags(readFileSync(home, 'utf8'), 'link').map((t) => t.attrs)
  const canonical = homeLinks.find((l) => (l.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'))
  return canonical?.href ? originOf(canonical.href) : ''
}

const ORIGIN = detectOrigin()

// Devuelve la ruta interna de un href, o null si es externo o no es una página.
function internalPath(href, fromPath) {
  if (!href) return null
  const value = href.trim()
  if (value === '' || value.startsWith('#') || value.startsWith('//')) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    if (!/^https?:/i.test(value)) return null // mailto:, tel:, javascript:…
    if (!ORIGIN || originOf(value) !== ORIGIN) return null // externo
  }
  try {
    const url = new URL(value, `${FAKE_ORIGIN}${fromPath}`)
    return safeDecode(url.pathname)
  } catch {
    return null
  }
}

// ¿Existe esa ruta en el build? Devuelve 'exact' | 'dir-index' | null.
function resolveInDist(pathname) {
  const clean = pathname.replace(/^\/+/, '')
  if (pathname.endsWith('/')) return isFile(join(DIST, clean, 'index.html')) ? 'exact' : null
  if (isFile(join(DIST, clean)) || isFile(join(DIST, `${clean}.html`))) return 'exact'
  if (isFile(join(DIST, clean, 'index.html'))) return 'dir-index'
  return null
}

function collectTypes(node, out) {
  if (Array.isArray(node)) return node.forEach((n) => collectTypes(n, out))
  if (!node || typeof node !== 'object') return
  const type = node['@type']
  if (type) (Array.isArray(type) ? type : [type]).forEach((t) => out.add(String(t)))
  Object.values(node).forEach((v) => collectTypes(v, out))
}

// ---------- CSP: ¿bloqueará la meta CSP algún script inline? ----------

const DATA_SCRIPT_TYPES = /^(application\/(ld\+)?json|text\/(template|x-template|plain|html))$/i

function cspScriptSources(content) {
  const directives = new Map()
  for (const part of content.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/)
    if (name) directives.set(name.toLowerCase(), values)
  }
  return directives.get('script-src') ?? directives.get('default-src') ?? null
}

function inlineScriptsBlockedByCsp(raw, metaCsp) {
  const sources = cspScriptSources(metaCsp.content)
  if (!sources) return []
  const hasHashOrNonce = sources.some((s) => /^'(sha(256|384|512)|nonce)-/i.test(s))
  if (sources.includes("'unsafe-inline'") && !hasHashOrNonce) return []
  const allowed = new Set(sources.filter((s) => /^'sha256-/i.test(s)).map((s) => s.slice(1, -1)))
  const nonces = new Set(sources.filter((s) => /^'nonce-/i.test(s)).map((s) => s.slice(7, -1)))

  const blocked = []
  const re = new RegExp(`<script\\b${ATTRS}>([\\s\\S]*?)</script>`, 'gi')
  for (const m of raw.matchAll(re)) {
    const attrs = parseAttrs(m[1])
    const body = m[2]
    if ('src' in attrs || body.trim() === '') continue
    if (attrs.type && DATA_SCRIPT_TYPES.test(attrs.type.trim())) continue
    if (m.index < metaCsp.index) continue // lo anterior a la <meta> no queda sujeto a esa CSP
    if (attrs.nonce && nonces.has(attrs.nonce)) continue
    const hash = `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`
    if (!allowed.has(hash)) blocked.push({ hash, preview: body.trim().slice(0, 50) })
  }
  return blocked
}

// ---------- auditoría por página ----------

const pages = []
let skipped = 0

for (const file of walkHtml(DIST)) {
  const original = readFileSync(file, 'utf8')
  if (!/<html[\s>]/i.test(original)) {
    skipped++ // fragmentos o archivos de verificación, no páginas
    continue
  }

  const raw = original.replace(/<!--[\s\S]*?-->/g, '')
  const markup = raw.replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, '')
  const head = (markup.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i) ?? [, markup])[1]
  const path = pagePathFromFile(file)
  const errors = []
  const warnings = []
  const notFound = is404(path)

  // <html lang>
  const htmlTag = findTags(markup, 'html')[0]
  if (!htmlTag?.attrs.lang) errors.push('<html> sin atributo lang')

  // metas y links del head
  const metas = findTags(head, 'meta').map((t) => t.attrs)
  const links = findTags(head, 'link').map((t) => t.attrs)
  const metaByName = (name) => metas.find((m) => (m.name ?? '').toLowerCase() === name)?.content
  const metaByProperty = (prop) => metas.find((m) => (m.property ?? '').toLowerCase() === prop)?.content

  if (!metas.some((m) => (m.name ?? '').toLowerCase() === 'viewport')) warnings.push('sin <meta name="viewport">')

  const robots = `${metaByName('robots') ?? ''} ${metaByName('googlebot') ?? ''}`.toLowerCase()
  const noindex = /\bnoindex\b|\bnone\b/.test(robots)
  if (noindex && !notFound) warnings.push('noindex: esta página no se indexará (¿es intencionado?)')

  // title
  const titleMatch = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? stripTags(titleMatch[1]) : ''
  if (!title) errors.push('sin <title>')
  else if (title.length < 15) warnings.push(`title muy corto (${title.length} caracteres): "${title}"`)
  else if (title.length > 65) warnings.push(`title largo (${title.length} caracteres; Google corta hacia 60): "${title}"`)

  // meta description
  const description = (metaByName('description') ?? '').trim()
  if (!description) (notFound ? warnings : errors).push('sin meta description')
  else if (description.length < 70) warnings.push(`description corta (${description.length} caracteres; recomendado 70-160)`)
  else if (description.length > 165) warnings.push(`description larga (${description.length} caracteres; recomendado 70-160)`)

  // canonical
  const canonical = links.find((l) => (l.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'))?.href
  if (!canonical) {
    if (!notFound && !noindex) errors.push('sin <link rel="canonical">')
  } else if (!/^https?:\/\//i.test(canonical)) {
    errors.push(`canonical relativa ("${canonical}"): debe ser absoluta`)
  } else {
    if (PLACEHOLDER_HOST.test(hostOf(canonical))) errors.push(`canonical con dominio de prueba (${canonical}): ¿falta "site" en astro.config?`)
    else if (SITE && !(canonical === SITE || canonical.startsWith(`${SITE}/`))) errors.push(`canonical fuera de ${SITE}: ${canonical}`)
    const canonicalPath = safeDecode(new URL(canonical).pathname)
    if (!notFound) {
      if (normalizePath(canonicalPath) !== normalizePath(path)) warnings.push(`canonical apunta a otra URL (${canonicalPath}); la página está en ${path}`)
      else if (canonicalPath !== path) warnings.push(`canonical con distinta barra final (${canonicalPath}) que la URL real (${path})`)
    }
  }

  // Open Graph
  const missingOg = ['og:title', 'og:description', 'og:image'].filter((p) => !metaByProperty(p))
  if (missingOg.length && !notFound) warnings.push(`faltan metas Open Graph: ${missingOg.join(', ')}`)
  const ogImage = metaByProperty('og:image')
  if (ogImage && !/^https?:\/\//i.test(ogImage)) warnings.push(`og:image relativa ("${ogImage}"): las redes necesitan URL absoluta`)
  if (ogImage && PLACEHOLDER_HOST.test(hostOf(ogImage))) errors.push(`og:image con dominio de prueba (${ogImage})`)

  // hreflang
  const alternates = links
    .filter((l) => (l.rel ?? '').toLowerCase().split(/\s+/).includes('alternate') && l.hreflang)
    .map((l) => ({ lang: l.hreflang, href: l.href, path: internalPath(l.href, path) }))

  // H1
  const h1s = [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  if (h1s.length === 0) errors.push('sin <h1>')
  else if (h1s.length > 1) errors.push(`${h1s.length} <h1> (debe haber uno)`)
  else if (!stripTags(h1s[0][1]) && !/\balt="[^"]+"/i.test(h1s[0][1])) errors.push('<h1> vacío')

  // imágenes
  const imgs = findTags(markup, 'img').map((t) => t.attrs)
  const noAlt = imgs.filter((i) => !('alt' in i))
  if (noAlt.length) errors.push(`${noAlt.length} <img> sin alt (p. ej. ${noAlt[0].src ?? '¿sin src?'}); las decorativas llevan alt=""`)
  const noSize = imgs.filter((i) => !('width' in i) || !('height' in i))
  if (noSize.length) warnings.push(`${noSize.length} <img> sin width/height (riesgo de CLS; p. ej. ${noSize[0].src ?? '¿sin src?'})`)

  // JSON-LD
  const types = new Set()
  const ldRe = new RegExp(`<script\\b${ATTRS}>([\\s\\S]*?)</script>`, 'gi')
  for (const m of raw.matchAll(ldRe)) {
    const attrs = parseAttrs(m[1])
    if ((attrs.type ?? '').trim().toLowerCase() !== 'application/ld+json') continue
    try {
      collectTypes(JSON.parse(m[2]), types)
    } catch (error) {
      errors.push(`JSON-LD que no parsea: ${error.message}`)
    }
  }

  // enlaces internos
  const broken = new Set()
  const noSlash = new Set()
  for (const { attrs } of findTags(markup, 'a')) {
    const target = internalPath(attrs.href, path)
    if (!target) continue
    const found = resolveInDist(target)
    if (!found) broken.add(target)
    else if (found === 'dir-index') noSlash.add(target)
  }
  if (broken.size) errors.push(`${broken.size} enlace(s) interno(s) roto(s): ${[...broken].slice(0, 5).join(', ')}${broken.size > 5 ? '…' : ''}`)
  if (noSlash.size) warnings.push(`enlace(s) sin barra final (provocan redirección): ${[...noSlash].slice(0, 3).join(', ')}${noSlash.size > 3 ? '…' : ''}`)

  // contenido pendiente
  const todos = (raw.match(/\{\{\s*TODO/g) ?? []).length
  if (todos) warnings.push(`${todos} marcador(es) {{TODO}} pendiente(s)`)
  if (/lorem ipsum/i.test(raw)) errors.push('contiene "lorem ipsum"')

  // CSP por <meta>: scripts inline posteriores sin hash
  const metaCspTag = findTags(raw, 'meta').find((t) => (t.attrs['http-equiv'] ?? '').toLowerCase() === 'content-security-policy')
  if (metaCspTag) {
    for (const s of inlineScriptsBlockedByCsp(raw, { content: metaCspTag.attrs.content ?? '', index: metaCspTag.index })) {
      errors.push(`script inline que la CSP bloqueará ("${s.preview}…"): añade '${s.hash}' a security.csp.scriptDirective.hashes o muévelo antes de la <meta>`)
    }
  }

  pages.push({ path, file: relative(DIST, file), title, description, canonical, noindex, notFound, alternates, types: [...types], errors, warnings })
}

// ---------- auditoría del sitio ----------

const siteErrors = []
const siteWarnings = []
const pageByPath = new Map(pages.map((p) => [normalizePath(p.path), p]))
const indexable = pages.filter((p) => !p.noindex && !p.notFound)

if (pages.length === 0) siteErrors.push(`no hay páginas HTML en ${DIST}`)

// títulos y descriptions duplicados
for (const [field, list] of [
  ['title', siteErrors],
  ['description', siteWarnings],
]) {
  const groups = new Map()
  for (const p of indexable) {
    if (!p[field]) continue
    groups.set(p[field], [...(groups.get(p[field]) ?? []), p.path])
  }
  for (const [value, paths] of groups) {
    if (paths.length > 1) list.push(`${field} duplicado en ${paths.join(', ')}: "${value.slice(0, 70)}"`)
  }
}

// hreflang: destinos existentes, autorreferencia y reciprocidad
for (const p of pages) {
  if (!p.alternates.length) continue
  const selfListed = p.alternates.some((a) => a.path && normalizePath(a.path) === normalizePath(p.path))
  if (!selfListed) siteWarnings.push(`${p.path}: sus hreflang no incluyen la propia página`)
  for (const alt of p.alternates) {
    if (!alt.path) continue
    const target = pageByPath.get(normalizePath(alt.path))
    if (!target) {
      siteErrors.push(`${p.path}: hreflang "${alt.lang}" apunta a una página que no existe (${alt.href})`)
      continue
    }
    if (target === p) continue
    const reciprocal = target.alternates.some((a) => a.path && normalizePath(a.path) === normalizePath(p.path))
    if (!reciprocal) siteWarnings.push(`hreflang no recíproco: ${p.path} → ${target.path}, pero ${target.path} no enlaza a ${p.path}`)
  }
}

// robots.txt
const robotsFile = join(DIST, 'robots.txt')
if (!isFile(robotsFile)) {
  siteWarnings.push('no hay robots.txt')
} else {
  const robotsTxt = readFileSync(robotsFile, 'utf8')
  if (!/^\s*sitemap:/im.test(robotsTxt)) siteWarnings.push('robots.txt no declara el sitemap (Sitemap: https://…/sitemap-index.xml)')
  let agents = []
  let inRules = false
  for (const rawLine of robotsTxt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, '').trim()
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim().toLowerCase()
    const value = line.slice(colon + 1).trim()
    if (key === 'user-agent') {
      if (inRules) {
        agents = []
        inRules = false
      }
      agents.push(value.toLowerCase())
    } else if (key === 'allow' || key === 'disallow') {
      inRules = true
      if (key === 'disallow' && value === '/' && agents.includes('*')) siteErrors.push('robots.txt bloquea todo el sitio (Disallow: / para User-agent: *)')
    }
  }
}

// sitemap
const sitemapRoot = ['sitemap-index.xml', 'sitemap.xml'].map((f) => join(DIST, f)).find(isFile)
const sitemapPaths = new Set()
if (!sitemapRoot) {
  siteWarnings.push('no hay sitemap (sitemap-index.xml o sitemap.xml): instala @astrojs/sitemap y define "site"')
} else {
  const locsOf = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => decodeEntities(m[1]))
  const pathOf = (loc) => {
    try {
      return safeDecode(new URL(loc).pathname)
    } catch {
      return null
    }
  }
  // Un dominio mal configurado se repetiría en cada URL: se agrupa por origen.
  const hostProblems = new Set()
  const checkHost = (loc) => {
    const origin = originOf(loc)
    if (PLACEHOLDER_HOST.test(hostOf(loc))) hostProblems.add(`el sitemap usa un dominio de prueba (${origin}): ¿falta "site" en astro.config?`)
    else if (SITE && origin !== SITE) hostProblems.add(`el sitemap usa otro dominio: ${origin || loc} (esperado ${SITE})`)
  }
  const rootXml = readFileSync(sitemapRoot, 'utf8')
  const pageLocs = []
  if (/<sitemapindex[\s>]/i.test(rootXml)) {
    for (const loc of locsOf(rootXml)) {
      checkHost(loc)
      const childPath = pathOf(loc)
      const child = childPath ? join(DIST, childPath.replace(/^\/+/, '')) : ''
      if (!child || !isFile(child)) siteErrors.push(`el índice del sitemap enlaza un archivo que no existe: ${loc}`)
      else pageLocs.push(...locsOf(readFileSync(child, 'utf8')))
    }
  } else {
    pageLocs.push(...locsOf(rootXml))
  }
  for (const loc of pageLocs) {
    checkHost(loc)
    const locPath = pathOf(loc)
    if (!locPath) {
      siteErrors.push(`URL inválida en el sitemap: ${loc}`)
      continue
    }
    sitemapPaths.add(normalizePath(locPath))
    const page = pageByPath.get(normalizePath(locPath))
    if (!page) siteErrors.push(`el sitemap incluye una URL sin página en el build: ${loc}`)
    else if (page.noindex) siteErrors.push(`el sitemap incluye una página con noindex: ${loc}`)
    else if (page.notFound) siteErrors.push(`el sitemap incluye la página 404: ${loc}`)
  }
  siteErrors.push(...hostProblems)
  for (const p of indexable) {
    if (!sitemapPaths.has(normalizePath(p.path))) siteWarnings.push(`${p.path} es indexable y no está en el sitemap`)
  }
}

// ---------- informe ----------

const totalErrors = siteErrors.length + pages.reduce((n, p) => n + p.errors.length, 0)
const totalWarnings = siteWarnings.length + pages.reduce((n, p) => n + p.warnings.length, 0)
const typeCount = new Map()
for (const p of pages) for (const t of p.types) typeCount.set(t, (typeCount.get(t) ?? 0) + 1)

if (AS_JSON) {
  console.log(
    JSON.stringify(
      {
        dist: DIST,
        site: SITE || null,
        summary: { pages: pages.length, errors: totalErrors, warnings: totalWarnings, skippedHtml: skipped },
        site_checks: { errors: siteErrors, warnings: siteWarnings },
        jsonld_types: Object.fromEntries(typeCount),
        pages: pages.map(({ alternates, ...p }) => ({ ...p, hreflang: alternates.map((a) => `${a.lang} → ${a.href}`) })),
      },
      null,
      2,
    ),
  )
} else {
  const out = []
  out.push(`seo-audit · ${DIST}${SITE ? ` · ${SITE}` : ''} · ${pages.length} página(s)`)
  const clean = pages.filter((p) => !p.errors.length && !p.warnings.length)
  for (const p of [...pages].sort((a, b) => a.path.localeCompare(b.path))) {
    if (!p.errors.length && !p.warnings.length) continue
    out.push('', p.path)
    p.errors.forEach((e) => out.push(`  ✖ ${e}`))
    p.warnings.forEach((w) => out.push(`  ⚠ ${w}`))
  }
  if (siteErrors.length || siteWarnings.length) {
    out.push('', 'Sitio')
    siteErrors.forEach((e) => out.push(`  ✖ ${e}`))
    siteWarnings.forEach((w) => out.push(`  ⚠ ${w}`))
  }
  out.push('')
  if (clean.length) out.push(`✓ ${clean.length} página(s) sin incidencias`)
  if (typeCount.size) out.push(`JSON-LD: ${[...typeCount].map(([t, n]) => `${t} (${n})`).join(', ')}`)
  else out.push('JSON-LD: ninguno (añade el del negocio y WebSite)')
  if (skipped) out.push(`(${skipped} archivo(s) .html sin <html> ignorados)`)
  out.push(`Resumen: ${totalErrors} error(es), ${totalWarnings} aviso(s)`)
  console.log(out.join('\n'))
}

process.exit(totalErrors ? 1 : 0)
