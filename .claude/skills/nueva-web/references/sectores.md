# Playbooks por sector

Lee solo el bloque del sector del negocio. Son puntos de partida: valídalos con los resultados reales de la zona (fase 2). `{loc}` es la localidad y `{zona}`, la comarca o la provincia.

¿El sector no está? Aplica la misma plantilla: busca en schema.org el subtipo más específico de `LocalBusiness`, define una página por servicio, las búsquedas servicio + zona con sus dudas típicas y las señales de confianza propias del sector.

Sectores: vehículos de ocasión · taller · restauración · alojamiento · salud · abogados y asesorías · inmobiliaria · reformas e instaladores · peluquería y estética · deporte · comercio local · agroalimentario · turismo activo · eventos y bodas · formación · B2B.

## Concesionario o compraventa de vehículos de ocasión

- **Schema**: `AutoDealer`; cada vehículo como `Car` + `Offer` (precio, disponibilidad, `mileageFromOdometer`, año, combustible, cambio). Listados con `ItemList`. Comprueba en la documentación de Google si el resultado enriquecido de vehículos está disponible en España; aunque no lo esté, el marcado ayuda a entender la ficha.
- **Búsquedas**: coches de segunda mano {loc} / {zona} · coches de ocasión {zona} · {marca} {modelo} segunda mano · coches km 0 {zona} · concesionario multimarca {loc} · furgonetas de segunda mano {zona} · compramos tu coche {loc} · financiar coche de segunda mano.
- **Páginas**: stock con filtros (listados indexables por marca o carrocería solo si hay volumen) · ficha por vehículo (URL propia, fotos reales, ficha técnica completa) · financiación · garantía · tasación o compra de tu coche · sobre nosotros · contacto.
- **Contenido relacionado**: qué revisar al comprar un coche de ocasión · cómo funciona la garantía en vehículos de ocasión · etiqueta ambiental de la DGT y zonas de bajas emisiones · cómo es la transferencia · gasolina, diésel o híbrido según el uso.
- **Confianza y conversión**: precio claro, kilómetros y año reales, garantía y financiación explicadas, WhatsApp con la referencia del coche ya escrita, fotos propias de cada unidad.
- **Ojo**: un vehículo vendido no se borra sin más: deja un tiempo la ficha marcada como "Vendido" con alternativas y después redirige con 301 a su listado; nada de 404 en masa. Fotos de móvil en HEIC: pipeline de conversión (patrón GuadiCar).

## Taller mecánico, chapa y pintura, neumáticos

- **Schema**: `AutoRepair` (chapa y pintura: `AutoBodyShop`; neumáticos: `TireShop`), con cada servicio como `Service`.
- **Búsquedas**: taller mecánico {loc} · taller de coches cerca de {ciudad} · mecánico {loc} · pre ITV {loc} · cambio de aceite {loc} precio · cambio de embrague precio · diagnosis {loc} · carga de aire acondicionado {loc} · chapa y pintura {loc} · neumáticos {loc} · taller {marca} {loc}.
- **Páginas**: una por servicio con demanda (mantenimiento, frenos, embrague, distribución, diagnosis, aire acondicionado, pre-ITV, neumáticos, chapa y pintura) · marcas con las que trabaja · cita previa · contacto.
- **Contenido relacionado**: cada cuánto cambiar el aceite y la correa de distribución · qué revisan en la ITV · qué significa cada testigo del cuadro · ruidos al frenar · cuándo cambiar los neumáticos.
- **Confianza y conversión**: presupuesto previo, garantía de la reparación (la real), marcas y equipos, fotos del taller, cita por WhatsApp y horario muy visible.

## Restaurante, bar, cafetería

- **Schema**: `Restaurant` (o `BarOrPub`, `CafeOrCoffeeShop`) con `servesCuisine`, `hasMenu` (URL de la carta), `acceptsReservations` y `priceRange` si lo confirman.
- **Búsquedas**: restaurante {loc} · dónde comer en {loc} · restaurante {tipo de cocina} {loc} · menú del día {loc} · restaurante para grupos o celebraciones {loc} · restaurante con terraza {loc} · {plato típico} {loc} · restaurante cerca de {monumento o lugar}.
- **Páginas**: carta en HTML (en PDF ni posiciona ni se lee bien en el móvil) · menú del día · reservas · grupos y celebraciones · galería · cómo llegar.
- **Contenido relacionado**: qué ver o hacer cerca · la historia de la casa o de sus platos · productos locales que usan (DOP y proveedores reales).
- **Confianza y conversión**: fotos reales de platos y del local, horario siempre al día (festivos incluidos), botón de reserva o de llamada y alérgenos en la carta (información obligatoria según el Reglamento UE 1169/2011).
- **Ojo**: los agregadores (TripAdvisor, TheFork) y la propia ficha de Google dominan "restaurante {loc}". La ficha y una carta indexable son la prioridad.

