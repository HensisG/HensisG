// Ojo Amigo — prototipo de asistente visual para personas ciegas o con baja visión.
// Corre 100 % en el teléfono (sin servidor): detección de objetos con COCO-SSD
// y lectura de texto con Tesseract. Voz con la síntesis del propio teléfono.

const ES = {
  person: 'persona', bicycle: 'bicicleta', car: 'auto', motorcycle: 'moto', airplane: 'avión',
  bus: 'bus', train: 'tren', truck: 'camión', boat: 'bote', 'traffic light': 'semáforo',
  'fire hydrant': 'grifo de incendio', 'stop sign': 'señal de pare', 'parking meter': 'parquímetro',
  bench: 'banca', bird: 'pájaro', cat: 'gato', dog: 'perro', horse: 'caballo', sheep: 'oveja',
  cow: 'vaca', elephant: 'elefante', bear: 'oso', zebra: 'cebra', giraffe: 'jirafa',
  backpack: 'mochila', umbrella: 'paraguas', handbag: 'bolso', tie: 'corbata', suitcase: 'maleta',
  frisbee: 'frisbi', skis: 'esquís', snowboard: 'tabla de nieve', 'sports ball': 'pelota',
  kite: 'volantín', 'baseball bat': 'bate', 'baseball glove': 'guante', skateboard: 'patineta',
  surfboard: 'tabla de surf', 'tennis racket': 'raqueta', bottle: 'botella', 'wine glass': 'copa',
  cup: 'taza', fork: 'tenedor', knife: 'cuchillo', spoon: 'cuchara', bowl: 'plato hondo',
  banana: 'plátano', apple: 'manzana', sandwich: 'sándwich', orange: 'naranja', broccoli: 'brócoli',
  carrot: 'zanahoria', 'hot dog': 'hot dog', pizza: 'pizza', donut: 'dona', cake: 'torta',
  chair: 'silla', couch: 'sofá', 'potted plant': 'macetero', bed: 'cama', 'dining table': 'mesa',
  toilet: 'inodoro', tv: 'televisor', laptop: 'computador', mouse: 'mouse', remote: 'control remoto',
  keyboard: 'teclado', 'cell phone': 'celular', microwave: 'microondas', oven: 'horno',
  toaster: 'tostadora', sink: 'lavamanos', refrigerator: 'refrigerador', book: 'libro',
  clock: 'reloj', vase: 'florero', scissors: 'tijeras', 'teddy bear': 'peluche',
  'hair drier': 'secador', toothbrush: 'cepillo de dientes'
};
// Objetos que importan para la movilidad: se anuncian con prioridad y vibración.
const OBSTACULOS = new Set(['person','bicycle','car','motorcycle','bus','truck','dog','chair',
  'bench','dining table','couch','potted plant','fire hydrant','stop sign','traffic light','horse','cow']);
const VEHICULOS = new Set(['car','motorcycle','bus','truck','bicycle','train']);

const $ = id => document.getElementById(id);
const video = $('video'), lienzo = $('lienzo'), ctx = lienzo.getContext('2d');
const estado = $('estado');
let modelo = null, entornoActivo = false, ocupado = false, ultimoAviso = new Map();

