# Cómo aplicar "Ojo Amigo" en países de bajos recursos

## 1. Primero, la medicina: muchos ciegos no necesitan tecnología, sino cirugía

Según la OMS, la **catarata** es la primera causa de ceguera en el mundo, y el **error refractivo
no corregido** es una de las principales causas de discapacidad visual. Ambas se resuelven con
una cirugía barata o con unos lentes comunes.

**Regla del programa:** toda persona que entra al proyecto pasa antes por un tamizaje oftalmológico
y, si corresponde, se deriva a cirugía o a corrección óptica. Los lentes asistivos son para quienes
**no tienen tratamiento** (glaucoma avanzado, retinopatía diabética terminal, trauma, causas congénitas).
Esto le da al proyecto credibilidad médica frente a ministerios y financiadores.

## 2. El dispositivo: componentes y costo estimado

| Componente | Opción | Costo aprox. (USD) |
|---|---|---|
| Celular Android usado o reacondicionado (2 GB de RAM o más, cámara trasera) | Donaciones o compra al por mayor | 30 – 60 |
| Montura: lentes con soporte de celular, o arnés de pecho (más estable y con menos calor en la cara) | Impresión 3D local o banda elástica | 3 – 10 |
| Audífono de conducción ósea, o uno solo de un lado (no tapa los sonidos del tránsito) | Genérico | 5 – 15 |
| Batería externa (powerbank) | 5000 mAh | 5 – 8 |
| **Total por kit** | | **≈ 45 – 90** |

Como referencia, los dispositivos comerciales de este tipo cuestan entre USD 1.000 y 4.500.

**Decisión clave:** el **arnés de pecho** suele ser mejor que unos lentes en la primera versión.
La cámara queda más estable, el cuello no se cansa y el teléfono no calienta la cara.
Los "lentes" pueden venir en la versión 2, con una cámara pequeña conectada al teléfono.

## 3. Modelo de entrega: no se reparte un aparato, se entrega un servicio

La tecnología falla si se entrega en una caja. El modelo recomendado:

1. **Socio local**: una asociación o escuela de ciegos, una ONG oftalmológica o el ministerio de salud.
2. **Capacitadores locales**: personas ciegas formadas como instructores (de par a par). Esto genera empleo y confianza.
3. **Entrenamiento**: de 3 a 5 sesiones que combinan la app con el bastón, nunca en su reemplazo.
4. **Seguimiento**: llamada a los 7 días, visita al mes y control a los 3 meses. Se registran el uso y los problemas.
5. **Mantenimiento**: punto local de reparación y reemplazo de baterías.

## 4. Piloto propuesto (6 meses, 30 a 50 usuarios)

- **Población:** adultos con ceguera o baja visión severa sin tratamiento disponible, previamente evaluados por un oftalmólogo.
- **Resultados a medir** (con instrumentos validados en lo posible):
  - Movilidad: tiempo y número de choques en un recorrido estandarizado, con y sin el dispositivo.
  - Actividades diarias: leer un medicamento, identificar objetos y encontrar una puerta.
  - Calidad de vida y funcionamiento visual: por ejemplo, NEI VFQ-25 o una escala de autonomía.
  - Uso real: horas por semana, abandono a los 3 meses y causas.
  - **Seguridad**: caídas, choques y falsas alarmas (eventos adversos).
- **Ética:** aprobación de un comité de ética (IRB) local y de uno en EE. UU. si la institución es estadounidense, más consentimiento informado accesible (en audio).

## 5. Gestión de riesgos (su especialidad)

Matriz inicial según el enfoque de la norma ISO 14971:

| Peligro | Causa | Consecuencia | Mitigación |
|---|---|---|---|
| El sistema no detecta un obstáculo (falso negativo) | Mala luz o un objeto que el modelo no conoce | Choque o caída | Uso **siempre con bastón**, entrenamiento y advertencia en la app |
| Exceso de confianza del usuario | Mensaje de "todo despejado" | Accidente al cruzar la calle | La app **nunca dice "despejado"** ni guía para cruzar calles |
| Falsas alarmas | Errores del modelo | Fatiga y abandono del dispositivo | Umbral ajustable y anuncio solo de lo prioritario |
| La batería se agota en la calle | Uso continuo | Pérdida de la ayuda | Powerbank y aviso de batería baja (pendiente de implementar) |
| Robo del teléfono | Equipo visible | Pérdida económica y riesgo personal | Arnés discreto y teléfono de bajo valor |
| Privacidad | La cámara graba a terceros | Problemas legales o sociales | Procesamiento local, **sin guardar imágenes** |
| Error de lectura de un medicamento | Texto poco legible | Error de medicación | La app avisa cuando no está segura; verificación con otra persona |

## 6. Regulación (EE. UU. y los países destino)

- En EE. UU., un software o accesorio que ayuda a orientarse o a leer, **sin diagnosticar ni tratar**,
  puede caer en una categoría de bajo riesgo de la FDA. Hay que **confirmarlo con un asesor regulatorio**,
  y conviene no hacer afirmaciones médicas en el marketing.
- En los países destino, las agencias locales (por ejemplo INVIMA, DIGEMID, ANMAT o ARCSA)
  tienen sus propias reglas. Para un piloto de investigación suele bastar con la aprobación ética,
  pero hay que verificarlo en cada caso.
- Para el futuro: un sistema de calidad tipo ISO 13485 si se escala como producto.

## 7. Financiamiento posible (por verificar en cada convocatoria)

- **NIH / National Eye Institute**: fondos SBIR/STTR para pequeñas empresas de tecnología en salud.
- **NSF**: programas de innovación (SBIR, I-Corps para validar el mercado).
- **ATscale** (alianza global de tecnologías de apoyo) y el programa **GATE de la OMS**.
- Fundaciones de salud visual (Lions Clubs International Foundation, Seva, CBM, Orbis).
- Universidades: los departamentos de ingeniería e informática pueden aportar estudiantes y prototipos.

## 8. Hoja de ruta

| Fase | Plazo | Entregable |
|---|---|---|
| 0. Prototipo de software | Hecho | Esta app |
| 1. Validación con usuarios | 1 – 2 meses | Pruebas con 5 a 10 personas ciegas en EE. UU. (asociaciones locales de ciegos) y ajustes |
| 2. Montura y kit | 2 – 3 meses | Arnés o lentes impresos en 3D y kit completo |
| 3. Socio en el país destino | En paralelo | Acuerdo con una ONG o un ministerio y aprobación ética |
| 4. Piloto | 6 meses | 30 a 50 usuarios con datos de resultados |
| 5. Publicación y escalamiento | Después | Artículo científico y postulación a fondos mayores |

## 9. Mejoras técnicas pendientes

- Estimar la distancia con más precisión (modelo de profundidad monocular).
- Detectar bordes de escaleras, hoyos y desniveles, que son el riesgo número uno y COCO-SSD no los detecta.
- Reconocer billetes de la moneda local.
- Modo con internet opcional: descripción detallada de la escena con un modelo de visión y lenguaje.
- Aviso de batería baja.
- Mandos por voz y por gestos (sin mirar la pantalla).
- Empaquetar las librerías y el idioma dentro de la app para que funcione 100 % sin internet desde la instalación.