## Alojamiento rural, hotel, apartamentos turísticos

- **Schema**: `LodgingBusiness` o subtipo (`Hotel`, `BedAndBreakfast`, `Campground`…) con `amenityFeature`, `checkinTime`, `checkoutTime`, `petsAllowed` y `numberOfRooms` si son datos reales.
- **Búsquedas**: casa rural {comarca} · casa rural con piscina {zona} · casa rural para grupos {zona} · alojamiento cerca de {atracción} · escapada rural Extremadura · casa rural que admite perros {zona} · hotel {loc}.
- **Páginas**: alojamiento (una por casa o tipo de habitación) · tarifas y disponibilidad (o enlace al motor de reservas) · qué hacer en la zona · cómo llegar · galería · contacto y reservas.
- **Contenido relacionado**: rutas, miradores, fiestas y gastronomía de la comarca; planes por temporada (floración, berrea, otoño…). Es la gran fuente de búsquedas relacionadas en turismo.
- **Confianza y conversión**: número de inscripción en el registro turístico visible (la normativa autonómica lo exige en la publicidad de alojamientos; pídeselo), fotos reales de cada estancia, normas claras y, si el cliente la ofrece, ventaja por reservar directo frente a las plataformas.
- **Idiomas**: el inglés y el portugués suelen compensar.

## Salud: dental, fisioterapia, podología, óptica, psicología, clínicas

- **Schema**: `Dentist`, `Physiotherapy`, `Podiatric`, `Optician`, `MedicalClinic` o `MedicalBusiness`; los profesionales, como `Person` con `jobTitle`.
- **Búsquedas**: dentista {loc} · clínica dental {loc} · implantes dentales {loc} precio · ortodoncia invisible {loc} · urgencias dentales {loc} · fisioterapeuta {loc} · fisioterapia deportiva {loc} · podólogo {loc} · psicólogo {loc}.
- **Páginas**: una por tratamiento · equipo (con número de colegiado) · primera visita · financiación (si la hay) · contacto y cita.
- **Contenido relacionado**: las dudas de cada tratamiento (duración, dolor, cuidados), con contenido revisado y firmado por el profesional.
- **Confianza y conversión**: número de registro sanitario del centro y de colegiado de los profesionales (en la publicidad sanitaria suelen ser obligatorios: pídelos), fotos reales del equipo y la clínica, cita online.
- **Ojo**: es contenido YMYL (salud): nada de promesas de resultados, nada de "antes y después" sin consentimiento, y autoría y fecha de revisión visibles. Doctoralia y similares compiten en las búsquedas genéricas.

## Abogados, asesorías, gestorías, seguros

- **Schema**: `LegalService` (no `Attorney`, que está obsoleto), `AccountingService`, `InsuranceAgency` o `ProfessionalService`.
- **Búsquedas**: abogado {especialidad} {loc} (divorcios, herencias, laboral, accidentes de tráfico) · abogado {especialidad} {provincia} · asesoría fiscal {loc} · gestoría {loc} · asesoría para autónomos {loc} · declaración de la renta {loc} · transferencia de vehículos {loc} · seguros {tipo} {loc}.
- **Páginas**: una por área o servicio · equipo (con colegiación) · cómo trabajamos o primera consulta (honorarios, solo si los publican) · contacto.
- **Contenido relacionado**: plazos, trámites y documentación de cada servicio; calendario fiscal; guías revisadas por el profesional, con fecha de actualización.
- **Confianza y conversión**: número de colegiado y colegio, años y especialidades reales, confidencialidad, respuesta rápida.
- **Ojo**: es YMYL y el contenido legal o fiscal caduca: fecha de revisión visible y un recordatorio de actualizarlo en el informe de entrega.

## Inmobiliaria