// ---------- Voz ----------
let vozEs = null;
function elegirVoz() {
  const voces = speechSynthesis.getVoices();
  vozEs = voces.find(v => /^es(-|_)(419|MX|US|CL|CO|AR|PE)/i.test(v.lang))
       || voces.find(v => /^es/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { elegirVoz(); speechSynthesis.onvoiceschanged = elegirVoz; }

function hablar(texto, { urgente = false } = {}) {
  estado.textContent = texto;
  if (!('speechSynthesis' in window)) return;
  if (urgente) speechSynthesis.cancel();
  else if (speechSynthesis.speaking || speechSynthesis.pending) return; // no amontonar mensajes
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = vozEs ? vozEs.lang : 'es-419';
  if (vozEs) u.voice = vozEs;
  u.rate = parseFloat($('velocidad').value);
  speechSynthesis.speak(u);
}

function vibrar(patron) { if ($('vibrar').checked && navigator.vibrate) navigator.vibrate(patron); }

// ---------- Geometría: dónde y qué tan cerca ----------
function ubicar([x, y, w, h], W, H) {
  const cx = (x + w / 2) / W;
  const lado = cx < 0.33 ? 'a su izquierda' : cx > 0.67 ? 'a su derecha' : 'al frente';
  const alto = h / H, area = (w * h) / (W * H);
  const prox = (alto > 0.65 || area > 0.35) ? 'muy cerca' : (alto > 0.35 || area > 0.12) ? 'cerca' : 'lejos';
  return { lado, prox, centro: lado === 'al frente' };
}

function nombre(clase) { return ES[clase] || clase; }

// ---------- Cámara y modelo ----------
async function iniciar() {
  $('btnIniciar').disabled = true;
  hablar('Encendiendo cámara…', { urgente: true });
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });
    video.srcObject = stream;
    await video.play();
    lienzo.width = video.videoWidth || 640; lienzo.height = video.videoHeight || 480;
    hablar('Cargando inteligencia artificial. Puede tardar unos segundos la primera vez.', { urgente: true });
    modelo = await cocoSsd.load({ base: 'lite_mobilenet_v2' }); // el más liviano: celulares de gama baja
    ['btnEntorno', 'btnDescribir', 'btnLeer', 'btnDetener'].forEach(b => $(b).disabled = false);
    hablar('Listo. Elija guía de entorno, qué hay frente a mí, o leer texto.', { urgente: true });
    $('btnEntorno').focus();
  } catch (err) {
    console.error(err);
    $('btnIniciar').disabled = false;
    hablar('No pude encender la cámara. Revise los permisos e intente de nuevo.', { urgente: true });
  }
}

async function detectar() {
  const preds = await modelo.detect(video, 20);
  const umbral = parseFloat($('umbral').value);
  const W = video.videoWidth, H = video.videoHeight;
  const res = preds.filter(p => p.score >= umbral).map(p => ({ ...p, ...ubicar(p.bbox, W, H) }));
  dibujar(res);
  return res;
}

function dibujar(res) {
  ctx.clearRect(0, 0, lienzo.width, lienzo.height);
  ctx.lineWidth = 4; ctx.font = '22px system-ui';
  for (const r of res) {
    const [x, y, w, h] = r.bbox;
    ctx.strokeStyle = r.prox === 'muy cerca' ? '#ff4d4d' : '#ffd400';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(nombre(r.class), x + 4, Math.max(22, y - 6));
  }
}

// ---------- Modo 1: guía de entorno continua ----------
async function cicloEntorno() {
  if (!entornoActivo) return;
  if (!ocupado) {
    ocupado = true;
    try {
      const res = await detectar();
      const ahora = Date.now();
      // Primero lo peligroso: obstáculos muy cerca al frente, vehículos cerca.
      const orden = res.sort((a, b) => peso(b) - peso(a));
      const top = orden[0];
      if (top) {
        const clave = top.class + '|' + top.lado + '|' + top.prox;
        const espera = top.prox === 'muy cerca' ? 2500 : 6000;
        if (ahora - (ultimoAviso.get(clave) || 0) > espera) {
          ultimoAviso.set(clave, ahora);
          const peligro = (top.centro && top.prox === 'muy cerca' && OBSTACULOS.has(top.class))
                       || (VEHICULOS.has(top.class) && top.prox !== 'lejos');
          if (peligro) {
            vibrar([200, 80, 200]);
            hablar(`Cuidado: ${nombre(top.class)} ${top.prox}, ${top.lado}.`, { urgente: true });
          } else {
            hablar(`${nombre(top.class)} ${top.lado}, ${top.prox}.`);
          }
        }
      }
    } catch (e) { console.error(e); }
    ocupado = false;
  }
  setTimeout(cicloEntorno, 600);
}
function peso(r) {
  let p = r.score;
  if (OBSTACULOS.has(r.class)) p += 1;
  if (VEHICULOS.has(r.class)) p += 1;
  if (r.prox === 'muy cerca') p += 2; else if (r.prox === 'cerca') p += 1;
  if (r.centro) p += 1;
  return p;
}

