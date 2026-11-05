# Ojo Amigo — lentes asistivos de bajo costo para personas ciegas

Prototipo de **asistente visual** para personas ciegas o con baja visión, pensado para
**países de bajos recursos**. Usa un **celular Android de gama baja** montado en unos
lentes o en un arnés de pecho como "ojos". El teléfono:

1. **Guía de entorno**: avisa en voz alta qué hay, a qué lado y qué tan cerca
   ("Cuidado: persona muy cerca, al frente"), con vibración ante obstáculos.
2. **¿Qué hay frente a mí?**: describe la escena una sola vez.
3. **Leer texto**: lee carteles, cajas de medicamentos y documentos en español.

Todo se procesa **dentro del teléfono** (sin servidor y sin enviar imágenes a internet).
Después de la primera carga funciona **sin conexión**.

## Cómo probarlo

```bash
cd app
python3 -m http.server 8000
# Abrir http://localhost:8000 en el navegador (Chrome)
```

Para probarlo en un celular se necesita HTTPS, porque la cámara lo exige. La opción más simple
es publicar la carpeta `app/` en GitHub Pages, Netlify o Cloudflare Pages (todos gratuitos)
y abrir el enlace en Chrome para Android. Luego se elige "Agregar a pantalla de inicio".

## Estado

Es un prototipo de investigación, **no un dispositivo médico aprobado**. No reemplaza al
bastón blanco, al perro guía ni a la orientación y movilidad.

Ver el plan de aplicación en terreno: [docs/plan-de-aplicacion.md](docs/plan-de-aplicacion.md).

## Tecnología

- TensorFlow.js + COCO-SSD (`lite_mobilenet_v2`): detección de 80 tipos de objetos.
- Tesseract.js: reconocimiento de texto en español.
- Web Speech API: voz del propio teléfono (sin internet si el teléfono tiene voz en español).
- Service Worker: uso sin conexión.