- **Schema**: `RealEstateAgent`; cada inmueble con `Offer` + `SingleFamilyResidence`, `Apartment` o `House` (y `RealEstateListing` para la página del anuncio, si encaja).
- **Búsquedas**: inmobiliaria {loc} · pisos en venta {loc} · casas en venta {loc} · alquiler de pisos {loc} · vender mi casa {loc} · tasación de vivienda {loc} · fincas rústicas en venta {provincia} · naves en venta {loc}.
- **Páginas**: buscador de inmuebles · ficha por inmueble · vender tu casa o valoración · zonas y barrios · sobre nosotros · contacto.
- **Contenido relacionado**: gastos e impuestos de una compraventa, cómo saber cuánto vale mi casa, guías de cada barrio o pueblo.
- **Confianza y conversión**: fotos reales, datos completos, calificación energética en cada anuncio (obligatoria en la publicidad de venta y alquiler) y contacto con la referencia del inmueble.
- **Ojo**: Idealista y Fotocasa dominan las genéricas; el valor está en "vender mi casa {loc}", las fincas y las zonas concretas. Inmuebles vendidos: igual que en vehículos, nada de 404 en masa.

## Reformas, construcción e instaladores (toldos, aluminio, electricidad, fontanería, climatización, solar)

- **Schema**: `HomeAndConstructionBusiness` o subtipo (`GeneralContractor`, `Electrician`, `Plumber`, `HVACBusiness`, `RoofingContractor`, `HousePainter`, `Locksmith`).
- **Búsquedas**: reformas {loc} · reforma de baño o cocina {loc} precio · reforma integral {loc} · toldos {loc} · toldos a medida {zona} · pérgolas bioclimáticas {zona} · cerramientos de aluminio {loc} · electricista {loc} · electricista urgente {loc} · fontanero {loc} · instalación de aire acondicionado {loc} · placas solares {loc}.
- **Páginas**: una por servicio o producto · proyectos realizados (cada uno con ubicación, fotos reales y descripción) · presupuesto · zonas de servicio · contacto.
- **Contenido relacionado**: cuánto cuesta reformar un baño · tipos de toldo y cuál elegir · pérgola bioclimática o toldo · permisos de obra en {loc} · ayudas vigentes (solo con fuente oficial y fecha).
- **Confianza y conversión**: proyectos reales con su localidad ("Reforma de cocina en Don Benito"), garantías, carnés e instalador autorizado, marcas que instalan y presupuesto sin compromiso si es real.
- **Ojo**: los proyectos por localidad son la forma legítima de posicionar en varios pueblos, en lugar de páginas de zona clonadas.

## Peluquería, barbería, estética, uñas

- **Schema**: `HairSalon`, `BeautySalon`, `NailSalon` o `DaySpa`.
- **Búsquedas**: peluquería {loc} · barbería {loc} · centro de estética {loc} · mechas balayage {loc} · depilación láser {loc} precio · uñas {loc} · peluquería de novias {loc} · tratamiento facial {loc}.
- **Páginas**: servicios con precios (si quieren publicarlos) · reserva online (su herramienta actual, si ya tienen una) · trabajos o galería · equipo · contacto.
- **Contenido relacionado**: cuidados después de cada servicio, preparación de novias, tendencias de temporada.
- **Confianza y conversión**: fotos reales de trabajos (con permiso), precios claros, reserva en dos toques e Instagram enlazado.

## Gimnasio, entrenador personal, centro deportivo, academias de baile o artes marciales

- **Schema**: `ExerciseGym`, `HealthClub`, `SportsActivityLocation` o `SportsClub`; un entrenador personal, como `ProfessionalService` o `Person`.
- **Búsquedas**: gimnasio {loc} · entrenador personal {loc} · crossfit {loc} · pilates {loc} · yoga {loc} · preparación física para oposiciones {loc} · clases de {actividad} {loc}.
- **Páginas**: actividades o clases · horarios · tarifas · instalaciones · equipo · prueba o primera clase (si existe) · contacto.
- **Contenido relacionado**: rutinas para empezar, preparación de pruebas físicas (con la convocatoria oficial como fuente), nutrición básica revisada por un profesional.
- **Confianza y conversión**: horario de clases al día, fotos reales, titulaciones del equipo, alta o reserva fácil.

## Comercio local (moda, deporte, ferretería, electrodomésticos, mascotas, flores…)

- **Schema**: `Store` o subtipo (`ClothingStore`, `SportingGoodsStore`, `HardwareStore`, `ElectronicsStore`, `PetStore`, `Florist`, `FurnitureStore`, `BikeStore`…).
- **Búsquedas**: {producto} en {loc} · tienda de {categoría} {loc} · {marca} {loc} · {producto} cerca de {ciudad}.
- **Páginas**: categorías · marcas (si son distribuidores oficiales, que lo acrediten) · servicios (montaje, reparación, envío) · contacto y cómo llegar.
- **Contenido relacionado**: guías de compra (cómo elegir {producto}), cuidados y mantenimiento.
- **Confianza y conversión**: horario, stock o "pregunta por WhatsApp", marcas reales y fotos de la tienda.
- **Ojo**: si quieren vender online, es otro proyecto (ver el stack en la fase 4 de SKILL.md).