function alternarEntorno() {
  entornoActivo = !entornoActivo;
  $('btnEntorno').setAttribute('aria-pressed', String(entornoActivo));
  hablar(entornoActivo ? 'Guía de entorno activada.' : 'Guía de entorno desactivada.', { urgente: true });
  if (entornoActivo) setTimeout(cicloEntorno, 1500);
}

// ---------- Modo 2: describir la escena una vez ----------
async function describir() {
  if (ocupado) return;
  ocupado = true;
  try {
    const res = await detectar();
    if (!res.length) { hablar('No reconozco objetos frente a usted.', { urgente: true }); return; }
    const grupos = {};
    for (const r of res) (grupos[r.class] ||= []).push(r);
    const partes = Object.entries(grupos).map(([c, lista]) => {
      const n = lista.length, cercano = lista.sort((a, b) => b.bbox[3] - a.bbox[3])[0];
      const cant = n === 1 ? `un${['persona','bicicleta','moto','silla','mesa','banca','mochila','botella','taza','señal de pare'].includes(nombre(c)) ? 'a' : ''} ${nombre(c)}` : `${n} ${plural(nombre(c))}`;
      return `${cant} ${cercano.lado}, ${cercano.prox}`;
    });
    hablar('Veo ' + partes.join('; ') + '.', { urgente: true });
  } finally { ocupado = false; }
}
function plural(s) { return /[aeiouáéó]$/.test(s) ? s + 's' : s.endsWith('z') ? s.slice(0, -1) + 'ces' : s + 'es'; }

// ---------- Modo 3: leer texto (carteles, remedios, documentos) ----------
let lector = null;
async function leer() {
  if (ocupado) return;
  ocupado = true;
  const pausado = entornoActivo; entornoActivo = false;
  try {
    hablar('Sostenga el texto quieto frente a la cámara. Leyendo…', { urgente: true });
    const c = document.createElement('canvas');
    c.width = video.videoWidth; c.height = video.videoHeight;
    c.getContext('2d').drawImage(video, 0, 0);
    const limite = new Promise((_, rej) => setTimeout(() => rej(new Error('tiempo')), 45000));
    const { data } = await Promise.race([limite, (async () => {
      if (!lector) lector = await Tesseract.createWorker('spa');
      return lector.recognize(c);
    })()]);
    const texto = (data.text || '').replace(/\s+/g, ' ').trim();
    if (texto.length < 3 || data.confidence < 40) hablar('No pude leer texto claro. Acerque o aleje un poco el papel y vuelva a intentar.', { urgente: true });
    else hablar(texto, { urgente: true });
  } catch (e) {
    console.error(e);
    lector = null;
    hablar(e.message === 'tiempo'
      ? 'La lectura tardó demasiado. La primera vez necesita internet para descargar el idioma.'
      : 'Hubo un problema al leer el texto.', { urgente: true });
  } finally {
    ocupado = false;
    if (pausado) { entornoActivo = true; setTimeout(cicloEntorno, 4000); }
  }
}

function silencio() {
  entornoActivo = false;
  $('btnEntorno').setAttribute('aria-pressed', 'false');
  speechSynthesis.cancel();
  estado.textContent = 'En silencio.';
}

$('btnIniciar').onclick = iniciar;
$('btnEntorno').onclick = alternarEntorno;
$('btnDescribir').onclick = describir;
$('btnLeer').onclick = leer;
$('btnDetener').onclick = silencio;
$('btnEntorno').setAttribute('aria-pressed', 'false');

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