## Agroalimentario y productores (aceite, vino, jamón ibérico, queso, pimentón…)

- **Schema**: `Organization` o `LocalBusiness` (`Winery` en bodegas) + `Product` para cada producto; `Store` si hay tienda física.
- **Búsquedas**: {producto} de Extremadura · comprar {producto} online · {producto} DOP {denominación} · bodega {DO} · visitas a bodegas {zona} · enoturismo u oleoturismo {zona} · {producto} para regalo de empresa.
- **Páginas**: productos (fichas completas) · elaboración y origen · tienda o dónde comprar · visitas y experiencias · profesionales y distribución (B2B) · contacto.
- **Contenido relacionado**: cómo cortar o conservar el producto, maridajes, recetas, diferencias entre categorías (p. ej. tipos de jamón ibérico según la norma de calidad).
- **Confianza y conversión**: DOP, IGP y premios solo si son reales (los logos oficiales, solo con autorización), trazabilidad, fotos del campo y del proceso.
- **Idiomas**: la exportación suele justificar el inglés (y portugués o francés, según el mercado).

## Turismo activo, experiencias y guías

- **Schema**: `LocalBusiness` o `TravelAgency`; las actividades, como `TouristTrip` o como `Event` si tienen fecha, con precio, duración y punto de encuentro reales.
- **Búsquedas**: {actividad} {zona} (kayak, rutas a caballo, observación de aves, senderismo guiado) · qué hacer en {comarca} · actividades para niños {zona} · planes de fin de semana en {zona} · turismo activo Extremadura.
- **Páginas**: una ficha por actividad (duración, nivel, precio, qué incluye, punto de encuentro) · calendario · reservas · la zona · galería · FAQ.
- **Contenido relacionado**: guías de la zona por temporada, rutas, qué llevar, mejores épocas.
- **Confianza y conversión**: registro como empresa de turismo activo, seguros, titulación de los guías, reseñas reales y reserva fácil.
- **Idiomas**: inglés, y portugués cerca de la frontera.

## Eventos y bodas (fincas, catering, fotografía, música)

- **Schema**: en fincas, `EventVenue` combinado con `LocalBusiness` (`"@type": ["LocalBusiness", "EventVenue"]`); catering y fotografía, como `LocalBusiness` o `ProfessionalService`.
- **Búsquedas**: fincas para bodas {provincia} · salón de celebraciones {loc} · catering para eventos {zona} · fotógrafo de bodas {zona} · comuniones {loc} · espacio para eventos de empresa {zona}.
- **Páginas**: espacios o servicios · bodas · comuniones y celebraciones · empresas · galería por evento real · menús o paquetes · visita y contacto · FAQ (capacidad, fechas, alojamiento, accesos).
- **Contenido relacionado**: cómo organizar una boda en la zona, calendario de preparativos, ideas por temporada.
- **Confianza y conversión**: galerías reales con permiso, capacidad, ubicación y accesos, disponibilidad de fechas y reseñas.

## Academia, formación, autoescuela

- **Schema**: `EducationalOrganization` (+ `LocalBusiness`); los cursos, como `Course` con `provider` apuntando al centro.
- **Búsquedas**: academia de {materia} {loc} · clases particulares {loc} · academia de inglés {loc} · autoescuela {loc} · carnet de {tipo} {loc} precio · preparación de oposiciones {loc} · cursos de {materia} {zona}.
- **Páginas**: una por curso o programa · horarios y modalidades · precios (si los publican) · profesorado · resultados (solo reales y con permiso) · matrícula y contacto.
- **Contenido relacionado**: calendarios de exámenes y convocatorias (con fuente oficial y fecha), consejos de estudio, requisitos.
- **Confianza y conversión**: titulaciones del profesorado, metodología clara y primera clase o prueba de nivel, si existe.

## Empresa B2B, industria y servicios profesionales

- **Schema**: `Organization` o `ProfessionalService`; los productos, con `Product`.
- **Búsquedas**: más nacionales y técnicas: {servicio} para empresas · fabricante de {producto} · {servicio} {provincia} · proveedor de {x} · comparativas y especificaciones.
- **Páginas**: soluciones o servicios · sectores a los que sirven · casos de éxito (reales y con permiso) · sobre nosotros · contacto comercial · fichas técnicas descargables.
- **Contenido relacionado**: guías técnicas, normativa del sector, comparativas de materiales o métodos.
- **Confianza y conversión**: certificaciones reales (ISO, homologaciones), clientes con permiso y un formulario que cualifique (empresa, volumen, plazo).
