/* ============================================================
   profesor-alberto.js  ·  Motor compartido de asistentes · v3 · Nova IA (por defecto) + 3 Profesor Alberto · habilidades, bitácora, banco de conversación, panel movible
   Uso en cada modelo:
     <script src="profesor-alberto.js"></script>
     <script> ProfesorAlberto.init({ ...configuración... }); </script>
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. AVATARES (SVG) ---------- */
  var uid = 0;
  function svg(cuerpo) {
    var id = 'pa' + (++uid);
    return '<svg viewBox="0 30 200 200" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="' + id +
      '"><circle cx="100" cy="130" r="100"/></clipPath></defs><g clip-path="url(#' + id + ')">' + cuerpo + '</g></svg>';
  }
  var fondo = function (c) { return '<circle cx="100" cy="130" r="100" fill="' + c + '"/>'; };
  var hombros = function (c) { return '<path d="M10 260 Q14 190 100 180 Q186 190 190 260Z" fill="' + c + '"/>'; };
  var cuello = '<rect x="88" y="150" width="24" height="32" fill="#E3B48C"/>';
  var orejas = '<circle cx="58" cy="112" r="8" fill="#EBC09B"/><circle cx="142" cy="112" r="8" fill="#EBC09B"/>';
  var cabeza = '<ellipse cx="100" cy="108" rx="42" ry="50" fill="#F2CBA8"/>';
  var nariz = '<path d="M100 112 Q95 124 101 126" stroke="#C48F6A" stroke-width="2" fill="none" stroke-linecap="round"/>';
  var ojos = function (y) {
    return '<circle class="ojo" cx="84" cy="' + y + '" r="3.5" fill="#2B2B33"/><circle class="ojo" cx="116" cy="' + y + '" r="3.5" fill="#2B2B33"/>';
  };
  var cejas = function (c, y) {
    return '<path d="M74 ' + (y + 5) + ' Q84 ' + y + ' 94 ' + (y + 5) + '" stroke="' + c + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M106 ' + (y + 5) + ' Q116 ' + y + ' 126 ' + (y + 5) + '" stroke="' + c + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
  };

  var dibujos = {
    clasico: function () {
      return svg(fondo('#DCE8F5') + hombros('#1F3A5F') + cuello +
        '<path d="M82 180 L100 214 L118 180Z" fill="#FFF"/><path d="M82 180 L100 214 L72 200Z" fill="#17304F"/><path d="M118 180 L100 214 L128 200Z" fill="#17304F"/>' +
        '<path d="M95 184 L105 184 L108 222 L100 232 L92 222Z" fill="#B3262E"/>' +
        orejas + cabeza +
        '<path d="M57 104 Q50 52 100 52 Q150 52 143 104 Q136 76 100 72 Q64 76 57 104Z" fill="#B7BCC5"/>' +
        cejas('#8D929B', 91) + ojos(108) +
        '<rect x="70" y="97" width="27" height="22" rx="6" fill="none" stroke="#2E2E36" stroke-width="2.5"/><rect x="103" y="97" width="27" height="22" rx="6" fill="none" stroke="#2E2E36" stroke-width="2.5"/>' +
        '<path d="M97 106H103M70 104L60 102M130 104L140 102" stroke="#2E2E36" stroke-width="2.5" fill="none"/>' +
        nariz + '<path d="M86 131 Q100 124 114 131 Q100 135 86 131Z" fill="#B7BCC5"/>' +
        '<path class="boca" d="M89 140 Q100 149 111 140" stroke="#9A4B3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>');
    },
    moderno: function () {
      return svg(fondo('#E3F1E6') + hombros('#FFF') + cuello +
        '<path d="M30 260 Q34 196 78 184 L100 224 L122 184 Q166 196 170 260Z" fill="#2F6B4F"/>' +
        '<path d="M100 186 L82 176 L82 196Z M100 186 L118 176 L118 196Z" fill="#8E2A3A"/><circle cx="100" cy="186" r="4.5" fill="#6F1F2C"/>' +
        orejas + cabeza +
        '<path d="M56 100 Q48 50 100 48 Q152 50 144 100 Q140 80 120 74 Q100 64 78 76 Q60 82 56 100Z M88 58 Q100 38 122 52 Q108 52 100 64Z" fill="#4A3426"/>' +
        '<path d="M58 112 Q60 170 100 172 Q140 170 142 112 Q134 134 100 136 Q66 134 58 112Z" fill="#4A3426"/>' +
        cejas('#4A3426', 85) + ojos(106) +
        '<circle cx="84" cy="106" r="13" fill="none" stroke="#1B1B1B" stroke-width="2.5"/><circle cx="116" cy="106" r="13" fill="none" stroke="#1B1B1B" stroke-width="2.5"/>' +
        '<path d="M97 105 Q100 102 103 105" stroke="#1B1B1B" stroke-width="2.5" fill="none"/>' +
        nariz + '<path class="boca" d="M86 143 Q100 160 114 143 Q100 149 86 143Z" fill="#FFF"/>');
    },
    academico: function () {
      return svg(fondo('#F6E7C8') + hombros('#23232B') + cuello +
        '<path d="M84 180 L100 202 L116 180Z" fill="#FFF"/><path d="M72 188 L90 260 L106 260 L86 182Z M128 188 L110 260 L94 260 L114 182Z" fill="#D4A12A"/>' +
        orejas + cabeza +
        '<ellipse cx="60" cy="102" rx="7" ry="15" fill="#ECECEF"/><ellipse cx="140" cy="102" rx="7" ry="15" fill="#ECECEF"/>' +
        '<path d="M66 70 L66 88 Q100 98 134 88 L134 70Z" fill="#23232B"/><path d="M36 62 L100 38 L164 62 L100 82Z" fill="#2E2E3A"/>' +
        '<circle cx="100" cy="60" r="3.5" fill="#D4A12A"/><path d="M100 60 L156 64 L156 92" stroke="#D4A12A" stroke-width="2.5" fill="none"/><circle cx="156" cy="96" r="5" fill="#D4A12A"/>' +
        cejas('#A9A9B0', 93) + ojos(111) +
        '<circle cx="84" cy="111" r="11" fill="none" stroke="#B8860B" stroke-width="2.5"/><circle cx="116" cy="111" r="11" fill="none" stroke="#B8860B" stroke-width="2.5"/><path d="M95 110H105" stroke="#B8860B" stroke-width="2.5"/>' +
        nariz + '<path d="M88 127 Q100 121 112 127 Q100 131 88 127Z" fill="#ECECEF"/>' +
        '<path class="boca" d="M86 134 Q100 154 114 134Z" fill="#8E3B3B"/><path d="M89 135 Q100 141 111 135 Q100 137 89 135Z" fill="#FFF"/>');
    },
    nova: function () {
      var g = 'nv' + (++uid);
      return '<svg viewBox="0 30 200 200" xmlns="http://www.w3.org/2000/svg"><defs>' +
        '<clipPath id="' + g + 'c"><circle cx="100" cy="130" r="100"/></clipPath>' +
        '<radialGradient id="' + g + 'f" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#0E2A52"/><stop offset="1" stop-color="#030812"/></radialGradient>' +
        '<linearGradient id="' + g + 'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7FDBFF"/><stop offset="1" stop-color="#1769E0"/></linearGradient>' +
        '<linearGradient id="' + g + 'r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8EEFF"/><stop offset=".55" stop-color="#2FA8FF"/><stop offset="1" stop-color="#1255C8"/></linearGradient>' +
        '<radialGradient id="' + g + 'b"><stop offset="0" stop-color="#5BD0FF" stop-opacity=".95"/><stop offset="1" stop-color="#5BD0FF" stop-opacity="0"/></radialGradient>' +
        '</defs><g clip-path="url(#' + g + 'c)">' +
        '<circle cx="100" cy="130" r="100" fill="url(#' + g + 'f)"/>' +
        '<circle class="nv-brillo" cx="100" cy="130" r="64" fill="url(#' + g + 'b)"/>' +
        '<circle class="nv-halo" cx="100" cy="130" r="76" fill="none" stroke="#2B8CFF" stroke-opacity=".28" stroke-width="16"/>' +
        '<circle class="nv-aro" cx="100" cy="130" r="62" fill="none" stroke="url(#' + g + 'a)" stroke-width="9"/>' +
        '<g class="nv-rombo"><path d="M100 96 L134 130 L100 164 L66 130Z" fill="url(#' + g + 'r)"/>' +
        '<path d="M100 96 L134 130 L100 130Z" fill="#fff" fill-opacity=".2"/>' +
        '<path d="M100 164 L66 130 L100 130Z" fill="#031A4A" fill-opacity=".25"/>' +
        '<path d="M100 107 L123 130 L100 153 L77 130Z" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/></g>' +
        '</g></svg>';
    }
  };

  /* ---------- 2. REGISTRO DE ASISTENTES ---------- */
  var asistentes = {}, orden = [];
  function registrarAsistente(a) {
    asistentes[a.id] = a;
    if (orden.indexOf(a.id) < 0) orden.push(a.id);
  }
  // Voz: 'genero' ('f'/'m') y 'nombres' (voces preferidas, en orden). Si el navegador no las tiene, se usa la mejor disponible.
  registrarAsistente({ id: 'nova', nombre: { es: 'Nova IA', en: 'Nova AI' }, dibujo: dibujos.nova, clase: 'pa-nova',
    voz: { rate: 1, pitch: 1.02, genero: 'f', nombres: ['Dalia', 'Sabina', 'Helena', 'Paulina', 'Aria', 'Jenny', 'Zira'] } });
  registrarAsistente({ id: 'alberto-clasico', nombre: { es: 'Profesor Alberto', en: 'Professor Alberto' }, estilo: { es: 'Clásico', en: 'Classic' }, dibujo: dibujos.clasico,
    voz: { rate: 1, pitch: 0.85, genero: 'm', nombres: ['Jorge', 'Raúl', 'Juan', 'Guy', 'David', 'Mark'] } });
  registrarAsistente({ id: 'alberto-moderno', nombre: { es: 'Profesor Alberto', en: 'Professor Alberto' }, estilo: { es: 'Moderno', en: 'Modern' }, dibujo: dibujos.moderno,
    voz: { rate: 1.05, pitch: 1, genero: 'm', nombres: ['Pablo', 'Diego', 'Álvaro', 'Jorge', 'Davis', 'Ryan', 'Eric'] } });
  registrarAsistente({ id: 'alberto-academico', nombre: { es: 'Profesor Alberto', en: 'Professor Alberto' }, estilo: { es: 'Académico', en: 'Academic' }, dibujo: dibujos.academico,
    voz: { rate: 0.95, pitch: 0.8, genero: 'm', nombres: ['Raúl', 'Jorge', 'Juan', 'Christopher', 'Mark', 'David'] } });

  /* ---------- 3. ESTADO ---------- */
  var cfg = {}, actual = 'nova', lang = 'es', hablaOn = true, reco = null, escuchando = false;
  var ui = {}, mem = { ultimaVar: null, historial: [] }, E = { vars: [], acc: [], enl: [] };
  var CODIGO = { es: 'es-MX', en: 'en-US' };
  var guardar = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  var leer = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  /* ---------- 3b. ESTADO EXTRA, ALMACÉN Y UTILIDADES ---------- */
  var ritmo = 1, tema = 'claro', pend = null, corriendo = null, puente = null;
  var HAB = [], BIT = [], NOENT = [], SEG = { ensayo: false, maxPasos: 20, usuario: '' };
  var jleer = function (k, d) { try { var v = JSON.parse(leer(k)); return (v === null || v === undefined) ? d : v; } catch (e) { return d; } };
  var jguardar = function (k, v) { try { guardar(k, JSON.stringify(v)); } catch (e) {} };
  function X(es, en) { return lang === 'en' ? en : es; }
  function numFmt(n) {
    try { return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-MX', { maximumFractionDigits: 2 }).format(n); } catch (e) { return String(n); }
  }
  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }
  function nuevoId() { return 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function iso() { return new Date().toISOString(); }
  function fechaHora(i) { try { return new Date(i).toLocaleString(lang === 'en' ? 'en-US' : 'es-MX'); } catch (e) { return i; } }

  /* ---------- 4. TEXTOS DE INTERFAZ Y RESPUESTAS ---------- */
  var T = {
    es: {
      placeholder: 'Escribe o usa el micrófono', enviar: 'Enviar', abrir: 'Abrir asistente', cerrar: 'Cerrar',
      cambiar: 'Elegir asistente', vozLbl: 'Voz del asistente', vozAuto: 'Automática (según el avatar)', vozNota: 'La voz depende de tu navegador y dispositivo: Edge y Windows suelen ofrecer más voces naturales; en Chrome y en celulares puede variar.', prueba: 'Así sonará mi voz.', mic: 'Dictar por voz', voz: 'Voz activada o apagada', cambiaIdioma: 'Cambiar idioma',
      saludo: 'Hola, soy {n}. Te ayudo con {m}. Dime "ayuda" para ver qué puedo hacer, o toca ⚙ para crear tus habilidades.',
      ayuda: 'Puedo mover los controles y leer resultados. Prueba: "sube {v} 10%", "baja {v} 5", "pon {v} en 100", "y ahora 5% más", "¿cuál es el resultado?", "resumen", "deshaz", "restablece" o "speak English". Variables: {lista}.',
      listo: 'Listo: {n} de {a} a {b}.', limite: ' Ese es el límite del control.', ahora: ' Ahora {r}.',
      sinControl: 'No encuentro el control de {n} en la página.', cuanto: 'Dime cuánto (por ejemplo, 10% o 500).',
      ambiguo: '¿A cuál te refieres: {lista}?', esta: '{n} está en {v}.', noEntendi: 'No te entendí, pero ya anoté tu frase para aprender. Dime "ayuda" para ver ejemplos.',
      reinicio: 'Listo, regresé todo a los valores iniciales. {r}', sinRes: 'Este modelo todavía no me entrega resultados.',
      abriendo: 'Abriendo {n} en otra pestaña.', noModelo: 'No encuentro ese modelo en mi lista.',
      deshecho: 'Deshecho: {n} regresó a {a}.', nada: 'No hay nada que deshacer.',
      sinVoz: 'Tu navegador no permite dictado por voz. Usa Chrome o Edge, o escribe tu instrucción.',
      falla: 'Algo falló al ejecutar eso: {e}', atiende: 'Ahora te atiende {n}{s}. ¿En qué te ayudo?',
      idioma: 'Español activado.', listoSolo: 'Listo.'
    },
    en: {
      placeholder: 'Type or use the microphone', enviar: 'Send', abrir: 'Open assistant', cerrar: 'Close',
      cambiar: 'Choose assistant', vozLbl: 'Assistant voice', vozAuto: 'Automatic (by avatar)', vozNota: 'The voice depends on your browser and device: Edge and Windows usually offer more natural voices; Chrome and phones may vary.', prueba: 'This is how my voice will sound.', mic: 'Dictate by voice', voz: 'Voice on or off', cambiaIdioma: 'Change language',
      saludo: "Hi, I'm {n}. I can help you with {m}. Say \"help\" to see what I can do, or tap ⚙ to create your skills.",
      ayuda: 'I can move the controls and read results. Try: "raise {v} 10%", "lower {v} 5", "set {v} to 100", "and now 5% more", "what is the result?", "summary", "undo", "reset" or "habla español". Variables: {lista}.',
      listo: 'Done: {n} from {a} to {b}.', limite: ' That is the control limit.', ahora: ' Now {r}.',
      sinControl: "I can't find the {n} control on the page.", cuanto: 'Tell me how much (for example, 10% or 500).',
      ambiguo: 'Which one do you mean: {lista}?', esta: '{n} is at {v}.', noEntendi: 'I did not understand, but I noted your phrase to learn it. Say "help" for examples.',
      reinicio: 'Done, everything is back to the initial values. {r}', sinRes: 'This model does not give me results yet.',
      abriendo: 'Opening {n} in another tab.', noModelo: "I can't find that model in my list.",
      deshecho: 'Undone: {n} is back to {a}.', nada: 'There is nothing to undo.',
      sinVoz: 'Your browser does not support voice dictation. Use Chrome or Edge, or type your instruction.',
      falla: 'Something failed while doing that: {e}', atiende: '{n}{s} is now with you. How can I help?',
      idioma: 'English enabled.', listoSolo: 'Done.'
    }
  };
  function tr(k, p) {
    var s = (T[lang] && T[lang][k] !== undefined) ? T[lang][k] : T.es[k];
    return String(s).replace(/\{(\w+)\}/g, function (m, x) { return p && p[x] !== undefined ? p[x] : ''; });
  }
  function L(x) { return (x && typeof x === 'object') ? (x[lang] || x.es || '') : (x || ''); }
  function nombresDe(x) {
    if (!x) return [];
    if (Array.isArray(x)) return x;
    if (typeof x === 'object') return [].concat(x.es || [], x.en || []);
    return [x];
  }

  /* ---------- 5. VOCABULARIO (ES + EN) ---------- */
  var V = {
    sube: ['sube', 'subir', 'aumenta', 'aumentar', 'incrementa', 'incrementar', 'suma', 'sumale', 'eleva', 'raise', 'increase', 'add', 'boost', 'bump', 'up'],
    baja: ['baja', 'bajar', 'reduce', 'reducir', 'disminuye', 'disminuir', 'resta', 'quita', 'recorta', 'lower', 'decrease', 'cut', 'drop', 'subtract', 'down'],
    pon: ['pon', 'poner', 'cambia', 'cambiar', 'establece', 'ajusta', 'fija', 'coloca', 'deja', 'set', 'change', 'put', 'adjust', 'make'],
    reset: ['restablece', 'reinicia', 'resetea', 'valores iniciales', 'reset', 'restore', 'defaults'],
    resumen: ['resumen', 'resultados', 'como vamos', 'como va', 'estado', 'summary', 'results', 'status', 'overview'],
    ayuda: ['ayuda', 'comandos', 'que puedes hacer', 'help', 'commands', 'what can you do'],
    abre: ['abre', 'abrir', 'llevame a', 'open', 'go to'],
    deshacer: ['deshaz', 'deshacer', 'regresa', 'revierte', 'undo', 'revert'],
    ingles: ['ingles', 'english'], espanol: ['espanol', 'spanish', 'castellano']
  };

  /* ---------- 6. TEXTO: NORMALIZAR, NÚMEROS EN PALABRAS, DIFUSO ---------- */
  function norm(s) {
    return String(s).toLowerCase().replace(/(\d),(\d{3})/g, '$1$2').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[$€£]/g, ' ').replace(/([a-z])-([a-z])/g, '$1 $2')
      .replace(/[¿?¡!,;:"()]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  var UNI = { cero: 0, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29, treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90,
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
  var CENT = { cien: 100, ciento: 100, doscientos: 200, trescientos: 300, cuatrocientos: 400, quinientos: 500, seiscientos: 600, setecientos: 700, ochocientos: 800, novecientos: 900 };
  var esNum = function (w) { return UNI[w] !== undefined || CENT[w] !== undefined || w === 'hundred' || w === 'mil' || w === 'thousand' || w === 'millon' || w === 'millones' || w === 'million'; };

  function convertirNumeros(t) {
    var tk = t.split(' '), out = [], i = 0, j, total, cur, w, n;
    while (i < tk.length) {
      if (!esNum(tk[i])) { out.push(tk[i]); i++; continue; }
      total = 0; cur = 0; j = i;
      while (j < tk.length) {
        w = tk[j];
        if ((w === 'y' || w === 'and') && j + 1 < tk.length && esNum(tk[j + 1]) && j > i) { j++; continue; }
        if (UNI[w] !== undefined) cur += UNI[w];
        else if (CENT[w] !== undefined) cur += CENT[w];
        else if (w === 'hundred') cur = (cur || 1) * 100;
        else if (w === 'mil' || w === 'thousand') { total += (cur || 1) * 1000; cur = 0; }
        else if (w === 'millon' || w === 'millones' || w === 'million') { total += (cur || 1) * 1e6; cur = 0; }
        else break;
        j++;
      }
      n = total + cur; out.push(String(n)); i = j;
    }
    return out.join(' ');
  }
  function multiplicadores(t) {
    return t.replace(/(\d+(?:\.\d+)?)\s*(mil|k|thousand|millones|millon|million)\b/g, function (m, n, u) {
      return String(parseFloat(n) * ((u === 'mil' || u === 'k' || u === 'thousand') ? 1000 : 1e6));
    });
  }
  function preparar(texto) { return multiplicadores(convertirNumeros(norm(texto))); }

  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, p = [], i, j, prev, tmp;
    if (!m) return n; if (!n) return m;
    for (j = 0; j <= n; j++) p[j] = j;
    for (i = 1; i <= m; i++) {
      prev = p[0]; p[0] = i;
      for (j = 1; j <= n; j++) {
        tmp = p[j];
        p[j] = Math.min(p[j] + 1, p[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return p[n];
  }
  function cerca(a, b) {
    if (a === b) return true;
    var n = Math.max(a.length, b.length);
    if (n < 5) return false;
    return lev(a, b) <= (n >= 8 ? 2 : 1);
  }
  function tiene(t, lista) {
    var tk = t.split(' ');
    return lista.some(function (f) {
      if (f.indexOf(' ') > -1) return (' ' + t + ' ').indexOf(' ' + f + ' ') > -1;
      return tk.some(function (w) { return cerca(w, f); });
    });
  }
  function ngramas(t) {
    var w = t.split(' '), r = [], i, n, g;
    for (n = 4; n >= 1; n--) for (i = 0; i + n <= w.length; i++) { g = w.slice(i, i + n).join(' '); if (g.length >= 3) r.push(g); }
    return r;
  }
  function sim(g, x) {
    if (g === x) return 1;
    var s = 1 - lev(g, x) / Math.max(g.length, x.length);
    if ((' ' + x + ' ').indexOf(' ' + g + ' ') > -1) s = Math.max(s, 0.8 + 0.1 * g.length / x.length);
    return s;
  }
  /* Busca en qué parte de la frase aparece alguna entrada de la lista [{txt, ref}].
     Usa Fuse.js si está cargado; si no, funciona con su propio comparador. */
  function buscar(t, lista, umbral) {
    if (!lista.length) return null;
    var gs = ngramas(t), por = {}, i, j, s, mx = 0, refs = [];
    for (i = 0; i < gs.length; i++) for (j = 0; j < lista.length; j++) {
      s = sim(gs[i], lista[j].txt);
      if (s > (por[j] || 0)) por[j] = s;
    }
    if (window.Fuse) {
      if (!lista._f) lista._f = new window.Fuse(lista, { keys: ['txt'], threshold: 0.25, ignoreLocation: true, includeScore: true });
      gs.forEach(function (g) {
        if (g.length < 4) return;
        lista._f.search(g, { limit: 4 }).forEach(function (r) {
          var p = 0.88 - r.score;
          if (p > (por[r.refIndex] || 0)) por[r.refIndex] = p;
        });
      });
    }
    Object.keys(por).forEach(function (k) { if (por[k] > mx) mx = por[k]; });
    if (mx < umbral) return null;
    Object.keys(por).forEach(function (k) {
      if (por[k] >= mx - 0.03 && refs.indexOf(lista[k].ref) < 0) refs.push(lista[k].ref);
    });
    return { ref: refs[0], refs: refs, s: mx };
  }

  /* ---------- 7. INTÉRPRETE ---------- */
  function elemento(v) { return typeof v.el === 'string' ? document.querySelector(v.el) : v.el; }
  function fmt(v, x) { return v.formato ? v.formato(x, lang) : String(x); }
  function pares() {
    var a = cfg.resultados ? cfg.resultados(lang) : {};
    var b = cfg.resultados ? cfg.resultados(lang === 'es' ? 'en' : 'es') : {};
    var k = Object.keys(a), k2 = Object.keys(b);
    return k.map(function (x, i) { return { k: x, v: a[x], txts: [x, k2[i]].filter(Boolean) }; });
  }
  function resultadosTexto(n) {
    return pares().slice(0, n || 3).map(function (p) { return p.k + ': ' + p.v; }).join('; ');
  }
  function aplicar(v, valor) {
    var el = elemento(v);
    if (!el) return null;
    var ant = parseFloat(el.value), min = parseFloat(el.min), max = parseFloat(el.max), paso = parseFloat(el.step) || 0, limite = false;
    if (!isNaN(min) && valor < min) { valor = min; limite = true; }
    if (!isNaN(max) && valor > max) { valor = max; limite = true; }
    if (paso) valor = Math.round(valor / paso) * paso;
    valor = Number(valor.toFixed(6));
    el.value = valor;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    if (cfg.alCambiar) cfg.alCambiar(v, valor);
    return { ant: ant, nuevo: valor, limite: limite };
  }
  function cambiarIdioma(l) {
    lang = l; guardar('pa_idioma', l); aplicarIdioma();
    try { document.dispatchEvent(new CustomEvent('pa-idioma', { detail: l })); } catch (e) {}
    return tr('idioma');
  }

  function procesar(texto, op) {
    var t = preparar(texto), tn = norm(texto), i, r, m, hx, hs;
    op = op || {};
    if (!t) return '';
    var vars = (cfg.variables || []);

    // 0) confirmación o archivo pendiente, y cancelar una habilidad en curso
    if (pend) return respuestaPendiente(tn);
    if (corriendo && /^(cancela|cancelar|detente|detener|alto|stop|cancel|abort)\b/.test(tn)) { corriendo.cancelado = true; return X('Cancelando…', 'Cancelling…'); }
    // 0b) cortesías breves (hola, gracias, adiós…)
    if (tn.split(' ').length <= 4) { r = bancoCorto(tn); if (r) return r; }
    // 0c) tus habilidades (y el ensayo de una habilidad: "ensaya aplica los pagos")
    if (!op.sinHab) {
      m = tn.match(RXENS);
      if (m) { hx = buscarHabilidad(m[2]); if (hx) return ejecutarHabilidad(hx, { ensayo: true }); }
      hs = buscarHabilidad(tn);
      if (hs) return ejecutarHabilidad(hs, {});
    }
    // 0d) atajos de interfaz: minimizar, configuración, tema, avatar…
    r = atajosUI(tn); if (r !== null) return r;

    // a) acciones propias del modelo
    r = buscar(t, E.acc, 0.82);
    if (r) return r.ref.run(texto, lang);
    // b) idioma
    if (tiene(t, V.ingles)) return lang === 'en' ? tr('idioma') : cambiarIdioma('en');
    if (tiene(t, V.espanol)) return lang === 'es' ? tr('idioma') : cambiarIdioma('es');
    // c) ayuda
    if (tiene(t, V.ayuda)) return ayudaTexto(vars);
    // d) abrir otro modelo
    if (cfg.enlaces && tiene(t, V.abre)) {
      r = buscar(t, E.enl, 0.8);
      if (r) { window.open(r.ref.url, '_blank'); return tr('abriendo', { n: L(r.ref.nombre) }); }
      return tr('noModelo');
    }
    // e) deshacer
    if (tiene(t, V.deshacer)) {
      var h = mem.historial.pop();
      if (!h) return tr('nada');
      aplicar(h.v, h.ant);
      return tr('deshecho', { n: L(h.v.nombre), a: fmt(h.v, h.ant) }) + tr('ahora', { r: resultadosTexto(3) });
    }
    // f) restablecer
    if (tiene(t, V.reset)) {
      vars.forEach(function (v) { if (v._ini !== undefined) aplicar(v, parseFloat(v._ini)); });
      mem.historial = [];
      return tr('reinicio', { r: resultadosTexto(3) });
    }
    // g) mover variables
    var mv = buscar(t, E.vars, 0.8);
    var v = (mv && mv.refs.length === 1) ? mv.ref : null;
    if (mv && mv.refs.length > 1) return tr('ambiguo', { lista: mv.refs.map(function (x) { return L(x.nombre); }).join(' / ') });
    var nm = t.match(/-?\d+(\.\d+)?/), num = nm ? parseFloat(nm[0]) : null;
    var pct = /%|por ?ciento|percent/.test(t);
    var dir = tiene(t, V.sube) ? 1 : tiene(t, V.baja) ? -1 : 0, poner = tiene(t, V.pon);
    if (!v && num !== null && mem.ultimaVar) {                       // memoria corta: "y ahora 5% más"
      var masMenos = /\b(mas|menos|more|less)\b/.test(t);
      if (dir || poner || masMenos) { v = mem.ultimaVar; if (!dir && !poner) dir = /\b(menos|less)\b/.test(t) ? -1 : 1; }
    }
    if (v && num !== null && (dir || poner)) {
      var el = elemento(v);
      if (!el) return tr('sinControl', { n: L(v.nombre) });
      var act = parseFloat(el.value), obj;
      if (poner && !dir) obj = num;
      else if (dir && !pct && /\b(a|to|hasta|until)\s+-?\d/.test(t)) obj = num;
      else obj = pct ? act * (1 + dir * num / 100) : act + dir * num;
      var paso = parseFloat(el.step) || 0;
      if (paso && dir && Math.round(obj / paso) * paso === act) obj = act + dir * paso;
      var res = aplicar(v, obj);
      mem.ultimaVar = v; mem.historial.push({ v: v, ant: res.ant }); if (mem.historial.length > 20) mem.historial.shift();
      var msg = tr('listo', { n: L(v.nombre), a: fmt(v, res.ant), b: fmt(v, res.nuevo) });
      if (res.limite) msg += tr('limite');
      var rt = resultadosTexto(3);
      return rt ? msg + tr('ahora', { r: rt }) : msg;
    }
    if (v && num === null && dir) return tr('cuanto');
    // h) consultar un resultado concreto
    var ps = pares(), ent = [];
    ps.forEach(function (p, idx) { p.txts.forEach(function (x) { ent.push({ txt: norm(x), ref: idx }); }); });
    m = buscar(t, ent, 0.8);
    if (m) return m.refs.map(function (idx) { return ps[idx].k + ': ' + ps[idx].v; }).join('; ') + '.';
    // i) consultar una variable
    if (v && num === null) { var e2 = elemento(v); if (e2) return tr('esta', { n: L(v.nombre), v: fmt(v, parseFloat(e2.value)) }); }
    // j) resumen
    if (tiene(t, V.resumen)) return resultadosTexto(99) || tr('sinRes');
    // k) banco de conversación, glosario, calculadora y atajos web
    r = procesarBanco(texto, tn, t); if (r !== null && r !== undefined) return r;
    anotarNoEntendi(texto);
    return tr('noEntendi') + sugerir(tn);
  }


  /* ---------- 7b. BANCO DE CONVERSACIÓN, GLOSARIO, CALCULADORA Y ATAJOS ---------- */
  function toks(t) { return t ? t.split(' ') : []; }
  function contieneSeq(tt, ft) {
    var i, j, ok;
    if (!ft.length || ft.length > tt.length) return false;
    for (i = 0; i + ft.length <= tt.length; i++) {
      ok = true;
      for (j = 0; j < ft.length; j++) if (!(tt[i + j] === ft[j] || cerca(tt[i + j], ft[j]))) { ok = false; break; }
      if (ok) return true;
    }
    return false;
  }
  // Puntúa qué tanto se parece el texto t a la frase f (ambos ya normalizados). 0 = nada, 1 = idéntico.
  function puntuar(t, f) {
    var tt, ft, cov, min, s;
    if (!t || !f) return 0;
    if (t === f) return 1;
    tt = toks(t); ft = toks(f); cov = ft.length / tt.length;
    if (contieneSeq(tt, ft)) {
      min = ft.length >= 3 ? 0.3 : (ft.length === 2 ? 0.45 : 0.5);
      return cov >= min ? 0.72 + 0.28 * cov : 0;
    }
    if (ft.length >= 2 || f.length >= 6) {
      s = 1 - lev(t, f) / Math.max(t.length, f.length);
      if (s >= 0.82) return s;
    }
    return 0;
  }
  function mejorDe(lista, tn) {
    var mejor = null;
    lista.forEach(function (x) {
      var s = puntuar(tn, x.f);
      if (s > 0 && (!mejor || s > mejor.s)) mejor = { ref: x.ref, s: s, f: x.f };
    });
    return mejor;
  }
  function hora12() { return new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-MX', { hour: 'numeric', minute: '2-digit' }); }
  function fechaLarga() {
    return new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  function saludoHora() {
    var h = new Date().getHours();
    var s = lang === 'en' ? (h < 12 ? 'Good morning' : (h < 19 ? 'Good afternoon' : 'Good evening'))
      : (h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches'));
    return s + '. ' + azar(lang === 'en' ? ['How can I help you?', 'What are we working on today?'] : ['¿En qué te ayudo?', '¿Qué hacemos hoy?']);
  }
  function ayudaTexto(vars) {
    vars = vars || cfg.variables || [];
    return tr('ayuda', { v: vars[0] ? L(vars[0].nombre) : '', lista: vars.map(function (x) { return L(x.nombre); }).join(', ') }) +
      X(' También puedo decirte la hora, calcular porcentajes e IVA, dar definiciones de contabilidad y finanzas, abrir rutas, videos o búsquedas, y ejecutar tus habilidades (botón ⚙).',
        ' I can also tell you the time, calculate percentages and VAT, define accounting and finance terms, open routes, videos or searches, and run your skills (⚙ button).');
  }
  var CHISTES = {
    es: ['¿Por qué el contador cruzó la calle? Para cuadrar el otro lado de la balanza.',
      'Un auditor entra a un bar y pide la cuenta... y luego la concilia.',
      'Mi presupuesto y yo tenemos algo en común: los dos nos desviamos en el mes tres.',
      '¿Cuál es el colmo de un contador? Que su vida no cuadre.',
      'El efectivo es el rey, pero el devengado es quien manda en el estado de resultados.'],
    en: ['Why did the accountant cross the road? To balance the other side of the ledger.',
      'An auditor walks into a bar and asks for the check... and then reconciles it.',
      'My budget and I have one thing in common: we both drift off in month three.',
      'What is an accountant worst nightmare? A life that does not reconcile.',
      'Cash is king, but accrual runs the income statement.']
  };
  var ANIMO = {
    es: ['Un paso a la vez: cuadrar una cuenta hoy ya es avanzar. Tú puedes.', 'Lo difícil de hoy es la experiencia de mañana. Sigue.', 'Respira, ordena prioridades y ataca la más pequeña primero.'],
    en: ['One step at a time: reconciling one account today is already progress. You can do it.', 'Todays hard task is tomorrows experience. Keep going.', 'Breathe, set priorities, and start with the smallest one.']
  };

  /* Cada tema: f = frases que lo activan (ES + EN), r = respuestas al azar o fn = respuesta calculada.
     corto:true = cortesías que se atienden primero en mensajes breves. */
  var BANCO = [
    { id: 'saludo', corto: true, fn: saludoHora,
      f: ['hola', 'holi', 'holaa', 'buenas', 'buenos dias', 'buen dia', 'buenas tardes', 'buenas noches', 'que tal', 'que onda', 'saludos', 'hey', 'ey', 'oye',
        'hola nova', 'hola alberto', 'hola profesor', 'hola profe', 'hi', 'hello', 'hi there', 'good morning', 'good afternoon', 'good evening', 'whats up', 'hey nova', 'hello professor'] },
    { id: 'estas', corto: true,
      f: ['como estas', 'como te va', 'que tal estas', 'como andas', 'como te encuentras', 'como amaneciste', 'como te sientes', 'how are you', 'how are you doing', 'how is it going', 'hows it going'],
      r: { es: ['Muy bien, listo para ayudarte. ¿Y tú?', '¡Excelente! Con ganas de trabajar. ¿Cómo vas tú?'], en: ['Doing great, ready to help. And you?', 'Excellent! Ready to work. How are you?'] } },
    { id: 'gracias', corto: true,
      f: ['gracias', 'muchas gracias', 'mil gracias', 'te lo agradezco', 'gracias nova', 'gracias alberto', 'gracias profesor', 'thanks', 'thank you', 'thanks a lot', 'thx'],
      r: { es: ['¡Con gusto!', 'Para eso estoy.', '¡A la orden!'], en: ['You are welcome!', 'Happy to help.', 'Anytime!'] } },
    { id: 'adios', corto: true,
      f: ['adios', 'hasta luego', 'nos vemos', 'bye', 'chao', 'chau', 'hasta pronto', 'hasta manana', 'me voy', 'goodbye', 'see you', 'see you later', 'good night'],
      r: { es: ['Hasta luego. Aquí estaré cuando me necesites.', '¡Nos vemos! Que tengas un excelente día.'], en: ['See you later. I will be here when you need me.', 'Bye! Have a great day.'] } },
    { id: 'quien',
      f: ['quien eres', 'como te llamas', 'cual es tu nombre', 'tu nombre', 'presentate', 'who are you', 'what is your name', 'whats your name', 'introduce yourself'],
      fn: function () {
        var m = L(cfg.modelo);
        return X('Soy ' + L(asistentes[actual].nombre) + ', el asistente de ' + (m || 'este modelo') + '. Muevo controles, leo resultados, ejecuto tus habilidades y respondo preguntas básicas de contabilidad y finanzas.',
          'I am ' + L(asistentes[actual].nombre) + ', the assistant for ' + (m || 'this model') + '. I move controls, read results, run your skills and answer basic accounting and finance questions.');
      } },
    { id: 'creador', f: ['quien te creo', 'quien te hizo', 'quien te programo', 'quien es tu creador', 'who made you', 'who created you', 'who built you'],
      r: { es: ['Me diseñó mi creador como parte de su suite de modelos financieros, y sigo aprendiendo con cada pregunta que me hacen.'], en: ['My creator designed me as part of a suite of financial models, and I keep learning from every question I get.'] } },
    { id: 'humano', f: ['eres humano', 'eres una persona', 'eres un robot', 'eres real', 'estas vivo', 'are you human', 'are you real', 'are you a robot'],
      r: { es: ['Soy un asistente de software: no soy una persona, pero me esfuerzo por ayudarte como si lo fuera.'], en: ['I am a software assistant, not a person, but I do my best to help like one.'] } },
    { id: 'capacidades', fn: function () { return ayudaTexto(); },
      f: ['que sabes hacer', 'para que sirves', 'como funcionas', 'como te uso', 'en que me puedes ayudar', 'que puedes hacer por mi', 'what can you do for me', 'how do you work', 'how do i use you', 'instrucciones', 'menu'] },
    { id: 'hora', fn: function () { return X('Son las ', 'It is ') + hora12() + '.'; },
      f: ['que hora es', 'dime la hora', 'la hora', 'hora actual', 'me dices la hora', 'what time is it', 'the time', 'tell me the time', 'current time'] },
    { id: 'fecha', fn: function () { return X('Hoy es ', 'Today is ') + fechaLarga() + '.'; },
      f: ['que dia es hoy', 'que fecha es', 'fecha de hoy', 'dime la fecha', 'a cuanto estamos', 'que dia es', 'what day is it', 'todays date', 'what is the date', 'what is todays date'] },
    { id: 'chiste', fn: function () { return azar(CHISTES[lang] || CHISTES.es); },
      f: ['cuentame un chiste', 'dime un chiste', 'un chiste', 'algo gracioso', 'hazme reir', 'cuentame una broma', 'dime una broma', 'tell me a joke', 'a joke', 'make me laugh'] },
    { id: 'animo', fn: function () { return azar(ANIMO[lang] || ANIMO.es); },
      f: ['motivame', 'animame', 'dame animo', 'estoy cansado', 'motivate me', 'cheer me up', 'i am tired'] },
    { id: 'cumplido',
      f: ['eres genial', 'buen trabajo', 'que bien', 'eres el mejor', 'eres muy bueno', 'excelente trabajo', 'you are great', 'good job', 'well done', 'awesome', 'genial', 'increible', 'me encanta'],
      r: { es: ['¡Gracias! Me da gusto servirte.', '¡Qué amable! Seguimos.'], en: ['Thank you! Glad to help.', 'That is kind of you! Let us keep going.'] } },
    { id: 'cariño', f: ['te quiero', 'te amo', 'eres mi amigo', 'i love you', 'you are my friend'],
      r: { es: ['¡Gracias! Soy un programa, pero me da gusto acompañarte en tu trabajo.'], en: ['Thank you! I am a program, but I am glad to be part of your work.'] } },
    { id: 'queja', f: ['no sirves', 'eres tonto', 'no entiendes nada', 'estas mal', 'eso esta mal', 'that is wrong', 'you are wrong', 'you are useless'],
      r: { es: ['Perdón, sigo aprendiendo. Dime qué esperabas y lo agrego a mi lista de preguntas para mejorar (⚙ → Preguntas).'], en: ['Sorry, I am still learning. Tell me what you expected and I will add it to my list of questions to improve (⚙ → Questions).'] } },
    { id: 'afirma', f: ['si', 'claro', 'ok', 'okay', 'vale', 'de acuerdo', 'yes', 'sure', 'dale', 'esta bien', 'perfecto', 'entendido'],
      r: { es: ['Entendido. ¿Qué sigue?', 'De acuerdo. Dime qué hacemos.'], en: ['Understood. What is next?', 'Okay. Tell me what we do.'] } },
    { id: 'niega', f: ['no', 'nada', 'nel', 'nope', 'no gracias', 'no thanks'],
      r: { es: ['De acuerdo.', 'Está bien. Aquí sigo por si me necesitas.'], en: ['Alright.', 'Okay. I am here if you need me.'] } },
    { id: 'repite', fn: function () { return mem.ultimoBot || X('Todavía no he dicho nada.', 'I have not said anything yet.'); },
      f: ['repite', 'repitelo', 'otra vez', 'que dijiste', 'como dices', 'no te escuche', 'repeat', 'say that again', 'what did you say'] },
    { id: 'sinvoz', f: ['no te escucho', 'no oigo', 'no se oye', 'no hablas', 'i cant hear you', 'no sound'],
      r: { es: ['Revisa que el botón 🔊 esté activo y el volumen de tu equipo. En ⇄ puedes elegir otra voz.'], en: ['Check that the 🔊 button is on and your device volume is up. In ⇄ you can choose another voice.'] } },
    { id: 'mic', f: ['no funciona el microfono', 'el microfono no sirve', 'no sirve el microfono', 'mic not working', 'microphone not working'],
      r: { es: ['Prueba en Chrome o Edge y permite el micrófono para esta página. Mientras tanto puedes escribirme.'], en: ['Try Chrome or Edge and allow the microphone for this page. Meanwhile you can type to me.'] } },
    { id: 'clima', f: ['como esta el clima', 'va a llover', 'que clima hace', 'el clima', 'whats the weather', 'will it rain', 'weather'],
      r: { es: ['Todavía no tengo conexión al clima. Puedo abrir una búsqueda: di «busca clima de hoy».'], en: ['I do not have a live weather connection yet. I can open a search: say "search weather today".'] } },
    { id: 'noticias', f: ['noticias', 'que noticias hay', 'dame las noticias', 'news', 'whats the news'],
      r: { es: ['Todavía no leo noticias por mí mismo. Puedo abrir una búsqueda: di «busca noticias de hoy».'], en: ['I do not read the news by myself yet. I can open a search: say "search news today".'] } },
    { id: 'cambio', f: ['tipo de cambio', 'cuanto esta el dolar', 'precio del dolar', 'dollar exchange rate', 'exchange rate'],
      r: { es: ['No tengo el tipo de cambio en vivo. Di «busca tipo de cambio dólar hoy» y abro la búsqueda.'], en: ['I do not have the live exchange rate. Say "search dollar exchange rate today" and I will open the search.'] } },
    { id: 'info_hab', f: ['que son las habilidades', 'como creo una habilidad', 'como crear una habilidad', 'que es una habilidad', 'what are skills', 'how do i create a skill', 'what is a skill'],
      r: { es: ['Una habilidad es una rutina que tú defines: frases para activarla y una lista de pasos (avisar, abrir una ruta, leer un archivo, lanzar un robot…). Toca ⚙ → Habilidades → Nueva, o carga los ejemplos.'],
        en: ['A skill is a routine you define: trigger phrases and a list of steps (announce, open a route, read a file, launch a robot...). Tap ⚙ → Skills → New, or load the examples.'] } },
    { id: 'info_ensayo', f: ['que es el modo ensayo', 'que es ensayo', 'para que sirve el ensayo', 'what is dry run', 'what is rehearsal mode'],
      r: { es: ['El ensayo (🧪) muestra qué haría una habilidad paso por paso sin ejecutar nada. Sirve para confiar en una habilidad antes de usarla de verdad.'],
        en: ['The dry run (🧪) shows what a skill would do step by step without executing anything. Use it to trust a skill before running it for real.'] } },
    { id: 'info_bit', f: ['para que sirve la bitacora', 'que es la bitacora', 'what is the log', 'what is the audit log'],
      r: { es: ['La bitácora registra cada paso que ejecuto: quién, cuándo, qué y con qué resultado. Se puede exportar a Excel o imprimir con firmas.'],
        en: ['The log records every step I run: who, when, what and the result. You can export it to Excel or print it with signature lines.'] } }
  ];
  var BIDX = null;
  function indiceBanco() {
    if (BIDX) return BIDX;
    BIDX = [];
    BANCO.forEach(function (b) { b.f.forEach(function (f) { BIDX.push({ f: norm(f), ref: b }); }); });
    return BIDX;
  }
  function respuestaBanco(b) { return b.fn ? b.fn() : azar(b.r[lang] || b.r.es); }
  function bancoCorto(tn) {
    var lista = indiceBanco().filter(function (x) { return x.ref.corto; }), m = mejorDe(lista, tn);
    return (m && m.s >= 0.85) ? respuestaBanco(m.ref) : null;
  }

  /* Glosario de contabilidad y finanzas (a = nombres, es/en = definición corta) */
  var GLOS = [
    { a: ['ebitda', 'utilidad antes de intereses impuestos depreciacion y amortizacion'], es: 'EBITDA es la utilidad antes de intereses, impuestos, depreciación y amortización. Sirve para comparar la capacidad operativa de generar efectivo, sin el efecto de la estructura de capital ni de los impuestos.', en: 'EBITDA is earnings before interest, taxes, depreciation and amortization. It compares operating cash-generating ability without the effect of capital structure or taxes.' },
    { a: ['iva', 'impuesto al valor agregado', 'vat', 'value added tax'], es: 'El IVA es el Impuesto al Valor Agregado. En México la tasa general es 16%. Lo trasladas a tus clientes y acreditas el que te trasladan tus proveedores; pagas la diferencia.', en: 'VAT (IVA in Mexico) is the Value Added Tax. The general Mexican rate is 16%. You charge it to customers and credit what suppliers charge you; you pay the difference.' },
    { a: ['isr', 'impuesto sobre la renta', 'income tax'], es: 'El ISR es el Impuesto Sobre la Renta. Las personas morales lo calculan sobre su utilidad fiscal; la tasa general en México es 30%.', en: 'ISR is the Mexican income tax. Companies compute it on taxable profit; the general rate in Mexico is 30%.' },
    { a: ['cfdi', 'factura electronica', 'comprobante fiscal digital por internet', 'electronic invoice', 'e invoice'], es: 'El CFDI es el Comprobante Fiscal Digital por Internet: la factura electrónica en XML que timbra un PAC y valida el SAT.', en: 'The CFDI is the Mexican electronic invoice: an XML stamped by an authorized certification provider (PAC) and validated by the tax authority (SAT).' },
    { a: ['pac', 'proveedor autorizado de certificacion'], es: 'Un PAC es un Proveedor Autorizado de Certificación: la empresa que timbra tus CFDI antes de que lleguen al SAT.', en: 'A PAC is an authorized certification provider: the company that stamps your CFDI invoices before they reach the SAT.' },
    { a: ['sat', 'servicio de administracion tributaria'], es: 'El SAT es el Servicio de Administración Tributaria, la autoridad fiscal de México.', en: 'The SAT is the Tax Administration Service, Mexico tax authority.' },
    { a: ['diot', 'declaracion informativa de operaciones con terceros'], es: 'La DIOT es la Declaración Informativa de Operaciones con Terceros: informa al SAT las operaciones con tus proveedores para efectos del IVA.', en: 'The DIOT is the informative return of operations with third parties: it reports your supplier transactions to the SAT for VAT purposes.' },
    { a: ['contabilidad electronica', 'electronic accounting'], es: 'La contabilidad electrónica es el envío al SAT, en XML, del catálogo de cuentas y la balanza de comprobación (y las pólizas cuando la autoridad las solicita).', en: 'Electronic accounting is the XML submission to the SAT of the chart of accounts and trial balance (and journal entries when requested).' },
    { a: ['conciliacion bancaria', 'conciliar banco', 'bank reconciliation'], es: 'La conciliación bancaria compara los movimientos de tu contabilidad contra el estado de cuenta del banco y explica las diferencias: cheques en tránsito, depósitos no registrados, comisiones.', en: 'Bank reconciliation compares your books against the bank statement and explains the differences: outstanding checks, unrecorded deposits, fees.' },
    { a: ['partida abierta', 'partidas abiertas', 'open item', 'open items'], es: 'Una partida abierta es un movimiento contable aún no compensado, por ejemplo una factura sin pagar. Compensarla contra su pago se llama clearing.', en: 'An open item is an accounting entry not yet cleared, for example an unpaid invoice. Matching it against its payment is called clearing.' },
    { a: ['poliza', 'poliza contable', 'journal entry'], es: 'Una póliza contable registra una operación con cargos y abonos de igual importe y su documento soporte.', en: 'A journal entry records a transaction with debits and credits of equal amount and its supporting document.' },
    { a: ['balanza de comprobacion', 'balanza', 'trial balance'], es: 'La balanza de comprobación lista cada cuenta con saldo inicial, cargos, abonos y saldo final; la suma de deudores debe igualar la de acreedores.', en: 'The trial balance lists each account with opening balance, debits, credits and closing balance; total debits must equal total credits.' },
    { a: ['depreciacion', 'depreciation'], es: 'La depreciación reparte el costo de un activo tangible entre los años de su vida útil, como gasto de cada periodo.', en: 'Depreciation spreads the cost of a tangible asset over its useful life as an expense of each period.' },
    { a: ['amortizacion', 'amortization'], es: 'La amortización reparte en el tiempo el costo de un activo intangible. En un préstamo, es el pago gradual del capital.', en: 'Amortization spreads the cost of an intangible asset over time. In a loan, it is the gradual repayment of principal.' },
    { a: ['devengado', 'devengo', 'base devengada', 'accrual', 'accrual basis'], es: 'Devengar es reconocer ingresos y gastos cuando ocurren, no cuando se cobran o se pagan.', en: 'Accrual accounting recognizes revenues and expenses when they occur, not when cash is received or paid.' },
    { a: ['flujo de efectivo', 'flujo de caja', 'cash flow'], es: 'El flujo de efectivo es el dinero que entra y sale en un periodo. Puede ser distinto de la utilidad, porque ésta es devengada.', en: 'Cash flow is the money coming in and going out in a period. It can differ from profit because profit is accrual-based.' },
    { a: ['capital de trabajo', 'working capital'], es: 'Capital de trabajo = activo circulante menos pasivo circulante. Mide qué tanto puedes cubrir tus obligaciones de corto plazo.', en: 'Working capital = current assets minus current liabilities. It measures how well you can cover short-term obligations.' },
    { a: ['razon circulante', 'liquidez', 'razon de liquidez', 'current ratio', 'liquidity'], es: 'La razón circulante es activo circulante entre pasivo circulante. Arriba de 1 significa que tienes más activos de corto plazo que deudas de corto plazo.', en: 'The current ratio is current assets divided by current liabilities. Above 1 means you hold more short-term assets than short-term debts.' },
    { a: ['margen bruto', 'gross margin'], es: 'Margen bruto = (ventas menos costo de ventas) entre ventas. Muestra cuánto queda de cada peso vendido antes de los gastos de operación.', en: 'Gross margin = (sales minus cost of sales) divided by sales. It shows what is left of each dollar sold before operating expenses.' },
    { a: ['utilidad neta', 'ganancia neta', 'net income', 'net profit'], es: 'La utilidad neta es lo que queda después de costos, gastos, intereses e impuestos.', en: 'Net income is what remains after costs, expenses, interest and taxes.' },
    { a: ['punto de equilibrio', 'break even', 'breakeven', 'break even point'], es: 'El punto de equilibrio es el nivel de ventas donde los ingresos igualan los costos totales. En unidades: costos fijos entre (precio menos costo variable unitario).', en: 'Break-even is the sales level where revenue equals total costs. In units: fixed costs divided by (price minus unit variable cost).' },
    { a: ['costo estandar', 'standard cost', 'standard costing'], es: 'El costo estándar es un costo predeterminado por unidad (material, mano de obra e indirectos). Se compara contra el real para analizar variaciones.', en: 'Standard cost is a predetermined cost per unit (material, labor and overhead). It is compared with actual cost to analyze variances.' },
    { a: ['cruce a 3 vias', 'cruce de 3 vias', 'three way match', '3 way match', 'tres vias'], es: 'El cruce a 3 vías compara orden de compra, recepción de mercancía y factura antes de autorizar el pago. Es un control clave contra pagos indebidos.', en: 'Three-way match compares the purchase order, goods receipt and invoice before approving payment. It is a key control against improper payments.' },
    { a: ['sox', 'sarbanes oxley', 'ley sarbanes oxley'], es: 'SOX es la ley Sarbanes-Oxley de Estados Unidos: exige controles internos confiables sobre la información financiera de las empresas que cotizan allá.', en: 'SOX is the US Sarbanes-Oxley Act: it requires reliable internal controls over financial reporting for listed companies.' },
    { a: ['nif', 'nifs', 'normas de informacion financiera'], es: 'Las NIF son las Normas de Información Financiera que emite el CINIF en México.', en: 'NIF are the Mexican Financial Reporting Standards issued by CINIF.' },
    { a: ['ifrs', 'niif', 'normas internacionales de informacion financiera'], es: 'Las IFRS (NIIF) son las normas internacionales de información financiera que emite el IASB.', en: 'IFRS are the international financial reporting standards issued by the IASB.' },
    { a: ['us gaap', 'usgaap', 'gaap'], es: 'US GAAP son los principios de contabilidad generalmente aceptados en Estados Unidos.', en: 'US GAAP are the generally accepted accounting principles in the United States.' },
    { a: ['consolidacion', 'consolidar', 'consolidation'], es: 'Consolidar es combinar los estados financieros de una matriz y sus subsidiarias como si fueran una sola entidad, eliminando las operaciones entre ellas.', en: 'Consolidation combines the financial statements of a parent and its subsidiaries as one entity, eliminating transactions between them.' },
    { a: ['intercompania', 'operacion intercompania', 'intercompany'], es: 'Una operación intercompañía ocurre entre empresas del mismo grupo. Al consolidar se concilia y se elimina.', en: 'An intercompany transaction occurs between companies of the same group. In consolidation it is reconciled and eliminated.' },
    { a: ['cuentas por pagar', 'cxp', 'accounts payable'], es: 'Cuentas por pagar es lo que la empresa debe a sus proveedores por compras a crédito.', en: 'Accounts payable is what the company owes suppliers for purchases on credit.' },
    { a: ['cuentas por cobrar', 'cxc', 'accounts receivable'], es: 'Cuentas por cobrar es lo que los clientes le deben a la empresa por ventas a crédito.', en: 'Accounts receivable is what customers owe the company for sales on credit.' },
    { a: ['dso', 'dias de cobranza', 'days sales outstanding'], es: 'El DSO son los días promedio que tardas en cobrar: cuentas por cobrar entre ventas, por los días del periodo.', en: 'DSO is the average number of days to collect: receivables divided by sales, times the days in the period.' },
    { a: ['peps', 'fifo', 'primeras entradas primeras salidas'], es: 'PEPS (FIFO) valúa el inventario suponiendo que salen primero las unidades más antiguas.', en: 'FIFO values inventory assuming the oldest units are sold first.' },
    { a: ['vpn', 'valor presente neto', 'npv', 'net present value'], es: 'El VPN es el valor presente de los flujos futuros de un proyecto menos la inversión inicial. Si es positivo, el proyecto crea valor a esa tasa de descuento.', en: 'NPV is the present value of a project future cash flows minus the initial investment. If positive, the project creates value at that discount rate.' },
    { a: ['tir', 'tasa interna de retorno', 'irr'], es: 'La TIR es la tasa de descuento que hace el VPN igual a cero: el rendimiento anual del proyecto.', en: 'IRR is the discount rate that makes NPV equal to zero: the annual return of the project.' },
    { a: ['dcf', 'flujo descontado', 'flujos descontados', 'discounted cash flow'], es: 'El DCF (flujos descontados) valúa un negocio trayendo a valor presente sus flujos futuros con una tasa de descuento.', en: 'DCF values a business by bringing its future cash flows to present value with a discount rate.' },
    { a: ['tabla dinamica', 'tablas dinamicas', 'pivot', 'pivot table'], es: 'Una tabla dinámica de Excel resume datos arrastrando campos a filas, columnas y valores, sin escribir fórmulas.', en: 'An Excel pivot table summarizes data by dragging fields to rows, columns and values, without writing formulas.' },
    { a: ['macro', 'macros', 'vba'], es: 'Una macro es una secuencia automatizada de pasos; en Excel normalmente se escribe en VBA.', en: 'A macro is an automated sequence of steps; in Excel it is usually written in VBA.' },
    { a: ['rpa', 'automatizacion robotica de procesos'], es: 'RPA es automatización robótica de procesos: software que imita lo que haría una persona en pantalla, como clics, captura y copiar y pegar.', en: 'RPA is robotic process automation: software that mimics what a person would do on screen, such as clicking, typing and copy-paste.' },
    { a: ['segregacion de funciones', 'separacion de funciones', 'segregation of duties'], es: 'Segregar funciones significa que quien captura una operación no sea quien la autoriza ni quien la registra, para reducir errores y fraude.', en: 'Segregation of duties means the person who enters a transaction is not the one who approves or records it, to reduce errors and fraud.' },
    { a: ['control interno', 'internal control'], es: 'El control interno son las políticas y procedimientos que dan seguridad razonable sobre la confiabilidad de la información, el cumplimiento y el cuidado de los activos.', en: 'Internal control is the set of policies and procedures that give reasonable assurance on reliable information, compliance and asset safeguarding.' },
    { a: ['ecuacion contable', 'activo pasivo capital', 'accounting equation'], es: 'Activo = Pasivo + Capital contable. Lo que tiene la empresa se financia con deuda o con aportaciones y utilidades de los dueños.', en: 'Assets = Liabilities + Equity. What the company owns is financed by debt or by owners contributions and profits.' },
    { a: ['provision', 'provisiones'], es: 'Una provisión es un pasivo de importe o fecha inciertos, pero probable y estimable, como una contingencia.', en: 'A provision is a liability of uncertain amount or timing that is probable and estimable, such as a contingency.' },
    { a: ['inpc', 'indice nacional de precios al consumidor'], es: 'El INPC es el Índice Nacional de Precios al Consumidor que publica el INEGI; mide la inflación y se usa para actualizar contratos y valores.', en: 'The INPC is the Mexican consumer price index published by INEGI; it measures inflation and is used to update contracts and values.' },
    { a: ['forecast', 'pronostico'], es: 'El forecast es una proyección actualizada: lo que ya ocurrió más lo que se espera. El presupuesto es el plan original.', en: 'A forecast is an updated projection: what already happened plus what is expected. The budget is the original plan.' }
  ];
  var GIDX = null;
  function indiceGlos() {
    if (GIDX) return GIDX;
    GIDX = [];
    GLOS.forEach(function (g) { g.a.forEach(function (a) { GIDX.push({ f: norm(a), ref: g }); }); });
    return GIDX;
  }
  function mejorGlos(term, estricto) {
    var tt = toks(term), mejor = null, mp = 0;
    indiceGlos().forEach(function (x) {
      var s = estricto ? puntuar(term, x.f) : (contieneSeq(tt, toks(x.f)) ? 0.8 + 0.02 * toks(x.f).length : puntuar(term, x.f));
      if (s > mp) { mp = s; mejor = x.ref; }
    });
    return (mejor && mp >= (estricto ? 0.92 : 0.8)) ? mejor : null;
  }
  var RXDEF = /^(?:oye |dime |por favor )?(?:que es|que son|que significa|que quiere decir|define|definicion de|definir|explicame|explica|a que se refiere|what is|what are|what does|definition of|explain|meaning of|tell me about)\s+(?:el |la |los |las |un |una |lo que es |an |a |the )?(.+?)(?:\s+(?:significa|mean|means))?$/;

  /* Calculadora: porcentajes, IVA y operaciones básicas. tp = texto con números ya convertidos. */
  function calculadora(tp) {
    var nums = tp.match(/-?\d+(?:\.\d+)?/g), m, a, b, r, rate, e, calc, mt;
    if (!nums) return null;
    calc = /\b(cuanto es|cuanto son|cuanto da|calcula|calcular|calculame|resultado de|how much is|what is|calculate|compute)\b/.test(tp);
    if (/\b(iva|vat)\b/.test(tp)) {
      a = parseFloat(nums[0]);
      mt = tp.match(/(?:al|a la tasa de|a una tasa de|at|rate of)\s*(\d+(?:\.\d+)?)\s*(?:%|por ciento|percent)/);
      rate = mt ? parseFloat(mt[1]) : 16;
      if (/\b(sin|quita|quitar|desglosa|desglosar|descuenta|before|without|remove|excluding)\b/.test(tp)) {
        return X('Sin IVA (' + rate + '%): ', 'Without VAT (' + rate + '%): ') + numFmt(a / (1 + rate / 100)) + '.';
      }
      if (/\b(agrega|agregar|mas|con|suma|sumale|incluye|add|plus|including|with)\b/.test(tp)) {
        return X('Con IVA (' + rate + '%): ', 'With VAT (' + rate + '%): ') + numFmt(a * (1 + rate / 100)) + '.';
      }
      return X('El IVA al ' + rate + '% de ' + numFmt(a) + ' es ', 'VAT at ' + rate + '% of ' + numFmt(a) + ' is ') + numFmt(a * rate / 100) + '.';
    }
    m = tp.match(/(?:que porcentaje es|what percent is|what percentage is)\s*(\d+(?:\.\d+)?)\s*(?:de|of)\s*(\d+(?:\.\d+)?)/);
    if (m) { b = parseFloat(m[2]); return b ? X(numFmt(parseFloat(m[1])) + ' es el ' + numFmt(parseFloat(m[1]) / b * 100) + '% de ' + numFmt(b) + '.', numFmt(parseFloat(m[1])) + ' is ' + numFmt(parseFloat(m[1]) / b * 100) + '% of ' + numFmt(b) + '.') : X('No se puede dividir entre cero.', 'Cannot divide by zero.'); }
    m = tp.match(/(\d+(?:\.\d+)?)\s*(?:%|por ciento|percent)\s*(?:de|of)\s*(\d+(?:\.\d+)?)/);
    if (m) { return X('El ' + m[1] + '% de ' + numFmt(parseFloat(m[2])) + ' es ', m[1] + '% of ' + numFmt(parseFloat(m[2])) + ' is ') + numFmt(parseFloat(m[1]) * parseFloat(m[2]) / 100) + '.'; }
    e = ' ' + tp + ' ';
    e = e.replace(/ dividido (?:entre|por) | divided by | over /g, ' / ').replace(/ multiplicado por | times | multiplied by /g, ' * ')
      .replace(/ (?:mas|plus) /g, ' + ').replace(/ (?:menos|minus) /g, ' - ').replace(/ por /g, ' * ').replace(/ entre /g, ' / ').replace(/ x /g, ' * ');
    m = e.match(/(-?\d+(?:\.\d+)?)\s*([+\-*\/])\s*(-?\d+(?:\.\d+)?)/);
    if (m && (calc || /^[\s\d.+\-*\/]+$/.test(e))) {
      a = parseFloat(m[1]); b = parseFloat(m[3]);
      if (m[2] === '/' && b === 0) return X('No se puede dividir entre cero.', 'Cannot divide by zero.');
      r = m[2] === '+' ? a + b : (m[2] === '-' ? a - b : (m[2] === '*' ? a * b : a / b));
      return numFmt(a) + ' ' + m[2] + ' ' + numFmt(b) + ' = ' + numFmt(r) + '.';
    }
    return null;
  }

  /* Atajos web: abren una página en otra pestaña, siempre con tu confirmación. */
  function extraer(texto, rx) {
    var s = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(), m = rx.exec(s), i;
    if (!m || !m[1]) return null;
    if (s.length === texto.length) { i = s.indexOf(m[1], m.index); return texto.substr(i, m[1].length).trim(); }
    return m[1].trim();
  }
  var RXW = {
    ruta: /(?:como llego a|como llegar a|ruta a|ruta hacia|ruta para ir a|ruta para llegar a|llevame a|navega a|navegar a|direcciones a|direcciones para llegar a|indicaciones para llegar a|indicaciones a|directions to|route to|navigate to|how do i get to|how to get to)\s+(.+)$/,
    yt1: /(?:busca|buscar|reproduce|reproducir|pon|ponme|play|search for|search)\s+(.+?)\s+(?:en|on)\s+youtube/,
    musica: /(?:pon|ponme|reproduce|play|quiero escuchar|put on)\s+((?:musica|cancion|canciones|videos?|music|song|songs)\b.*)$/,
    yt2: /youtube\s+(.+)$/,
    waTxt: /(?:diciendo|que diga|que dice|con el mensaje|saying|that says|with the message)\s+(.+)$/,
    google: /^(?:busca|buscar|googlea|investiga|search for|google|look up)\s+(?:en google\s+|on google\s+|en internet\s+)?(.+?)(?:\s+(?:en|on)\s+(?:google|internet|la web|the web))?$/
  };
  function lanzar(nombre, paso) {
    return ejecutarHabilidad({ id: 'tmp', nombre: nombre, pasos: [paso], confirmar: true, efimera: true }, {});
  }
  function atajoWeb(texto, tn) {
    var q;
    q = extraer(texto, RXW.ruta);
    if (q) return lanzar(X('Ruta: ', 'Route: ') + q, { a: 'ruta_maps', p: { origen: '', destino: q } });
    q = extraer(texto, RXW.yt1) || extraer(texto, RXW.musica) || extraer(texto, RXW.yt2);
    if (q) return lanzar('YouTube: ' + q, { a: 'youtube', p: { busqueda: q } });
    if (/\bwhatsapp\b/.test(tn) && /\b(manda|mandale|envia|enviale|escribe|escribele|send|text|write)\b/.test(tn)) {
      q = extraer(texto, RXW.waTxt) || '';
      return lanzar('WhatsApp', { a: 'whatsapp', p: { numero: '', texto: q } });
    }
    q = extraer(texto, RXW.google);
    if (q) return lanzar('Google: ' + q, { a: 'google', p: { busqueda: q } });
    return null;
  }

  /* Atajos de interfaz y de voz (se evalúan antes que los demás: "abre la configuración", "minimízate"…) */
  function atajosUI(tn) {
    var m, id, n = tn.split(' ').length;
    if (/\b(minimiza|minimizate|minimizar|minimize|achicate|achicar)\b/.test(tn)) {
      minimizar(true);
      return X('Listo, me minimicé. Toca mi título para restaurarme.', 'Done, I minimized. Tap my title to restore me.');
    }
    if (/\b(restaura|restaurar|maximiza|maximizar|restore|maximize)\b/.test(tn)) {
      minimizar(false); return X('Aquí estoy de nuevo.', 'I am back.');
    }
    if (/^(cierra|cerrar|oculta|ocultate|close|hide)( el| la)?( asistente| ventana| panel| chat| assistant| window)?$/.test(tn)) {
      setTimeout(function () { abrir(false); }, 60); return X('Hasta luego.', 'See you.');
    }
    if (/\b(modo|tema|theme|mode)\b.*\b(oscuro|dark|negro)\b/.test(tn) || /^(oscuro|dark|dark mode)$/.test(tn)) { setTema('oscuro'); return X('Tema oscuro activado.', 'Dark theme on.'); }
    if (/\b(modo|tema|theme|mode)\b.*\b(claro|light|blanco)\b/.test(tn) || /^(claro|light|light mode)$/.test(tn)) { setTema('claro'); return X('Tema claro activado.', 'Light theme on.'); }
    m = tn.match(/\b(cambia|cambiate|cambiar|pon|ponme|quiero|pasame|dame|switch|change|bring)\b.*\b(nova|clasico|classic|moderno|modern|academico|academic)\b/);
    if (m) {
      id = /nova/.test(m[2]) ? 'nova' : (/clasic|classic/.test(m[2]) ? 'alberto-clasico' : (/modern/.test(m[2]) ? 'alberto-moderno' : 'alberto-academico'));
      elegir(id, false);
      return tr('atiende', { n: L(asistentes[id].nombre), s: asistentes[id].estilo ? ' (' + L(asistentes[id].estilo) + ')' : '' });
    }
    if (/\b(cambia|cambiar|elige|elegir|change|switch)\b.*\b(asistente|avatar|assistant)\b/.test(tn)) {
      ui.sel.classList.add('pa-abierto'); return X('Elige a tu asistente en la parte de arriba.', 'Pick your assistant at the top.');
    }
    if (/\b(mas lento|mas despacio|despacio|slower|slow down)\b/.test(tn)) {
      ritmo = Math.max(0.6, +(ritmo - 0.15).toFixed(2)); guardar('pa_ritmo', String(ritmo)); return X('Hablaré más despacio.', 'I will speak more slowly.');
    }
    if (/\b(mas rapido|mas veloz|rapido|faster|speed up)\b/.test(tn) && /\b(habla|speak|mas|more)\b/.test(tn)) {
      ritmo = Math.min(1.6, +(ritmo + 0.15).toFixed(2)); guardar('pa_ritmo', String(ritmo)); return X('Hablaré más rápido.', 'I will speak faster.');
    }
    if (/^(callate|silencio|deja de hablar|basta|stop talking|be quiet|quiet|silence)$/.test(tn)) {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      nota(X('🔇 En silencio.', '🔇 Quiet.'), 'pa-sis'); mem.nada = true; return '';
    }
    if (/\b(que habilidades|mis habilidades|lista de habilidades|lista mis habilidades|list my skills|my skills)\b/.test(tn)) {
      return HAB.length ? X('Tus habilidades: ', 'Your skills: ') + HAB.map(function (h) { return h.nombre; }).join(', ') + '.'
        : X('Todavía no tienes habilidades. Toca ⚙ para crear una o cargar los ejemplos.', 'You have no skills yet. Tap ⚙ to create one or load the examples.');
    }
    m = tn.match(/\b(configuracion|configurar|ajustes|settings|habilidades|skills|bitacora|log|seguridad|security|preguntas sin respuesta|banco de preguntas)\b/);
    if (m && (n <= 3 || /\b(abre|abrir|muestra|muestrame|ver|ir a|ve a|open|show|go to)\b/.test(tn))) {
      id = /bitacora|log/.test(m[1]) ? 'bit' : (/seguridad|security/.test(m[1]) ? 'seg' : (/preguntas/.test(m[1]) ? 'preg' : 'hab'));
      abrirConfig(id); return X('Abriendo la configuración.', 'Opening settings.');
    }
    return null;
  }

  function sugerir(tn) {
    var mejor = null, ms = 0, lista = indiceBanco().slice();
    if (!tn || tn.length > 40) return '';
    HAB.forEach(function (h) { (h.frases || []).forEach(function (f) { lista.push({ f: norm(f) }); }); });
    lista.forEach(function (x) {
      var s = 1 - lev(tn, x.f) / Math.max(tn.length, x.f.length);
      if (s > ms) { ms = s; mejor = x.f; }
    });
    return (mejor && ms >= 0.62) ? X(' ¿Quisiste decir «' + mejor + '»?', ' Did you mean "' + mejor + '"?') : '';
  }
  function anotarNoEntendi(texto) {
    var k = norm(texto), e;
    if (!k || k.length < 3) return;
    e = NOENT.filter(function (x) { return x.k === k; })[0];
    if (e) { e.n++; e.f = iso(); } else NOENT.push({ k: k, t: String(texto).slice(0, 200), n: 1, f: iso() });
    if (NOENT.length > 300) NOENT.shift();
    jguardar('pa_noent', NOENT);
    if (ui.cfgVista === 'preg') pintarCfg();
  }

  function procesarBanco(texto, tn, tp) {
    var m, r, g, e;
    m = tn.match(RXDEF);
    if (m) {
      if (/\d/.test(tn) && !/\b(iva|vat)\b/.test(tn)) { r = calculadora(tp); if (r) return r; }
      g = mejorGlos(m[1], false);
      if (g) return g[lang] || g.es;
      anotarNoEntendi(texto);
      return X('Todavía no tengo «' + m[1] + '» en mi glosario; ya la anoté para agregarla. Si quieres, di «busca ' + m[1] + '» y abro el buscador.',
        'I do not have "' + m[1] + '" in my glossary yet; I noted it to add it. If you like, say "search ' + m[1] + '" and I will open the search.');
    }
    r = atajoWeb(texto, tn); if (r) return r;
    r = calculadora(tp); if (r) return r;
    e = mejorDe(indiceBanco(), tn);
    if (e && e.s >= 0.78) return respuestaBanco(e.ref);
    g = mejorGlos(tn, true);
    if (g) return g[lang] || g.es;
    return null;
  }

  /* ---------- 8. CONTEXTO (para el futuro modo avanzado) ---------- */
  function paquete(pregunta) {
    var datos = {}, res = {}, a = asistentes[actual];
    (cfg.variables || []).forEach(function (v) { var e = elemento(v); if (e) datos[L(v.nombre)] = parseFloat(e.value); });
    pares().forEach(function (p) { res[p.k] = p.v; });
    return {
      idioma: lang, modelo: L(cfg.modelo), marco: cfg.marco || null, jurisdiccion: cfg.jurisdiccion || null,
      asistente: L(a.nombre) + (a.estilo ? ' (' + L(a.estilo) + ')' : ''),
      datos: datos, resultados: res, extra: cfg.contexto ? cfg.contexto(lang) : {}, pregunta: pregunta || ''
    };
  }

  /* ---------- 9. VOZ ---------- */
  function sinAcentos(t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  var FEM = /\b(dalia|sabina|helena|paulina|monica|elvira|laura|paloma|lupe|marisol|camila|lucia|elena|esperanza|zira|aria|jenny|samantha|victoria|karen|susan|hazel|michelle|emma|ava|google espanol|google us english)\b/;
  var MAS = /\b(jorge|raul|pablo|juan|diego|alvaro|carlos|enrique|jose|miguel|antonio|david|mark|guy|davis|alex|daniel|fred|tom|ryan|eric|christopher|james|roger|andrew|brian)\b/;
  function generoDe(nombre) {
    var n = sinAcentos(nombre);
    if (/female|mujer/.test(n)) return 'f';
    if (/\bmale\b|hombre/.test(n)) return 'm';
    if (MAS.test(n)) return 'm';
    if (FEM.test(n)) return 'f';
    return null;
  }
  // Devuelve { voz, fiel }: fiel = la voz coincide con el nombre o género pedido por el avatar.
  function elegirVoz(a) {
    var todas = ('speechSynthesis' in window) ? (speechSynthesis.getVoices() || []) : [];
    var del = todas.filter(function (v) { return v.lang && v.lang.slice(0, 2).toLowerCase() === lang; });
    if (!del.length) return { voz: null, fiel: false };
    var elegida = leer('pa_vozsel_' + lang);
    if (elegida) {
      var man = del.filter(function (v) { return v.name === elegida; })[0];
      if (man) return { voz: man, fiel: true };
    }
    var t = a.voz || {}, cod = CODIGO[lang].toLowerCase(), mejor = null, mp = -1, fiel = false;
    del.forEach(function (v) {
      var n = sinAcentos(v.name), p = 0, porNombre = false, porGenero = false;
      (t.nombres || []).forEach(function (x, i) { if (n.indexOf(sinAcentos(x)) >= 0) { p = Math.max(p, 100 - i * 10); porNombre = true; } });
      if (t.genero && generoDe(v.name) === t.genero) { p += 50; porGenero = true; }
      if (/natural|online/.test(n)) p += 5;
      if (String(v.lang).toLowerCase().replace('_', '-') === cod) p += 10;
      if (p > mp) { mp = p; mejor = v; fiel = porNombre || porGenero; }
    });
    return { voz: mejor, fiel: fiel };
  }
  function llenarVoces() {
    if (!ui.vozSel || !('speechSynthesis' in window)) return;
    var del = (speechSynthesis.getVoices() || []).filter(function (v) { return v.lang && v.lang.slice(0, 2).toLowerCase() === lang; });
    var sel = leer('pa_vozsel_' + lang) || '';
    ui.vozSel.innerHTML = '';
    var o = document.createElement('option'); o.value = ''; o.textContent = tr('vozAuto'); ui.vozSel.appendChild(o);
    del.forEach(function (v) {
      var x = document.createElement('option'); x.value = v.name;
      x.textContent = v.name.replace(/^Microsoft\s+/, '') + ' (' + v.lang + ')'; ui.vozSel.appendChild(x);
    });
    ui.vozSel.value = del.some(function (v) { return v.name === sel; }) ? sel : '';
    ui.vozLbl.textContent = tr('vozLbl'); ui.vozNota.textContent = tr('vozNota');
  }
  function hablar(texto) {
    if (!hablaOn || !ui.panel || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(texto);
    u.lang = CODIGO[lang];
    var tono = asistentes[actual].voz || {};
    var r = elegirVoz(asistentes[actual]);
    if (r.voz) u.voice = r.voz;
    u.rate = (tono.rate || 1) * ritmo;
    u.pitch = r.fiel ? 1 + ((tono.pitch || 1) - 1) * 0.4 : (tono.pitch || 1);
    u.onstart = function () { ui.panel.classList.add('pa-hablando'); ui.btn.classList.add('pa-hablando'); };
    u.onend = u.onerror = function () { ui.panel.classList.remove('pa-hablando'); ui.btn.classList.remove('pa-hablando'); };
    speechSynthesis.speak(u);
  }
  function escuchar() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { decir(tr('sinVoz')); return; }
    if (escuchando && reco) { reco.stop(); return; }
    reco = new SR();
    reco.lang = CODIGO[lang];
    reco.onstart = function () { escuchando = true; ui.mic.classList.add('pa-on'); };
    reco.onend = reco.onerror = function () { escuchando = false; ui.mic.classList.remove('pa-on'); };
    reco.onresult = function (e) { enviar(e.results[0][0].transcript); };
    reco.start();
  }


  /* ---------- 9b. HABILIDADES: CATÁLOGO, EJECUCIÓN Y BITÁCORA ---------- */
  function cargarDatos() {
    var s;
    HAB = jleer('pa_hab', []); BIT = jleer('pa_bit', []); NOENT = jleer('pa_noent', []); s = jleer('pa_seg', {});
    if (!Array.isArray(HAB)) HAB = [];
    if (!Array.isArray(BIT)) BIT = [];
    if (!Array.isArray(NOENT)) NOENT = [];
    SEG = { ensayo: !!(s && s.ensayo), maxPasos: (s && s.maxPasos) || 20, usuario: (s && s.usuario) || '' };
  }
  function guardarHab() { jguardar('pa_hab', HAB); }
  function guardarSeg() { jguardar('pa_seg', SEG); }
  function guardarBit() { if (BIT.length > 2000) BIT = BIT.slice(-2000); jguardar('pa_bit', BIT); }
  function bitacora(h, modo, res, det, paso) {
    BIT.push({ t: iso(), u: SEG.usuario || '', h: h ? h.nombre : '', m: modo, r: res, p: paso || '', d: det || '' });
    guardarBit();
    if (ui.cfgVista === 'bit') pintarCfg();
  }
  function qq(s) { return lang === 'en' ? '"' + s + '"' : '«' + s + '»'; }
  function sub(s, cx) {
    return String(s === undefined || s === null ? '' : s).replace(/\{(\w+)\}/g, function (m, k) {
      if (cx && cx.vars && cx.vars[k] !== undefined) return cx.vars[k];
      if (k === 'fecha') return fechaLarga();
      if (k === 'hora') return hora12();
      return m;
    });
  }
  function urlSegura(u) {
    var x;
    u = String(u || '').trim();
    if (!u) throw new Error(X('Falta la dirección.', 'The address is missing.'));
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    x = new URL(u);
    if (x.protocol !== 'http:' && x.protocol !== 'https:') throw new Error(X('Solo se permiten enlaces http o https.', 'Only http or https links are allowed.'));
    return x.href;
  }
  function abrirEnlace(url) {
    var w = null, m, a;
    try { w = window.open(url, '_blank'); if (w) w.opener = null; } catch (e) {}
    m = nota(w ? X('Abierto: ', 'Opened: ') : X('Tu navegador bloqueó la pestaña. Haz clic aquí: ', 'Your browser blocked the tab. Click here: '), 'pa-sis');
    if (m) {
      a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = url.length > 70 ? url.slice(0, 67) + '…' : url; m.appendChild(a);
    }
    return w ? X('Abierto en otra pestaña.', 'Opened in another tab.') : X('Enlace listo: haz clic en él.', 'Link ready: click it.');
  }
  function pausa(ms, cx) {
    return new Promise(function (res) {
      var t0 = Date.now();
      (function tick() { if (cx.cancelado || Date.now() - t0 >= ms) return res(); setTimeout(tick, 200); })();
    });
  }
  function esperarVoz() {
    return new Promise(function (res) {
      var n = 0;
      if (!hablaOn || !('speechSynthesis' in window)) return res();
      setTimeout(function tick() {
        if ((!speechSynthesis.speaking && !speechSynthesis.pending) || n++ > 150) return res();
        setTimeout(tick, 200);
      }, 300);
    });
  }

  /* Confirmaciones: botones Sí/No en el chat, o responder "sí"/"no" por voz o texto */
  function preguntar(visible, voz) {
    return new Promise(function (resolve) {
      var m = nota(visible), acc, si, no, hecho = false;
      if (!m) { resolve(false); return; }
      acc = el('div', 'pa-acc'); si = tx('button', 'pa-bt pa-pri', X('Sí', 'Yes')); no = tx('button', 'pa-bt', 'No');
      si.type = 'button'; no.type = 'button';
      function fin(v) {
        if (hecho) return; hecho = true; pend = null; acc.remove();
        nota(v ? X('✓ Confirmado', '✓ Confirmed') : X('✗ Cancelado', '✗ Cancelled'), 'pa-sis');
        resolve(v);
      }
      si.onclick = function () { fin(true); }; no.onclick = function () { fin(false); };
      acc.appendChild(si); acc.appendChild(no); m.appendChild(acc);
      pend = { tipo: 'confirmar', fin: fin };
      mem.ultimoBot = voz || visible; hablar(voz || visible);
    });
  }
  function respuestaPendiente(tn) {
    var si = /^(si|sii|claro|confirmo|confirmado|adelante|dale|ok|okay|va|vale|de acuerdo|hazlo|procede|yes|yep|sure|confirm|go ahead|do it)\b/.test(tn);
    var no = /^(no|nel|cancela|cancelar|cancelalo|detente|alto|mejor no|nope|cancel|stop|abort|dont|do not)\b/.test(tn);
    mem.nada = true;
    if (pend.tipo === 'archivo') {
      if (no) { pend.fin(); return ''; }
      nota(X('Estoy esperando el archivo: usa el botón «Elegir archivo…» o di «cancela».', 'I am waiting for the file: use the "Choose file…" button or say "cancel".'), 'pa-sis');
      return '';
    }
    if (si && !no) { pend.fin(true); return ''; }
    if (no) { pend.fin(false); return ''; }
    nota(X('Responde «sí» o «no» (o usa los botones).', 'Answer "yes" or "no" (or use the buttons).'), 'pa-sis');
    return '';
  }

  /* Archivos CSV / Excel */
  function parseCSV(txt) {
    var primera, c, sep, rows = [], row = [], cur = '', q = false, i, ch;
    txt = String(txt).replace(/^\uFEFF/, '');
    primera = txt.split(/\r?\n/)[0] || '';
    c = { ',': (primera.match(/,/g) || []).length, ';': (primera.match(/;/g) || []).length, '\t': (primera.match(/\t/g) || []).length };
    sep = (c[';'] > c[','] && c[';'] >= c['\t']) ? ';' : (c['\t'] > c[','] ? '\t' : ',');
    for (i = 0; i < txt.length; i++) {
      ch = txt[i];
      if (q) { if (ch === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
      else if (ch === '"') q = true;
      else if (ch === sep) { row.push(cur); cur = ''; }
      else if (ch === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (ch !== '\r') cur += ch;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  function aDataset(rows) {
    var cols, filas;
    rows = rows.filter(function (r) { return r.some(function (x) { return String(x).trim() !== ''; }); });
    if (!rows.length) return { cols: [], filas: [] };
    cols = rows[0].map(function (c, i) { return String(c).trim() || ('Col' + (i + 1)); });
    filas = rows.slice(1).map(function (r) {
      var o = {};
      cols.forEach(function (c, i) { o[c] = r[i] === undefined ? '' : r[i]; });
      return o;
    });
    return { cols: cols, filas: filas };
  }
  function numero(v) {
    var n;
    if (typeof v === 'number') return v;
    n = parseFloat(String(v).replace(/[$\s]/g, '').replace(/,/g, ''));
    return isNaN(n) ? null : n;
  }
  function columnaDe(ds, nombre) {
    var k = norm(nombre), c = null;
    if (!k) return null;
    ds.cols.forEach(function (x) { if (!c && norm(x) === k) c = x; });
    if (!c) ds.cols.forEach(function (x) { if (!c && norm(x).indexOf(k) > -1) c = x; });
    return c;
  }
  function leerArchivo(f) {
    return new Promise(function (resolve, reject) {
      var rd = new FileReader(), ext = (f.name.split('.').pop() || '').toLowerCase(), reintento = false;
      rd.onerror = function () { reject(new Error(X('No pude leer el archivo.', 'I could not read the file.'))); };
      if (ext === 'xlsx' || ext === 'xls') {
        if (!window.XLSX) {
          reject(new Error(X('Para leer Excel (.xlsx) la página debe cargar la librería SheetJS. Mientras tanto guarda el archivo como CSV.', 'To read Excel (.xlsx) the page must load the SheetJS library. Meanwhile save the file as CSV.')));
          return;
        }
        rd.onload = function () {
          try {
            var wb = window.XLSX.read(rd.result, { type: 'array' });
            resolve(aDataset(window.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' })));
          } catch (e) { reject(e); }
        };
        rd.readAsArrayBuffer(f);
      } else {
        rd.onload = function () {
          if (!reintento && String(rd.result).indexOf('\uFFFD') > -1) { reintento = true; rd.readAsText(f, 'windows-1252'); return; }
          resolve(aDataset(parseCSV(rd.result)));
        };
        rd.readAsText(f);
      }
    });
  }
  function pedirArchivo(texto) {
    return new Promise(function (resolve, reject) {
      var m = nota(texto), acc, inp, b1, b2, hecho = false;
      if (!m) { reject(new Error(X('No hay interfaz para pedir el archivo.', 'There is no interface to ask for the file.'))); return; }
      acc = el('div', 'pa-acc'); inp = document.createElement('input');
      inp.type = 'file'; inp.accept = '.csv,.txt,.tsv,.xlsx,.xls'; inp.style.display = 'none';
      inp.setAttribute('data-pa', 'archivo');
      b1 = tx('button', 'pa-bt pa-pri', X('Elegir archivo…', 'Choose file…')); b2 = tx('button', 'pa-bt', X('Cancelar', 'Cancel'));
      b1.type = 'button'; b2.type = 'button';
      function fin(f) {
        if (hecho) return; hecho = true; pend = null; acc.remove();
        if (f) resolve(f); else reject(new Error(X('No se eligió ningún archivo.', 'No file was chosen.')));
      }
      b1.onclick = function () { inp.click(); };
      inp.onchange = function () { fin(inp.files && inp.files[0]); };
      b2.onclick = function () { fin(null); };
      acc.appendChild(b1); acc.appendChild(b2); acc.appendChild(inp); m.appendChild(acc);
      pend = { tipo: 'archivo', fin: function () { fin(null); } };
    });
  }

  /* Catálogo de acciones. g = grupo, ext = sale de la página (siempre pide confirmación),
     esc = requiere el puente de escritorio, mudo = ya muestra su propio mensaje,
     d = descripción, ens = efecto en ensayo, run = ejecución real. */
  var GRUPOS = [['Avisos y control', 'Alerts and control'], ['Web (salen de la página)', 'Web (leave the page)'], ['Datos', 'Data'], ['Modelo', 'Model'], ['Escritorio (requiere puente)', 'Desktop (needs bridge)']];
  function viaPuente(id) {
    return function (p, cx) {
      var pp = {};
      Object.keys(p).forEach(function (k) { pp[k] = sub(p[k], cx); });
      if (!puente || !puente.ejecutar) {
        return Promise.reject(new Error(X('Esta acción necesita la app de escritorio (el puente no está conectado). Pruébala en ensayo o conecta el puente.',
          'This action needs the desktop app (bridge not connected). Try it as a dry run or connect the bridge.')));
      }
      return Promise.resolve(puente.ejecutar(id, pp, cx)).then(function (r) {
        if (r && r.ok === false) throw new Error(r.mensaje || 'Error');
        return (r && r.mensaje) ? r.mensaje : (typeof r === 'string' ? r : 'OK');
      });
    };
  }
  function nomAcc(a) { return a.n[lang === 'en' ? 1 : 0]; }
  var ACC = {
    avisar: { g: 0, mudo: 1, n: ['Avisar con voz y panel', 'Announce (voice and panel)'], c: [{ k: 'texto', n: ['Mensaje', 'Message'], area: 1 }],
      d: function (p, cx) { return X('Decir: ', 'Say: ') + qq(sub(p.texto, cx)); },
      run: function (p, cx) { var t = sub(p.texto, cx); decir(t); return esperarVoz().then(function () { return t; }); } },
    mensaje: { g: 0, mudo: 1, n: ['Mostrar mensaje (sin voz)', 'Show message (no voice)'], c: [{ k: 'texto', n: ['Mensaje', 'Message'], area: 1 }],
      d: function (p, cx) { return X('Mostrar mensaje: ', 'Show message: ') + qq(sub(p.texto, cx)); },
      run: function (p, cx) { var t = sub(p.texto, cx); nota(t); return Promise.resolve(t); } },
    esperar: { g: 0, n: ['Esperar', 'Wait'], c: [{ k: 'seg', n: ['Segundos', 'Seconds'], num: 1 }],
      d: function (p) { return X('Esperar ', 'Wait ') + (p.seg || 1) + ' s'; },
      run: function (p, cx) {
        var s = Math.min(Math.max(parseFloat(sub(p.seg, cx)) || 1, 0.5), 600);
        return pausa(s * 1000, cx).then(function () { return X('Esperé ', 'Waited ') + s + ' s'; });
      } },
    confirmar: { g: 0, n: ['Pedir confirmación', 'Ask for confirmation'], c: [{ k: 'pregunta', n: ['Pregunta', 'Question'], area: 1 }],
      d: function (p, cx) { return X('Preguntar: ', 'Ask: ') + qq(sub(p.pregunta, cx)); },
      run: function (p, cx) {
        return preguntar(sub(p.pregunta, cx)).then(function (ok) {
          if (!ok) throw { cancelado: true, msg: X('Cancelado por el usuario.', 'Cancelled by the user.') };
          return X('Confirmado.', 'Confirmed.');
        });
      } },
    abrir_url: { g: 1, ext: 1, n: ['Abrir página web', 'Open web page'], c: [{ k: 'url', n: ['Dirección (URL)', 'Address (URL)'], ph: ['https://…', 'https://…'] }],
      d: function (p, cx) { return X('Abrir en otra pestaña: ', 'Open in another tab: ') + sub(p.url, cx); },
      run: function (p, cx) { return Promise.resolve(abrirEnlace(urlSegura(sub(p.url, cx)))); } },
    ruta_maps: { g: 1, ext: 1, n: ['Ruta en Google Maps', 'Route in Google Maps'],
      c: [{ k: 'origen', n: ['Origen (vacío = tu ubicación)', 'Origin (empty = your location)'] }, { k: 'destino', n: ['Destino', 'Destination'] }],
      d: function (p, cx) { return X('Abrir una ruta en Google Maps hacia ', 'Open a Google Maps route to ') + qq(sub(p.destino, cx)); },
      run: function (p, cx) {
        var o = sub(p.origen, cx).trim(), d = sub(p.destino, cx).trim();
        if (!d) return Promise.reject(new Error(X('Falta el destino.', 'The destination is missing.')));
        return Promise.resolve(abrirEnlace('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(d) + (o ? '&origin=' + encodeURIComponent(o) : '')));
      } },
    youtube: { g: 1, ext: 1, n: ['Buscar en YouTube', 'Search on YouTube'], c: [{ k: 'busqueda', n: ['Qué buscar', 'What to search'] }],
      d: function (p, cx) { return X('Buscar en YouTube: ', 'Search on YouTube: ') + qq(sub(p.busqueda, cx)); },
      run: function (p, cx) {
        var b = sub(p.busqueda, cx).trim();
        if (!b) return Promise.reject(new Error(X('Falta qué buscar.', 'Nothing to search.')));
        return Promise.resolve(abrirEnlace('https://www.youtube.com/results?search_query=' + encodeURIComponent(b)));
      } },
    google: { g: 1, ext: 1, n: ['Buscar en Google', 'Search on Google'], c: [{ k: 'busqueda', n: ['Qué buscar', 'What to search'] }],
      d: function (p, cx) { return X('Buscar en Google: ', 'Search on Google: ') + qq(sub(p.busqueda, cx)); },
      run: function (p, cx) {
        var b = sub(p.busqueda, cx).trim();
        if (!b) return Promise.reject(new Error(X('Falta qué buscar.', 'Nothing to search.')));
        return Promise.resolve(abrirEnlace('https://www.google.com/search?q=' + encodeURIComponent(b)));
      } },
    whatsapp: { g: 1, ext: 1, n: ['Preparar mensaje de WhatsApp', 'Prepare a WhatsApp message'],
      c: [{ k: 'numero', n: ['Número con lada (vacío = elegir contacto)', 'Number with country code (empty = pick contact)'], ph: ['5215512345678', '15551234567'] }, { k: 'texto', n: ['Mensaje', 'Message'], area: 1 }],
      d: function (p, cx) { return X('Preparar WhatsApp con el mensaje ', 'Prepare WhatsApp with the message ') + qq(sub(p.texto, cx)) + X(' (tú lo envías)', ' (you send it)'); },
      run: function (p, cx) {
        var n = sub(p.numero, cx).replace(/\D/g, ''), t = sub(p.texto, cx);
        return Promise.resolve(abrirEnlace('https://wa.me/' + n + '?text=' + encodeURIComponent(t)));
      } },
    copiar: { g: 2, n: ['Copiar al portapapeles', 'Copy to clipboard'], c: [{ k: 'texto', n: ['Texto', 'Text'], area: 1 }],
      d: function (p, cx) { return X('Copiar al portapapeles: ', 'Copy to clipboard: ') + qq(sub(p.texto, cx)); },
      run: function (p, cx) {
        var t = sub(p.texto, cx);
        return new Promise(function (res, rej) {
          var fallo = function () { rej(new Error(X('El navegador no permitió copiar.', 'The browser did not allow copying.'))); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { res(X('Copiado.', 'Copied.')); }, fallo);
          else fallo();
        });
      } },
    pedir_archivo: { g: 2, n: ['Pedir archivo CSV o Excel', 'Ask for a CSV or Excel file'], c: [{ k: 'variable', n: ['Guardar como (nombre)', 'Save as (name)'], ph: ['datos', 'data'] }],
      d: function (p) { return X('Pedir un archivo CSV o Excel y cargarlo como ', 'Ask for a CSV or Excel file and load it as ') + qq(p.variable || 'datos'); },
      ens: function (p, cx) { var v = (p.variable || 'datos').trim(); cx.vars[v + '_filas'] = '‹' + v + '_filas›'; },
      run: function (p, cx) {
        var v = (p.variable || 'datos').trim();
        return pedirArchivo(X('Elige el archivo para ' + qq(v) + '.', 'Choose the file for ' + qq(v) + '.')).then(leerArchivo).then(function (ds) {
          cx.datos[v] = ds; cx.vars[v + '_filas'] = ds.filas.length;
          return ds.filas.length + X(' filas; columnas: ', ' rows; columns: ') + ds.cols.join(', ');
        });
      } },
    calcular: { g: 2, n: ['Calcular sobre los datos', 'Calculate on the data'],
      c: [{ k: 'variable', n: ['Datos (nombre)', 'Data (name)'], ph: ['datos', 'data'] },
        { k: 'op', n: ['Operación', 'Operation'], sel: [['contar', 'Contar filas', 'Count rows'], ['sumar', 'Sumar columna', 'Sum column'], ['promedio', 'Promedio de columna', 'Average of column'], ['maximo', 'Máximo de columna', 'Maximum of column'], ['minimo', 'Mínimo de columna', 'Minimum of column']] },
        { k: 'columna', n: ['Columna (si aplica)', 'Column (if it applies)'] },
        { k: 'guardar', n: ['Guardar resultado en', 'Save result in'], ph: ['total', 'total'] }],
      d: function (p) {
        return X('Calcular ', 'Calculate ') + (p.op || 'contar') + (p.columna ? X(' de la columna ', ' of column ') + qq(p.columna) : '') + X(' sobre ', ' on ') + qq(p.variable || 'datos') + ' → {' + (p.guardar || 'resultado') + '}';
      },
      ens: function (p, cx) { var g = (p.guardar || 'resultado').trim(); cx.vars[g] = '‹' + g + '›'; },
      run: function (p, cx) {
        var v = (p.variable || 'datos').trim(), ds = cx.datos[v], op = p.op || 'contar', g = (p.guardar || 'resultado').trim(), col, vals, r, suma;
        if (!ds) return Promise.reject(new Error(X('No hay datos cargados como ' + qq(v) + '. Usa antes «Pedir archivo».', 'No data loaded as ' + qq(v) + '. Use "Ask for a file" first.')));
        if (op === 'contar') r = ds.filas.length;
        else {
          col = columnaDe(ds, sub(p.columna, cx));
          if (!col) return Promise.reject(new Error(X('No encuentro la columna ' + qq(p.columna || '') + '. Columnas: ' + ds.cols.join(', '), 'Column ' + qq(p.columna || '') + ' not found. Columns: ' + ds.cols.join(', '))));
          vals = ds.filas.map(function (f) { return numero(f[col]); }).filter(function (x) { return x !== null; });
          if (!vals.length) return Promise.reject(new Error(X('La columna ' + qq(col) + ' no tiene números.', 'Column ' + qq(col) + ' has no numbers.')));
          suma = vals.reduce(function (a, b) { return a + b; }, 0);
          r = op === 'sumar' ? suma : (op === 'promedio' ? suma / vals.length : (op === 'maximo' ? Math.max.apply(null, vals) : Math.min.apply(null, vals)));
        }
        cx.vars[g] = numFmt(r);
        return Promise.resolve(op + (col ? ' (' + col + ')' : '') + ' = ' + numFmt(r));
      } },
    variable: { g: 2, n: ['Guardar un valor', 'Store a value'], c: [{ k: 'nombre', n: ['Nombre (una palabra)', 'Name (one word)'], ph: ['monto', 'amount'] }, { k: 'valor', n: ['Valor', 'Value'] }],
      d: function (p, cx) { return X('Guardar ', 'Store ') + qq(sub(p.valor, cx)) + ' → {' + (p.nombre || '?') + '}'; },
      ens: function (p, cx) { var n = (p.nombre || '').trim(); if (/^\w+$/.test(n)) cx.vars[n] = sub(p.valor, cx); },
      run: function (p, cx) {
        var n = (p.nombre || '').trim();
        if (!/^\w+$/.test(n)) return Promise.reject(new Error(X('El nombre debe ser una sola palabra (letras, números o guion bajo).', 'The name must be one word (letters, numbers or underscore).')));
        cx.vars[n] = sub(p.valor, cx);
        return Promise.resolve('{' + n + '} = ' + cx.vars[n]);
      } },
    bitacora_nota: { g: 2, n: ['Escribir una nota en la bitácora', 'Write a note in the log'], c: [{ k: 'nota', n: ['Nota', 'Note'], area: 1 }],
      d: function (p, cx) { return X('Escribir en la bitácora: ', 'Write in the log: ') + qq(sub(p.nota, cx)); },
      run: function (p, cx) { bitacora(cx.h, cx.ensayo ? 'ensayo' : 'real', 'nota', sub(p.nota, cx), X('Nota', 'Note')); return Promise.resolve(X('Anotado en la bitácora.', 'Written to the log.')); } },
    instruccion: { g: 3, n: ['Darle una instrucción al asistente', 'Give the assistant an instruction'],
      c: [{ k: 'texto', n: ['Instrucción (como si la escribieras)', 'Instruction (as if you typed it)'], ph: ['sube la tasa 10%', 'raise the rate 10%'] }],
      d: function (p, cx) { return X('Decirle al asistente: ', 'Tell the assistant: ') + qq(sub(p.texto, cx)); },
      run: function (p, cx) { return Promise.resolve(procesar(sub(p.texto, cx), { sinHab: true })).then(function (r) { if (r) nota(r); return r || 'OK'; }); } },
    robot_pad: { g: 4, esc: 1, n: ['Lanzar robot de Power Automate', 'Launch a Power Automate robot'],
      c: [{ k: 'flujo', n: ['Nombre del flujo', 'Flow name'], ph: ['SJT', 'SJT'] }, { k: 'params', n: ['Parámetros (clave=valor; clave2=valor2)', 'Parameters (key=value; key2=value2)'], ph: ['MaxPagos=10', 'MaxPagos=10'] }],
      d: function (p, cx) { return X('Lanzar el robot ', 'Launch the robot ') + qq(sub(p.flujo, cx)) + (p.params ? X(' con parámetros ', ' with parameters ') + sub(p.params, cx) : ''); },
      run: viaPuente('robot_pad') },
    macro_excel: { g: 4, esc: 1, n: ['Ejecutar macro de Excel', 'Run an Excel macro'],
      c: [{ k: 'archivo', n: ['Archivo (.xlsm)', 'File (.xlsm)'] }, { k: 'macro', n: ['Nombre de la macro', 'Macro name'] }],
      d: function (p, cx) { return X('Ejecutar la macro ', 'Run the macro ') + qq(sub(p.macro, cx)) + X(' del archivo ', ' of file ') + qq(sub(p.archivo, cx)); },
      run: viaPuente('macro_excel') },
    mover_archivo: { g: 4, esc: 1, n: ['Copiar o mover un archivo', 'Copy or move a file'],
      c: [{ k: 'op', n: ['Operación', 'Operation'], sel: [['copiar', 'Copiar', 'Copy'], ['mover', 'Mover', 'Move']] }, { k: 'origen', n: ['Origen', 'Source'] }, { k: 'destino', n: ['Destino', 'Destination'] }],
      d: function (p, cx) { return (p.op === 'mover' ? X('Mover', 'Move') : X('Copiar', 'Copy')) + X(' el archivo ', ' file ') + qq(sub(p.origen, cx)) + X(' a ', ' to ') + qq(sub(p.destino, cx)); },
      run: viaPuente('mover_archivo') },
    script: { g: 4, esc: 1, n: ['Ejecutar un script autorizado', 'Run an authorized script'],
      c: [{ k: 'nombre', n: ['Nombre del script autorizado', 'Authorized script name'] }, { k: 'args', n: ['Argumentos', 'Arguments'] }],
      d: function (p, cx) { return X('Ejecutar el script autorizado ', 'Run the authorized script ') + qq(sub(p.nombre, cx)); },
      run: viaPuente('script') },
    programa: { g: 4, esc: 1, n: ['Abrir un programa', 'Open a program'], c: [{ k: 'nombre', n: ['Programa', 'Program'] }],
      d: function (p, cx) { return X('Abrir el programa ', 'Open the program ') + qq(sub(p.nombre, cx)); },
      run: viaPuente('programa') }
  };

  function resumenPasos(h, cx) {
    return h.pasos.map(function (s, i) { var a = ACC[s.a]; return (i + 1) + '. ' + (a ? a.d(s.p || {}, cx) : '?'); }).join('\n');
  }
  function ejecutadasHoy(h) {
    var hoy = new Date().toDateString();
    return BIT.filter(function (b) { return b.h === h.nombre && b.m === 'real' && b.r === 'inicio' && new Date(b.t).toDateString() === hoy; }).length;
  }
  function ejecutarHabilidad(h, opt) {
    var ensayo, modo, cx, previo, i = 0;
    opt = opt || {};
    ensayo = !!(opt.ensayo || SEG.ensayo); modo = ensayo ? 'ensayo' : 'real';
    if (corriendo) return Promise.resolve(X('Ya estoy ejecutando ' + qq(corriendo.nombre) + '. Di «cancela» para detenerla.', 'I am already running ' + qq(corriendo.nombre) + '. Say "cancel" to stop it.'));
    if (!h.pasos || !h.pasos.length) return Promise.resolve(X('Esta habilidad no tiene pasos.', 'This skill has no steps.'));
    if (h.pasos.length > SEG.maxPasos) {
      bitacora(h, modo, 'bloqueado', X('Excede el tope de pasos (', 'Exceeds the step limit (') + SEG.maxPasos + ')');
      return Promise.resolve(X('Esta habilidad tiene más pasos que el tope permitido (' + SEG.maxPasos + ').', 'This skill has more steps than the allowed limit (' + SEG.maxPasos + ').'));
    }
    if (!ensayo && h.maxDia > 0 && ejecutadasHoy(h) >= h.maxDia) {
      bitacora(h, modo, 'bloqueado', X('Tope diario alcanzado (', 'Daily limit reached (') + h.maxDia + ')');
      return Promise.resolve(X('Esta habilidad ya alcanzó su tope de ' + h.maxDia + ' ejecuciones hoy.', 'This skill already reached its limit of ' + h.maxDia + ' runs today.'));
    }
    cx = { vars: {}, datos: {}, ensayo: ensayo, h: h, nombre: h.nombre, cancelado: false };
    corriendo = cx;
    previo = (ensayo || !h.confirmar) ? Promise.resolve(true)
      : preguntar(X('Voy a ejecutar ' + qq(h.nombre) + ':\n', 'I am going to run ' + qq(h.nombre) + ':\n') + resumenPasos(h, cx) + X('\n¿Confirmas?', '\nConfirm?'),
        X('Voy a ejecutar ' + qq(h.nombre) + ', ' + h.pasos.length + ' pasos. ¿Confirmas?', 'I am going to run ' + qq(h.nombre) + ', ' + h.pasos.length + ' steps. Confirm?'));
    return previo.then(function (ok) {
      function paso() {
        var s, a, p, idx, antes;
        if (cx.cancelado) throw { cancelado: true, msg: X('Cancelé la ejecución.', 'I cancelled the run.') };
        if (i >= h.pasos.length) return Promise.resolve();
        s = h.pasos[i]; a = ACC[s.a]; p = s.p || {}; idx = ++i;
        if (!a) throw new Error(X('Paso desconocido: ', 'Unknown step: ') + s.a);
        if (ensayo) {
          if (a.ens) a.ens(p, cx);
          nota('🧪 ' + idx + '. ' + a.d(p, cx), 'pa-sis');
          bitacora(h, modo, 'ok', a.d(p, cx), idx + '. ' + nomAcc(a));
          return paso();
        }
        antes = (a.ext && !h.confirmar)
          ? preguntar(X('Voy a ', 'I am going to ') + a.d(p, cx) + X('. ¿Confirmas?', '. Confirm?'))
          : Promise.resolve(true);
        return antes.then(function (ok2) {
          if (!ok2) throw { cancelado: true, msg: X('Cancelado. No ejecuté ese paso.', 'Cancelled. I did not run that step.') };
          if (cx.cancelado) throw { cancelado: true, msg: X('Cancelé la ejecución.', 'I cancelled the run.') };
          return a.run(p, cx);
        }).then(function (txt) {
          if (!a.mudo) nota('✓ ' + idx + '. ' + (txt || a.d(p, cx)), 'pa-sis');
          bitacora(h, modo, 'ok', String(txt || ''), idx + '. ' + nomAcc(a));
          return paso();
        }, function (e) { if (e && typeof e === 'object') e.paso = idx; throw e; });
      }
      if (!ok) { bitacora(h, modo, 'cancelado', X('No se confirmó la ejecución.', 'The run was not confirmed.')); throw { cancelado: true, msg: X('Cancelado. No ejecuté nada.', 'Cancelled. Nothing was executed.') }; }
      if (ensayo) nota(X('🧪 Ensayo de ', '🧪 Dry run of ') + qq(h.nombre) + X(': no se ejecuta nada.', ': nothing is executed.'), 'pa-sis');
      bitacora(h, modo, 'inicio', h.pasos.length + X(' pasos', ' steps'));
      return paso();
    }).then(function () {
      bitacora(h, modo, 'fin', X('Terminó correctamente.', 'Finished successfully.'));
      corriendo = null;
      return X('Listo: ' + qq(h.nombre) + ' terminó (' + h.pasos.length + ' pasos).' + (ensayo ? ' Fue un ensayo: no se ejecutó nada.' : ''),
        'Done: ' + qq(h.nombre) + ' finished (' + h.pasos.length + ' steps).' + (ensayo ? ' This was a dry run: nothing was executed.' : ''));
    }, function (e) {
      var msg, num;
      corriendo = null;
      if (e && e.cancelado) { bitacora(h, modo, 'cancelado', e.msg, e.paso ? String(e.paso) : ''); return e.msg; }
      msg = (e && e.message) ? e.message : String(e); num = (e && e.paso) || '?';
      bitacora(h, modo, 'error', msg, e && e.paso ? String(e.paso) : '');
      return X('Me detuve en el paso ' + num + ' de ' + qq(h.nombre) + ': ' + msg, 'I stopped at step ' + num + ' of ' + qq(h.nombre) + ': ' + msg);
    });
  }
  function buscarHabilidad(tn) {
    var lista = [], m;
    HAB.forEach(function (h) {
      if (h.activa === false) return;
      (h.frases || []).forEach(function (f) { var nf = norm(f); if (nf) lista.push({ f: nf, ref: h }); });
    });
    m = mejorDe(lista, tn);
    return (m && m.s >= 0.8) ? m.ref : null;
  }
  var RXENS = /^(ensaya|ensayo|ensayar|simula|simular|dry run|rehearse|simulate)\s+(?:de\s+|la\s+|el\s+|the\s+)?(.+)$/;

  /* Habilidades de ejemplo y archivo CSV de prueba */
  function ejemplos() {
    return [
      { nombre: X('Ruta al aeropuerto', 'Route to the airport'), frases: X(['ruta al aeropuerto', 'como llego al aeropuerto'], ['route to the airport', 'how do i get to the airport']), confirmar: true, maxDia: 0,
        pasos: [{ a: 'ruta_maps', p: { origen: '', destino: X('Aeropuerto Internacional de la Ciudad de México', 'Mexico City International Airport') } }] },
      { nombre: X('Música para concentrarme', 'Focus music'), frases: X(['musica para concentrarme', 'pon musica para trabajar'], ['focus music', 'play music to work']), confirmar: true, maxDia: 0,
        pasos: [{ a: 'youtube', p: { busqueda: X('música instrumental para concentrarse', 'instrumental focus music') } }] },
      { nombre: X('Avisar que voy en camino', 'Let them know I am on my way'), frases: X(['avisa que voy en camino', 'manda aviso de que voy en camino'], ['tell them i am on my way', 'let them know i am coming']), confirmar: true, maxDia: 0,
        pasos: [{ a: 'whatsapp', p: { numero: '', texto: X('Voy en camino, llego en unos 20 minutos.', 'I am on my way, I will arrive in about 20 minutes.') } }] },
      { nombre: X('Resumen del día', 'Daily snapshot'), frases: X(['resumen del dia', 'que fecha y hora es'], ['daily snapshot', 'what is the date and time']), confirmar: false, maxDia: 0,
        pasos: [{ a: 'avisar', p: { texto: X('Hoy es {fecha}. Son las {hora}.', 'Today is {fecha}. It is {hora}.') } }] },
      { nombre: X('Recordatorio de un minuto', 'One-minute reminder'), frases: X(['recuerdame en un minuto', 'avisame en un minuto'], ['remind me in one minute', 'tell me in one minute']), confirmar: false, maxDia: 0,
        pasos: [{ a: 'avisar', p: { texto: X('Entendido, te aviso en un minuto.', 'Understood, I will tell you in one minute.') } }, { a: 'esperar', p: { seg: '60' } }, { a: 'avisar', p: { texto: X('Ha pasado un minuto.', 'One minute has passed.') } }] },
      { nombre: X('Aplicar pagos del día (demo)', 'Apply the day payments (demo)'), frases: X(['aplica los pagos', 'aplicar pagos del dia', 'captura los pagos'], ['apply the payments', 'apply the day payments']), confirmar: true, maxDia: 1,
        pasos: [
          { a: 'avisar', p: { texto: X('Voy a preparar los pagos del día.', 'I am going to prepare the day payments.') } },
          { a: 'pedir_archivo', p: { variable: 'pagos' } },
          { a: 'calcular', p: { variable: 'pagos', op: 'contar', columna: '', guardar: 'n' } },
          { a: 'calcular', p: { variable: 'pagos', op: 'sumar', columna: X('Importe', 'Amount'), guardar: 'total' } },
          { a: 'confirmar', p: { pregunta: X('Encontré {n} pagos por un total de {total}. ¿Los aplico?', 'I found {n} payments totaling {total}. Shall I apply them?') } },
          { a: 'robot_pad', p: { flujo: 'SJT', params: 'MaxPagos={n}' } },
          { a: 'bitacora_nota', p: { nota: X('Se solicitó aplicar {n} pagos por {total}.', 'Applying {n} payments totaling {total} was requested.') } },
          { a: 'avisar', p: { texto: X('Listo, terminé de aplicar los pagos.', 'Done, I finished applying the payments.') } }] }
    ];
  }
  function csvEjemplo() {
    var rows = [[X('Proveedor', 'Supplier'), X('Factura', 'Invoice'), X('Vencimiento', 'Due date'), X('Importe', 'Amount')]], i;
    var imp = [12450.5, 8300, 15920.75, 4100, 27800, 9650.25, 6120, 18400, 3275.8, 21500, 7890, 11230.4];
    for (i = 0; i < 12; i++) rows.push([X('Proveedor Demo ', 'Demo Supplier ') + ('0' + (i + 1)).slice(-2), 'F-' + (1001 + i), '2026-11-' + ('0' + (i + 3)).slice(-2), imp[i]]);
    return rows.map(function (r) { return r.map(function (c) { return /[",\n]/.test(String(c)) ? '"' + String(c).replace(/"/g, '""') + '"' : c; }).join(','); }).join('\r\n');
  }

  /* ---------- 10. INTERFAZ ---------- */
  var NH = '.pa-hablando .pa-av.pa-nova ', NB = '.pa-btn.pa-nova.pa-hablando ';
  var CSS = '' +
    '.pa-btn{position:fixed;right:18px;bottom:18px;width:68px;height:68px;border-radius:50%;border:3px solid #1F4D3F;background:#fff;padding:0;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:99998;overflow:hidden}' +
    '.pa-btn svg,.pa-av svg,.pa-th svg{display:block;width:100%;height:100%}' +
    '.pa-panel{position:fixed;right:18px;bottom:96px;width:360px;max-width:calc(100vw - 36px);height:480px;max-height:calc(100vh - 120px);display:none;flex-direction:column;background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.3);overflow:hidden;z-index:99999;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#1c2a26}' +
    '.pa-panel.pa-abierto{display:flex}' +
    '.pa-head{background:#1F4D3F;color:#F2F5EE;padding:10px 10px;display:flex;align-items:center;gap:6px}' +
    '.pa-av{width:48px;height:48px;border-radius:50%;overflow:hidden;border:2px solid #F2F5EE;flex:none}' +
    '.pa-tit{flex:1;min-width:0;margin-left:2px}.pa-tit b{display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pa-tit span{display:block;font-size:11.5px;opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.pa-ib{background:transparent;border:1px solid rgba(242,245,238,.45);color:#F2F5EE;border-radius:8px;padding:4px 7px;cursor:pointer;font-size:13px;flex:none}' +
    '.pa-ib:hover{background:rgba(255,255,255,.15)}.pa-ib b{color:#D9A441}' +
    '.pa-sel{display:none;flex-direction:column;gap:8px;padding:8px 12px;background:#E3EBE5;border-bottom:1px solid #cdd8d0}' +
    '.pa-sel-av{display:flex;gap:10px;overflow-x:auto}' +
    '.pa-voz{display:flex;flex-direction:column;gap:3px;font-size:11.5px;color:#1c2a26}.pa-voz label{font-weight:600}' +
    '.pa-voz select{width:100%;border:1px solid #b9c6bf;border-radius:8px;padding:5px 6px;font:inherit;background:#fff;color:#1c2a26}.pa-voz small{opacity:.75;line-height:1.3}' +
    '.pa-sel.pa-abierto{display:flex}' +
    '.pa-th{flex:none;width:58px;text-align:center;font-size:11px;cursor:pointer;background:none;border:0;padding:0;color:#1c2a26}' +
    '.pa-th div{width:44px;height:44px;border-radius:50%;overflow:hidden;margin:0 auto 2px;border:2px solid transparent}' +
    '.pa-th.pa-sel1 div{border-color:#D9A441}' +
    '.pa-msgs{flex:1;overflow-y:auto;padding:10px;background:#EEF1F0;display:flex;flex-direction:column;gap:8px}' +
    '.pa-m{max-width:86%;padding:8px 11px;border-radius:12px;word-wrap:break-word}' +
    '.pa-bot{background:#fff;border:1px solid #d5ddd9;align-self:flex-start}' +
    '.pa-usr{background:#CFE5DA;align-self:flex-end}' +
    '.pa-foot{display:flex;gap:6px;padding:8px;border-top:1px solid #d5ddd9;background:#fff}' +
    '.pa-foot input{flex:1;min-width:0;border:1px solid #b9c6bf;border-radius:8px;padding:8px 10px;font:inherit}' +
    '.pa-foot button{border:0;border-radius:8px;padding:0 11px;cursor:pointer;font-size:16px;background:#1F4D3F;color:#fff}' +
    '.pa-foot button.pa-on{background:#D9A441;color:#1c2a26}' +
    '.pa-foot input:focus-visible,.pa-foot button:focus-visible,.pa-ib:focus-visible,.pa-btn:focus-visible,.pa-th:focus-visible{outline:2px solid #D9A441;outline-offset:2px}' +
    '.pa-av .boca,.pa-btn .boca{transform-box:fill-box;transform-origin:50% 0}' +
    '.pa-av .ojo,.pa-btn .ojo{transform-box:fill-box;transform-origin:50% 50%;animation:pa-parp 5s infinite}' +
    '.pa-hablando .boca{animation:pa-boca .22s infinite alternate}' +
    '@keyframes pa-boca{from{transform:scaleY(1)}to{transform:scaleY(1.9)}}' +
    '@keyframes pa-parp{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
    '.pa-btn.pa-nova,.pa-av.pa-nova{border-color:#2B9BFF;background:#030812}' +
    '.nv-halo,.nv-aro,.nv-rombo,.nv-brillo{transform-box:fill-box;transform-origin:50% 50%}' +
    '.pa-nova .nv-brillo{opacity:.4;animation:nv-idle 3.2s ease-in-out infinite alternate}' +
    '.pa-nova .nv-rombo{animation:nv-resp 4s ease-in-out infinite}' +
    NH + '.nv-brillo,' + NB + '.nv-brillo{animation:nv-brillo .7s ease-in-out infinite alternate}' +
    NH + '.nv-halo,' + NB + '.nv-halo{animation:nv-halo .9s ease-in-out infinite alternate}' +
    NH + '.nv-aro,' + NB + '.nv-aro{animation:nv-aro .5s ease-in-out infinite alternate}' +
    NH + '.nv-rombo,' + NB + '.nv-rombo{animation:nv-rombo .45s ease-in-out infinite alternate}' +
    NB.trim() + '{animation:nv-glow .8s ease-in-out infinite alternate}' +
    NH.trim() + '{animation:nv-glow2 .8s ease-in-out infinite alternate}' +
    '@keyframes nv-idle{from{opacity:.3}to{opacity:.55}}' +
    '@keyframes nv-resp{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}' +
    '@keyframes nv-brillo{from{opacity:.5;transform:scale(.9)}to{opacity:1;transform:scale(1.3)}}' +
    '@keyframes nv-halo{from{transform:scale(1);stroke-opacity:.2}to{transform:scale(1.1);stroke-opacity:.6}}' +
    '@keyframes nv-aro{from{transform:scale(1);opacity:.9}to{transform:scale(1.045);opacity:1}}' +
    '@keyframes nv-rombo{from{transform:scale(1)}to{transform:scale(1.14)}}' +
    '@keyframes nv-glow{from{box-shadow:0 0 10px 2px rgba(43,155,255,.45)}to{box-shadow:0 0 26px 8px rgba(80,200,255,.85)}}' +
    '@keyframes nv-glow2{from{box-shadow:0 0 6px 1px rgba(43,155,255,.45)}to{box-shadow:0 0 12px 3px rgba(80,200,255,.85)}}' +
    '@media (prefers-reduced-motion:reduce){.pa-av .ojo,.pa-btn .ojo,.pa-hablando .boca{animation:none}' +
    '.pa-nova .nv-brillo,.pa-nova .nv-rombo,' + NH + '.nv-brillo,' + NH + '.nv-halo,' + NH + '.nv-aro,' + NH + '.nv-rombo,' + NB + '.nv-brillo,' + NB + '.nv-halo,' + NB + '.nv-aro,' + NB + '.nv-rombo{animation:none}' +
    NH + '.nv-brillo,' + NB + '.nv-brillo{opacity:.95}' +
    NB.trim() + ',' + NH.trim() + '{animation:none;box-shadow:0 0 16px 4px rgba(80,200,255,.8)}}';

  CSS += '' +
    '.pa-panel label,.pa-panel small,.pa-panel p,.pa-panel h3,.pa-panel b{margin:0;font-weight:400;letter-spacing:normal;text-transform:none}.pa-panel b{font-weight:600}' +
    '.pa-panel h3.pa-h3{margin:4px 0 0;font-weight:700}.pa-panel .pa-welcome p{margin:0}.pa-panel input[type=checkbox]{width:auto;margin:0}' +
    '.pa-voz label,.pa-f>span{font-weight:600}.pa-panel .pa-tit b{font-weight:600}' +
    '.pa-panel.pa-cfgon.pa-ancho{width:760px}' +
    '.pa-head{cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none}.pa-head:active{cursor:grabbing}' +
    '.pa-btn{touch-action:none}' +
    '.pa-m{white-space:pre-wrap}' +
    '.pa-m.pa-sis{background:transparent;border:0;font-size:12px;opacity:.85;padding:2px 4px;align-self:flex-start}' +
    '.pa-m a{color:#0B5CAD;word-break:break-all}' +
    '.pa-tools{display:flex;gap:6px;align-items:center;padding:6px 10px;background:#F2F5EE;border-bottom:1px solid #d5ddd9;flex-wrap:wrap}' +
    '.pa-tb{background:#fff;border:1px solid #b9c6bf;color:#1c2a26;border-radius:8px;padding:3px 9px;cursor:pointer;font-size:13px;flex:none}' +
    '.pa-tb:hover{background:#E3EBE5}.pa-tb b{color:#8A5A00}' +
    '.pa-tb:focus-visible,.pa-bt:focus-visible,.pa-tab:focus-visible{outline:2px solid #D9A441;outline-offset:2px}' +
    '.pa-panel.pa-min{height:auto!important;width:290px!important}' +
    '.pa-min .pa-tools,.pa-min .pa-sel,.pa-min .pa-msgs,.pa-min .pa-foot,.pa-min .pa-cfg{display:none!important}' +
    '.pa-min .pa-head{cursor:pointer}' +
    '.pa-acc{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}' +
    '.pa-panel.pa-cfgon{width:500px;height:620px}' +
    '.pa-cfg{display:none;flex:1;min-height:0;flex-direction:column;background:#EEF1F0;color:#1c2a26}' +
    '.pa-cfgon .pa-cfg{display:flex}.pa-cfgon .pa-msgs,.pa-cfgon .pa-foot{display:none}' +
    '.pa-tabs{display:flex;gap:4px;padding:6px 8px;background:#E3EBE5;border-bottom:1px solid #cdd8d0;flex-wrap:wrap;align-items:center}' +
    '.pa-tab{border:1px solid #b9c6bf;background:#fff;border-radius:8px;padding:4px 9px;cursor:pointer;font-size:12.5px;color:#1c2a26}' +
    '.pa-tab.pa-on{background:#1F4D3F;color:#fff;border-color:#1F4D3F}' +
    '.pa-sp-r{margin-left:auto}' +
    '.pa-cfgbody{flex:1;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px}' +
    '.pa-bar{display:flex;gap:6px;flex-wrap:wrap;align-items:center}' +
    '.pa-bt{border:1px solid #b9c6bf;background:#fff;color:#1c2a26;border-radius:8px;padding:5px 10px;cursor:pointer;font-size:12.5px}' +
    '.pa-bt:hover{background:#E3EBE5}.pa-bt.pa-pri{background:#1F4D3F;color:#fff;border-color:#1F4D3F}.pa-bt.pa-pel{border-color:#B3261E;color:#B3261E}' +
    '.pa-card{background:#fff;border:1px solid #d5ddd9;border-radius:10px;padding:8px 10px;display:flex;flex-direction:column;gap:4px}' +
    '.pa-card.pa-off{opacity:.55}.pa-ct{display:flex;align-items:center;gap:8px;justify-content:space-between}' +
    '.pa-cfgbody small{opacity:.75;line-height:1.3}.pa-nota{margin:0;font-size:12.5px}' +
    '.pa-h3{margin:4px 0 0;font-size:14px}' +
    '.pa-f{display:flex;flex-direction:column;gap:3px;font-size:12.5px}.pa-f>span{font-weight:600}' +
    '.pa-f input[type=text],.pa-f input[type=number],.pa-f textarea,.pa-f select,.pa-bar select,.pa-cfgbody>input[type=text]{border:1px solid #b9c6bf;border-radius:8px;padding:6px 8px;font:inherit;background:#fff;color:#1c2a26;box-sizing:border-box}' +
    '.pa-f input,.pa-f textarea,.pa-f select,.pa-cfgbody>input[type=text]{width:100%}.pa-f textarea{min-height:58px;resize:vertical}' +
    '.pa-chk{display:flex;align-items:center;gap:6px;font-size:12.5px}' +
    '.pa-paso{background:#fff;border:1px solid #d5ddd9;border-left:4px solid #1F4D3F;border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:6px}' +
    '.pa-paso.pa-ext{border-left-color:#D9A441}.pa-paso.pa-esc{border-left-color:#2B6BD9}.pa-pasos{display:flex;flex-direction:column;gap:8px}' +
    '.pa-fin{position:sticky;bottom:-10px;background:#EEF1F0;padding:8px 0}' +
    '.pa-tabla{overflow:auto;border:1px solid #d5ddd9;border-radius:8px;background:#fff;flex:1;min-height:120px}' +
    '.pa-tabla table{border-collapse:collapse;width:100%;font-size:11.5px}.pa-tabla th,.pa-tabla td{border-bottom:1px solid #e3e8e5;padding:4px 6px;text-align:left;vertical-align:top}' +
    '.pa-tabla th{position:sticky;top:0;background:#E3EBE5}' +
    '.pa-r-error,.pa-r-bloqueado{color:#B3261E;font-weight:600}.pa-r-ok,.pa-r-fin{color:#1B7A3E}.pa-r-cancelado{color:#8A5A00}' +
    '.pa-welcome{background:#fff;border:1px solid #d5ddd9;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}' +
    '.pa-welcome p{margin:0;font-size:13px}' +
    '.pa-wi{width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid #D9A441}.pa-wi svg{width:100%;height:100%;display:block}' +
    '.pa-aviso{background:#FFF4D6;border:1px solid #D9A441;color:#4a3300;border-radius:8px;padding:6px 10px;font-size:12.5px}' +
    /* tema oscuro */
    '.pa-osc{background:#1b2420;color:#e7ece9}' +
    '.pa-osc .pa-tools{background:#16201c;border-color:#33433b}' +
    '.pa-osc .pa-tb,.pa-osc .pa-bt,.pa-osc .pa-tab{background:#222d28;color:#e7ece9;border-color:#41564c}' +
    '.pa-osc .pa-tb:hover,.pa-osc .pa-bt:hover{background:#2c3a33}.pa-osc .pa-tb b{color:#D9A441}' +
    '.pa-osc .pa-bt.pa-pri,.pa-osc .pa-tab.pa-on{background:#2f6b54;color:#fff;border-color:#2f6b54}.pa-osc .pa-bt.pa-pel{color:#ff8a80;border-color:#ff8a80}' +
    '.pa-osc .pa-msgs,.pa-osc .pa-cfg{background:#141b18;color:#e7ece9}' +
    '.pa-osc .pa-bot{background:#222d28;border-color:#33433b;color:#e7ece9}.pa-osc .pa-usr{background:#2f5a47;color:#fff}' +
    '.pa-osc .pa-m a{color:#8CC4FF}.pa-osc .pa-m.pa-sis{background:transparent}' +
    '.pa-osc .pa-foot{background:#1b2420;border-color:#33433b}.pa-osc .pa-foot input{background:#141b18;border-color:#41564c;color:#e7ece9}' +
    '.pa-osc .pa-sel{background:#222d28;border-color:#33433b}.pa-osc .pa-th{color:#e7ece9}' +
    '.pa-osc .pa-voz{color:#e7ece9}.pa-osc .pa-voz select{background:#141b18;color:#e7ece9;border-color:#41564c}' +
    '.pa-osc .pa-tabs{background:#16201c;border-color:#33433b}' +
    '.pa-osc .pa-card,.pa-osc .pa-paso,.pa-osc .pa-welcome,.pa-osc .pa-tabla{background:#1b2420;border-color:#33433b}' +
    '.pa-osc .pa-f input[type=text],.pa-osc .pa-f input[type=number],.pa-osc .pa-f textarea,.pa-osc .pa-f select,.pa-osc .pa-bar select,.pa-osc .pa-cfgbody>input[type=text]{background:#141b18;color:#e7ece9;border-color:#41564c}' +
    '.pa-osc .pa-tabla th{background:#222d28}.pa-osc .pa-tabla th,.pa-osc .pa-tabla td{border-color:#33433b}' +
    '.pa-osc .pa-fin{background:#141b18}.pa-osc .pa-aviso{background:#3b2f10;color:#ffe9a8}' +
    '.pa-osc .pa-r-ok,.pa-osc .pa-r-fin{color:#7fd69b}.pa-osc .pa-r-cancelado{color:#E3B04B}.pa-osc .pa-r-error,.pa-osc .pa-r-bloqueado{color:#ff8a80}';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function nota(texto, cls) {
    var m;
    if (!ui.msgs) return null;
    m = el('div', 'pa-m pa-bot' + (cls ? ' ' + cls : '')); m.textContent = texto;
    ui.msgs.appendChild(m); ui.msgs.scrollTop = ui.msgs.scrollHeight;
    return m;
  }
  function decir(texto) {
    if (!ui.msgs) return;
    nota(texto); mem.ultimoBot = texto;
    hablar(texto);
  }
  function enviar(texto) {
    var m, r, sinMsg;
    texto = String(texto || '').trim();
    if (!texto || !ui.msgs) return;
    m = el('div', 'pa-m pa-usr'); m.textContent = texto;
    ui.msgs.appendChild(m); ui.msgs.scrollTop = ui.msgs.scrollHeight;
    mem.nada = false;
    try { r = procesar(texto); } catch (e) { r = tr('falla', { e: e.message }); }
    sinMsg = mem.nada; mem.nada = false;
    if (sinMsg) return;
    Promise.resolve(r).then(function (x) { decir(x || tr('listoSolo')); }, function (e) { decir(tr('falla', { e: (e && e.message) || '' })); });
  }
  function pintarAsistente() {
    var a = asistentes[actual];
    ui.av.innerHTML = a.dibujo();
    ui.btn.innerHTML = a.dibujo();
    ui.btn.classList.toggle('pa-nova', a.clase === 'pa-nova');
    ui.av.classList.toggle('pa-nova', a.clase === 'pa-nova');
    ui.nombre.textContent = L(a.nombre);
    ui.estilo.textContent = (a.estilo ? L(a.estilo) + ' · ' : '') + L(cfg.modelo);
    ui.selAv.innerHTML = '';
    orden.forEach(function (id) {
      var x = asistentes[id];
      var b = el('button', 'pa-th' + (id === actual ? ' pa-sel1' : ''), '<div>' + x.dibujo() + '</div>' + (L(x.estilo) || L(x.nombre)));
      b.type = 'button';
      b.setAttribute('aria-label', L(x.nombre) + ' ' + L(x.estilo));
      b.onclick = function () { elegir(id, true); };
      ui.selAv.appendChild(b);
    });
  }
  function aplicarIdioma() {
    if (!ui.panel) return;
    ui.inp.placeholder = tr('placeholder'); ui.env.textContent = tr('enviar');
    ui.btn.setAttribute('aria-label', tr('abrir')); ui.cerrar.setAttribute('aria-label', tr('cerrar')); ui.cerrar.title = tr('cerrar');
    ui.cambiar.setAttribute('aria-label', tr('cambiar')); ui.cambiar.title = tr('cambiar');
    ui.mic.setAttribute('aria-label', tr('mic')); ui.vol.setAttribute('aria-label', tr('voz'));
    ui.idi.innerHTML = lang === 'es' ? '<b>ES</b>|EN' : 'ES|<b>EN</b>';
    ui.idi.setAttribute('aria-label', tr('cambiaIdioma'));
    ui.vol.textContent = hablaOn ? '🔊' : '🔇';
    ui.min.title = ui.panel.classList.contains('pa-min') ? X('Restaurar', 'Restore') : X('Minimizar', 'Minimize'); ui.min.setAttribute('aria-label', ui.min.title);
    ui.temaB.title = X('Cambiar tema claro u oscuro', 'Switch light or dark theme'); ui.temaB.setAttribute('aria-label', ui.temaB.title);
    ui.cfgB.title = X('Configuración y habilidades', 'Settings and skills'); ui.cfgB.setAttribute('aria-label', ui.cfgB.title);
    ui.head.title = X('Arrastra para mover', 'Drag to move');
    ui.btn.title = X('Abrir asistente (puedes arrastrarme)', 'Open assistant (you can drag me)');
    pintarAsistente();
    llenarVoces();
    pintarCfg();
  }
  function elegir(id, avisar) {
    if (!asistentes[id]) return;
    actual = id; guardar('pa_asistente', id);
    pintarAsistente();
    ui.sel.classList.remove('pa-abierto');
    if (avisar) decir(tr('atiende', { n: L(asistentes[id].nombre), s: asistentes[id].estilo ? ' (' + L(asistentes[id].estilo) + ')' : '' }));
  }
  function construir() {
    var st = el('style'), head, tit, tools, foot, pp, pb;
    st.textContent = CSS; document.head.appendChild(st);
    ui.btn = el('button', 'pa-btn'); ui.btn.type = 'button';
    ui.panel = el('div', 'pa-panel'); ui.panel.setAttribute('role', 'dialog');
    head = el('div', 'pa-head'); ui.head = head;
    ui.av = el('div', 'pa-av');
    tit = el('div', 'pa-tit', '<b></b><span></span>'); ui.tit = tit;
    ui.nombre = tit.firstChild; ui.estilo = tit.lastChild;
    ui.min = el('button', 'pa-ib', '—'); ui.min.type = 'button';
    ui.cerrar = el('button', 'pa-ib', '✕'); ui.cerrar.type = 'button';
    [ui.av, tit, ui.min, ui.cerrar].forEach(function (x) { head.appendChild(x); });
    tools = el('div', 'pa-tools');
    ui.idi = el('button', 'pa-tb'); ui.vol = el('button', 'pa-tb');
    ui.temaB = el('button', 'pa-tb', '🌓'); ui.cambiar = el('button', 'pa-tb', '⇄'); ui.cfgB = el('button', 'pa-tb', '⚙');
    [ui.idi, ui.vol, ui.temaB, ui.cambiar, ui.cfgB].forEach(function (x) { x.type = 'button'; tools.appendChild(x); });
    ui.sel = el('div', 'pa-sel');
    ui.selAv = el('div', 'pa-sel-av');
    ui.vozBox = el('div', 'pa-voz', '<label></label><select></select><small></small>');
    ui.vozLbl = ui.vozBox.children[0]; ui.vozSel = ui.vozBox.children[1]; ui.vozNota = ui.vozBox.children[2];
    ui.sel.appendChild(ui.selAv); ui.sel.appendChild(ui.vozBox);
    if (!('speechSynthesis' in window)) ui.vozBox.style.display = 'none';
    else if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', llenarVoces);
    ui.vozSel.onchange = function () { guardar('pa_vozsel_' + lang, ui.vozSel.value); hablar(tr('prueba')); };
    ui.msgs = el('div', 'pa-msgs'); ui.msgs.setAttribute('aria-live', 'polite');
    foot = el('div', 'pa-foot');
    ui.inp = el('input'); ui.inp.type = 'text';
    ui.mic = el('button', '', '🎤'); ui.mic.type = 'button';
    ui.env = el('button'); ui.env.type = 'button'; ui.env.style.fontSize = '13px';
    foot.appendChild(ui.inp); foot.appendChild(ui.mic); foot.appendChild(ui.env);
    ui.cfg = el('div', 'pa-cfg'); ui.cfgTabs = el('div', 'pa-tabs'); ui.cfgBody = el('div', 'pa-cfgbody');
    ui.cfg.appendChild(ui.cfgTabs); ui.cfg.appendChild(ui.cfgBody);
    [head, tools, ui.sel, ui.msgs, foot, ui.cfg].forEach(function (x) { ui.panel.appendChild(x); });
    document.body.appendChild(ui.panel); document.body.appendChild(ui.btn);

    ui.btn.onclick = function () {
      if (ui.btn._arr) return;
      abrir(!ui.panel.classList.contains('pa-abierto'));
    };
    ui.cerrar.onclick = function () { abrir(false); };
    ui.min.onclick = function () { minimizar(!ui.panel.classList.contains('pa-min')); };
    head.onclick = function (e) {
      if (e.target.closest && e.target.closest('button')) return;
      if (ui.panel._arr) return;
      if (ui.panel.classList.contains('pa-min')) minimizar(false);
    };
    ui.cambiar.onclick = function () { ui.sel.classList.toggle('pa-abierto'); };
    ui.cfgB.onclick = function () { if (ui.panel.classList.contains('pa-cfgon')) cerrarConfig(); else abrirConfig(); };
    ui.temaB.onclick = function () { setTema(tema === 'oscuro' ? 'claro' : 'oscuro'); };
    ui.idi.onclick = function () { decir(cambiarIdioma(lang === 'es' ? 'en' : 'es')); };
    ui.vol.onclick = function () {
      hablaOn = !hablaOn; guardar('pa_voz', hablaOn ? '1' : '0'); aplicarIdioma();
      if (!hablaOn && 'speechSynthesis' in window) speechSynthesis.cancel();
    };
    ui.mic.onclick = escuchar;
    ui.env.onclick = function () { enviar(ui.inp.value); ui.inp.value = ''; };
    ui.inp.onkeydown = function (e) { if (e.key === 'Enter') { enviar(ui.inp.value); ui.inp.value = ''; } };

    arrastrable(head, ui.panel, 'pa_pos_panel');
    arrastrable(ui.btn, ui.btn, 'pa_pos_btn');
    pp = jleer('pa_pos_panel', null); pb = jleer('pa_pos_btn', null);
    if (pp && typeof pp.x === 'number') { posicionar(ui.panel, pp); ui.panel._manual = true; }
    if (pb && typeof pb.x === 'number') { posicionar(ui.btn, pb); limitar(ui.btn); }
    window.addEventListener('resize', function () { limitar(ui.btn); limitar(ui.panel); });
    ui.panel.classList.toggle('pa-osc', tema === 'oscuro');
    ui.panel.classList.toggle('pa-min', leer('pa_min') === '1');
    ui.min.textContent = ui.panel.classList.contains('pa-min') ? '▢' : '—';
  }
  var saludado = false;
  function abrir(si) {
    if (!ui.panel) return;
    if (si && !ui.panel.classList.contains('pa-abierto')) anclarPanel();
    ui.panel.classList.toggle('pa-abierto', si);
    if (si) limitar(ui.panel);
    if (si && !saludado) {
      saludado = true;
      decir(L(cfg.saludo) || tr('saludo', { n: L(asistentes[actual].nombre), m: L(cfg.modelo) || 'este modelo' }));
    }
    if (si) ui.inp.focus();
  }

  /* ---------- 10b. MENÚ DE CONFIGURACIÓN: HABILIDADES, BITÁCORA, SEGURIDAD, PREGUNTAS ---------- */
  function tx(tag, cls, texto) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto !== undefined && texto !== null) e.textContent = texto;
    return e;
  }
  function btn(texto, cls, fn, titulo) {
    var b = tx('button', 'pa-bt' + (cls ? ' ' + cls : ''), texto);
    b.type = 'button'; if (titulo) { b.title = titulo; b.setAttribute('aria-label', titulo); } b.onclick = fn;
    return b;
  }
  function campo(lbl, ctl, ayuda) {
    var l = tx('label', 'pa-f');
    l.appendChild(tx('span', '', lbl)); l.appendChild(ctl);
    if (ayuda) l.appendChild(tx('small', '', ayuda));
    return l;
  }
  function descargar(nombre, tipo, contenido) {
    var b = new Blob([contenido], { type: tipo }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = nombre; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  // Excel real (.xlsx) si la página cargó SheetJS; si no, un .xls que Excel abre sin problema.
  function exportarExcel(nombre, cols, filas) {
    var ws, wb, html;
    if (window.XLSX) {
      ws = window.XLSX.utils.aoa_to_sheet([cols].concat(filas)); wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, ws, nombre.slice(0, 31)); window.XLSX.writeFile(wb, nombre + '.xlsx');
      return 'xlsx';
    }
    html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table border="1"><tr>' +
      cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
      filas.map(function (f) { return '<tr>' + f.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></body></html>';
    descargar(nombre + '.xls', 'application/vnd.ms-excel;charset=utf-8', '\uFEFF' + html);
    return 'xls';
  }
  function imprimirTabla(titulo, cols, filas) {
    var f = document.createElement('iframe'), d, html;
    html = '<html><head><meta charset="utf-8"><title>' + esc(titulo) + '</title><style>body{font:12px Arial,sans-serif;margin:24px;color:#111}h1{font-size:18px;margin:0 0 4px}p{margin:0 0 12px;color:#444}' +
      'table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top;font-size:11px}th{background:#e8e8e8}' +
      '.fir{display:flex;gap:32px;margin-top:64px}.fir div{flex:1;text-align:center;border-top:1px solid #000;padding-top:4px;font-size:11px}</style></head><body><h1>' + esc(titulo) + '</h1><p>' +
      esc(X('Generado: ', 'Generated: ') + fechaHora(iso()) + (SEG.usuario ? ' · ' + SEG.usuario : '')) + '</p><table><tr>' +
      cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
      filas.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</table><div class="fir"><div>' + X('Elaboró', 'Prepared by') + '</div><div>' + X('Revisó', 'Reviewed by') + '</div><div>' + X('Autorizó', 'Approved by') + '</div></div></body></html>';
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    document.body.appendChild(f);
    d = f.contentWindow.document; d.open(); d.write(html); d.close();
    setTimeout(function () {
      try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {}
      setTimeout(function () { f.remove(); }, 1500);
    }, 300);
  }

  function abrirConfig(tab) {
    if (!ui.panel) return;
    ui.cfgVista = tab || ui.cfgVista || 'hab';
    minimizar(false); abrir(true);
    ui.panel.classList.add('pa-cfgon');
    pintarCfg(); limitar(ui.panel);
  }
  function cerrarConfig() {
    if (!ui.panel) return;
    ui.panel.classList.remove('pa-cfgon'); ui.edit = null; limitar(ui.panel);
    if (ui.inp) ui.inp.focus();
  }
  function avisoCfg(t) {
    var m = tx('div', 'pa-aviso', t);
    m.setAttribute('role', 'status');
    ui.cfgBody.insertBefore(m, ui.cfgBody.firstChild); ui.cfgBody.scrollTop = 0;
    setTimeout(function () { m.remove(); }, 4500);
    return false;
  }
  function pintarCfg() {
    var tabs = [['hab', X('Habilidades', 'Skills')], ['bit', X('Bitácora', 'Log')], ['seg', X('Seguridad', 'Security')], ['preg', X('Preguntas', 'Questions')]];
    if (!ui.cfg || !ui.panel.classList.contains('pa-cfgon')) return;
    ui.cfgTabs.innerHTML = '';
    tabs.forEach(function (t) {
      var b = tx('button', 'pa-tab' + (ui.cfgVista === t[0] ? ' pa-on' : ''), t[1]);
      b.type = 'button'; b.setAttribute('data-tab', t[0]);
      b.onclick = function () { ui.cfgVista = t[0]; ui.edit = null; pintarCfg(); };
      ui.cfgTabs.appendChild(b);
    });
    ui.cfgTabs.appendChild(btn('← ' + X('Chat', 'Chat'), 'pa-sp-r', cerrarConfig));
    ui.cfgBody.innerHTML = '';
    ui.panel.classList.toggle('pa-ancho', ui.cfgVista === 'bit'); limitar(ui.panel);
    if (ui.cfgVista === 'bit') vistaBit();
    else if (ui.cfgVista === 'seg') vistaSeg();
    else if (ui.cfgVista === 'preg') vistaPreg();
    else vistaHab();
  }

  /* --- Habilidades --- */
  function nuevaHab() {
    ui.edit = { nuevo: true, h: { id: nuevoId(), nombre: '', frases: [], pasos: [], confirmar: true, maxDia: 0, activa: true } };
    ui.cfgVista = 'hab'; pintarCfg();
  }
  function editar(h) { ui.edit = { nuevo: false, h: JSON.parse(JSON.stringify(h)) }; pintarCfg(); }
  function correrDesdeCfg(h, ensayo) {
    cerrarConfig();
    ejecutarHabilidad(h, { ensayo: ensayo }).then(function (r) { decir(r); });
  }
  function cargarEjemplos() {
    var n = 0;
    ejemplos().forEach(function (e) {
      if (HAB.some(function (h) { return h.nombre === e.nombre; })) return;
      e.id = nuevoId(); e.activa = true; HAB.push(e); n++;
    });
    guardarHab(); pintarCfg();
    avisoCfg(n ? X('Se cargaron ' + n + ' habilidades de ejemplo. Pruébalas con 🧪 Ensayo.', n + ' example skills loaded. Try them with 🧪 Dry run.') : X('Los ejemplos ya estaban cargados.', 'The examples were already loaded.'));
  }
  function exportarHab() { descargar('habilidades_alberto.json', 'application/json', JSON.stringify(HAB, null, 2)); }
  function importarHab() {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = function () {
      var f = inp.files && inp.files[0], rd;
      if (!f) return;
      rd = new FileReader();
      rd.onload = function () {
        var arr, n = 0;
        try { arr = JSON.parse(rd.result); } catch (e) { avisoCfg(X('El archivo no es un JSON válido.', 'The file is not valid JSON.')); return; }
        if (!Array.isArray(arr)) { avisoCfg(X('El archivo no contiene una lista de habilidades.', 'The file does not contain a list of skills.')); return; }
        arr.forEach(function (h) {
          if (!h || !h.nombre || !Array.isArray(h.pasos) || !Array.isArray(h.frases)) return;
          h.pasos = h.pasos.filter(function (s) { return s && ACC[s.a]; });
          if (!h.pasos.length) return;
          if (HAB.some(function (x) { return x.nombre === h.nombre; })) h.nombre += X(' (importada)', ' (imported)');
          h.id = nuevoId(); h.confirmar = true; h.activa = true; n++; HAB.push(h);
        });
        guardarHab(); pintarCfg();
        avisoCfg(X('Importadas: ' + n + '. Las habilidades importadas siempre piden confirmación hasta que las revises.', 'Imported: ' + n + '. Imported skills always ask for confirmation until you review them.'));
      };
      rd.readAsText(f);
    };
    inp.click();
  }
  function tarjetaHab(h) {
    var c = tx('div', 'pa-card' + (h.activa === false ? ' pa-off' : '')), t = tx('div', 'pa-ct'), ac = tx('div', 'pa-bar'), chk, ext = 0, esc_ = 0;
    h.pasos.forEach(function (s) { var a = ACC[s.a]; if (a && a.ext) ext++; if (a && a.esc) esc_++; });
    t.appendChild(tx('b', '', h.nombre));
    chk = document.createElement('input'); chk.type = 'checkbox'; chk.checked = h.activa !== false;
    chk.title = X('Activa', 'Active'); chk.setAttribute('aria-label', X('Activa', 'Active'));
    chk.onchange = function () { h.activa = chk.checked; guardarHab(); pintarCfg(); };
    t.appendChild(chk); c.appendChild(t);
    c.appendChild(tx('small', '', '“' + (h.frases || []).join('” · “') + '”'));
    c.appendChild(tx('small', '', h.pasos.length + (h.pasos.length === 1 ? X(' paso', ' step') : X(' pasos', ' steps')) + (h.confirmar ? ' · ✔ ' + X('pide confirmación', 'asks confirmation') : '') +
      (ext ? ' · 🌐 ' + ext : '') + (esc_ ? ' · 🖥 ' + esc_ : '') + (h.maxDia ? ' · ' + X('máx. ', 'max ') + h.maxDia + X('/día', '/day') : '')));
    ac.appendChild(btn('▶ ' + X('Ejecutar', 'Run'), 'pa-pri', function () { correrDesdeCfg(h, false); }));
    ac.appendChild(btn('🧪 ' + X('Ensayo', 'Dry run'), '', function () { correrDesdeCfg(h, true); }));
    ac.appendChild(btn('✎ ' + X('Editar', 'Edit'), '', function () { editar(h); }));
    ac.appendChild(btn('🗑', 'pa-pel', function () {
      if (window.confirm(X('¿Borrar la habilidad ', 'Delete the skill ') + qq(h.nombre) + '?')) { HAB = HAB.filter(function (x) { return x !== h; }); guardarHab(); pintarCfg(); }
    }, X('Borrar', 'Delete')));
    c.appendChild(ac);
    return c;
  }
  function vistaHab() {
    var b = ui.cfgBody, bar, w, ic;
    if (ui.edit) { editorHab(); return; }
    if (!HAB.length) {
      w = tx('div', 'pa-welcome');
      ic = el('div', 'pa-wi'); ic.innerHTML = asistentes[actual].dibujo(); w.appendChild(ic);
      w.appendChild(tx('h3', 'pa-h3', X('Bienvenido a tus habilidades', 'Welcome to your skills')));
      w.appendChild(tx('p', '', X('Una habilidad es una rutina que tú defines: frases para activarla y una lista de pasos. Cada paso puede avisar, abrir una ruta, leer un archivo, pedir tu confirmación o lanzar un robot.',
        'A skill is a routine you define: trigger phrases and a list of steps. Each step can announce, open a route, read a file, ask for your confirmation or launch a robot.')));
      w.appendChild(tx('p', '', X('Empieza cargando los ejemplos y pruébalos con 🧪 Ensayo: muestra qué haría sin ejecutar nada.',
        'Start by loading the examples and try them with 🧪 Dry run: it shows what they would do without executing anything.')));
      bar = tx('div', 'pa-bar');
      bar.appendChild(btn(X('Cargar habilidades de ejemplo', 'Load example skills'), 'pa-pri', cargarEjemplos));
      bar.appendChild(btn('＋ ' + X('Crear la primera', 'Create the first one'), '', nuevaHab));
      w.appendChild(bar); b.appendChild(w);
    }
    bar = tx('div', 'pa-bar');
    bar.appendChild(btn('＋ ' + X('Nueva', 'New'), 'pa-pri', nuevaHab));
    bar.appendChild(btn(X('Ejemplos', 'Examples'), '', cargarEjemplos));
    bar.appendChild(btn(X('CSV de ejemplo', 'Sample CSV'), '', function () { descargar(X('propuesta_pago_ejemplo.csv', 'sample_payments.csv'), 'text/csv;charset=utf-8', '\uFEFF' + csvEjemplo()); }));
    bar.appendChild(btn('⬇ JSON', '', exportarHab, X('Exportar habilidades', 'Export skills')));
    bar.appendChild(btn('⬆ JSON', '', importarHab, X('Importar habilidades', 'Import skills')));
    b.appendChild(bar);
    HAB.forEach(function (h) { b.appendChild(tarjetaHab(h)); });
  }
  function campoParam(s, c) {
    var inp, v = (s.p[c.k] === undefined ? '' : s.p[c.k]);
    if (c.sel) {
      inp = document.createElement('select');
      c.sel.forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = lang === 'en' ? o[2] : o[1]; inp.appendChild(op); });
      if (!v) { v = c.sel[0][0]; s.p[c.k] = v; }
      inp.value = v; inp.onchange = function () { s.p[c.k] = inp.value; };
    } else if (c.area) {
      inp = document.createElement('textarea'); inp.value = v; inp.oninput = function () { s.p[c.k] = inp.value; };
    } else {
      inp = document.createElement('input'); inp.type = c.num ? 'number' : 'text'; inp.value = v; inp.oninput = function () { s.p[c.k] = inp.value; };
    }
    if (c.ph) inp.placeholder = c.ph[lang === 'en' ? 1 : 0];
    return campo(c.n[lang === 'en' ? 1 : 0], inp);
  }
  function pintarPasos(lista) {
    var e = ui.edit.h;
    function mover(i, d) {
      var j = i + d, t;
      if (j < 0 || j >= e.pasos.length) return;
      t = e.pasos[i]; e.pasos[i] = e.pasos[j]; e.pasos[j] = t; pintarPasos(lista);
    }
    lista.innerHTML = '';
    if (!e.pasos.length) lista.appendChild(tx('small', '', X('Aún no hay pasos. Agrega el primero abajo.', 'No steps yet. Add the first one below.')));
    e.pasos.forEach(function (s, i) {
      var a = ACC[s.a], card = tx('div', 'pa-paso' + (a && a.ext ? ' pa-ext' : '') + (a && a.esc ? ' pa-esc' : '')), cab = tx('div', 'pa-ct'), ctr = tx('div', 'pa-bar');
      if (!s.p) s.p = {};
      cab.appendChild(tx('b', '', (i + 1) + '. ' + (a ? nomAcc(a) : s.a) + (a && a.ext ? ' 🌐' : '') + (a && a.esc ? ' 🖥' : '')));
      ctr.appendChild(btn('↑', '', function () { mover(i, -1); }, X('Subir', 'Move up')));
      ctr.appendChild(btn('↓', '', function () { mover(i, 1); }, X('Bajar', 'Move down')));
      ctr.appendChild(btn('✕', 'pa-pel', function () { e.pasos.splice(i, 1); pintarPasos(lista); }, X('Quitar', 'Remove')));
      cab.appendChild(ctr); card.appendChild(cab);
      if (a) a.c.forEach(function (c) { card.appendChild(campoParam(s, c)); });
      if (a && a.ext) card.appendChild(tx('small', '', X('🌐 Sale de la página: siempre se confirma antes de ejecutar.', '🌐 Leaves the page: always confirmed before running.')));
      if (a && a.esc) card.appendChild(tx('small', '', X('🖥 Requiere la app de escritorio (puente). En ensayo se simula.', '🖥 Needs the desktop app (bridge). Simulated in dry run.')));
      lista.appendChild(card);
    });
  }
  function guardarEditor() {
    var e = ui.edit.h, dup = null;
    e.nombre = (e.nombre || '').trim();
    if (!e.nombre) return avisoCfg(X('Ponle un nombre a la habilidad.', 'Give the skill a name.'));
    if (!e.frases || !e.frases.length) return avisoCfg(X('Agrega al menos una frase para activarla.', 'Add at least one trigger phrase.'));
    if (!e.pasos.length) return avisoCfg(X('Agrega al menos un paso.', 'Add at least one step.'));
    if (e.pasos.length > SEG.maxPasos) return avisoCfg(X('Tiene más pasos que el tope permitido (' + SEG.maxPasos + ').', 'It has more steps than the allowed limit (' + SEG.maxPasos + ').'));
    e.maxDia = Math.max(0, parseInt(e.maxDia, 10) || 0);
    HAB.forEach(function (h) {
      if (h.id === e.id) return;
      (h.frases || []).forEach(function (f) { e.frases.forEach(function (g) { if (norm(f) === norm(g)) dup = g; }); });
    });
    if (dup) return avisoCfg(X('La frase ' + qq(dup) + ' ya la usa otra habilidad.', 'The phrase ' + qq(dup) + ' is already used by another skill.'));
    if (ui.edit.nuevo) HAB.push(e); else HAB = HAB.map(function (h) { return h.id === e.id ? e : h; });
    guardarHab();
    return true;
  }
  function editorHab() {
    var b = ui.cfgBody, e = ui.edit.h, nom, fr, chk, l1, md, lista, selAdd, add, bar;
    b.appendChild(tx('h3', 'pa-h3', ui.edit.nuevo ? X('Nueva habilidad', 'New skill') : X('Editar habilidad', 'Edit skill')));
    nom = document.createElement('input'); nom.type = 'text'; nom.value = e.nombre; nom.oninput = function () { e.nombre = nom.value; };
    nom.setAttribute('data-pa', 'nombre');
    b.appendChild(campo(X('Nombre', 'Name'), nom));
    fr = document.createElement('textarea'); fr.value = (e.frases || []).join('\n'); fr.setAttribute('data-pa', 'frases');
    fr.oninput = function () { e.frases = fr.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean); };
    b.appendChild(campo(X('Frases que la activan (una por línea)', 'Trigger phrases (one per line)'), fr,
      X('Ejemplo: «aplica los pagos». Se entiende aunque la digas con otras palabras alrededor.', 'Example: "apply the payments". It is understood even with other words around it.')));
    l1 = tx('label', 'pa-chk'); chk = document.createElement('input'); chk.type = 'checkbox'; chk.checked = e.confirmar !== false;
    chk.onchange = function () { e.confirmar = chk.checked; };
    l1.appendChild(chk); l1.appendChild(tx('span', '', X('Pedir mi confirmación antes de ejecutar (recomendado)', 'Ask for my confirmation before running (recommended)')));
    b.appendChild(l1);
    md = document.createElement('input'); md.type = 'number'; md.min = '0'; md.value = e.maxDia || 0; md.oninput = function () { e.maxDia = md.value; };
    b.appendChild(campo(X('Máximo de ejecuciones por día (0 = sin tope)', 'Maximum runs per day (0 = no limit)'), md));
    b.appendChild(tx('h3', 'pa-h3', X('Pasos', 'Steps')));
    lista = tx('div', 'pa-pasos'); b.appendChild(lista); pintarPasos(lista);
    selAdd = document.createElement('select'); selAdd.setAttribute('data-pa', 'nuevoPaso');
    GRUPOS.forEach(function (g, gi) {
      var og = document.createElement('optgroup');
      og.label = g[lang === 'en' ? 1 : 0];
      Object.keys(ACC).forEach(function (k) {
        var op;
        if (ACC[k].g === gi) { op = document.createElement('option'); op.value = k; op.textContent = nomAcc(ACC[k]); og.appendChild(op); }
      });
      selAdd.appendChild(og);
    });
    add = btn('＋ ' + X('Agregar paso', 'Add step'), '', function () { e.pasos.push({ a: selAdd.value, p: {} }); pintarPasos(lista); });
    bar = tx('div', 'pa-bar'); bar.appendChild(selAdd); bar.appendChild(add); b.appendChild(bar);
    bar = tx('div', 'pa-bar pa-fin');
    bar.appendChild(btn('💾 ' + X('Guardar', 'Save'), 'pa-pri', function () { if (guardarEditor()) { ui.edit = null; pintarCfg(); } }));
    bar.appendChild(btn('🧪 ' + X('Guardar y probar en ensayo', 'Save and dry run'), '', function () {
      var h; if (guardarEditor()) { h = HAB.filter(function (x) { return x.id === e.id; })[0]; ui.edit = null; correrDesdeCfg(h, true); }
    }));
    bar.appendChild(btn(X('Cancelar', 'Cancel'), '', function () { ui.edit = null; pintarCfg(); }));
    b.appendChild(bar);
  }

  /* --- Bitácora --- */
  function colsBit() { return [X('Fecha y hora', 'Date and time'), X('Usuario', 'User'), X('Habilidad', 'Skill'), X('Modo', 'Mode'), X('Resultado', 'Result'), X('Paso', 'Step'), X('Detalle', 'Detail')]; }
  function filasBit() {
    var f = norm(ui.filtroBit || '');
    return BIT.slice().reverse().filter(function (b) { return !f || norm([b.h, b.m, b.r, b.p, b.d, b.u].join(' ')).indexOf(f) > -1; })
      .map(function (b) { return [fechaHora(b.t), b.u, b.h, b.m, b.r, b.p, b.d]; });
  }
  function pintarTablaBit(cont) {
    var rows = filasBit(), t = tx('table'), th = tx('tr'), mostrar = rows.slice(0, 300);
    cont.innerHTML = '';
    colsBit().forEach(function (c) { th.appendChild(tx('th', '', c)); });
    t.appendChild(th);
    mostrar.forEach(function (r) {
      var tr_ = tx('tr');
      r.forEach(function (c, i) { var td = tx('td', i === 4 ? 'pa-r-' + c : '', c); tr_.appendChild(td); });
      t.appendChild(tr_);
    });
    cont.appendChild(t);
    if (rows.length > mostrar.length) cont.appendChild(tx('small', '', X('Mostrando 300 de ' + rows.length + ' registros; la exportación incluye todos.', 'Showing 300 of ' + rows.length + ' records; the export includes all of them.')));
    if (!rows.length) cont.appendChild(tx('small', '', X('Sin registros todavía.', 'No records yet.')));
  }
  function vistaBit() {
    var b = ui.cfgBody, fl, bar, cont;
    fl = document.createElement('input'); fl.type = 'text'; fl.value = ui.filtroBit || ''; fl.placeholder = X('Filtrar por habilidad, resultado, texto…', 'Filter by skill, result, text…');
    cont = tx('div', 'pa-tabla');
    fl.oninput = function () { ui.filtroBit = fl.value; pintarTablaBit(cont); };
    bar = tx('div', 'pa-bar');
    bar.appendChild(btn('📊 ' + X('Exportar a Excel', 'Export to Excel'), 'pa-pri', function () { exportarExcel('bitacora_alberto', colsBit(), filasBit()); }));
    bar.appendChild(btn('🖨 ' + X('Imprimir con firmas', 'Print with signatures'), '', function () { imprimirTabla(X('Bitácora de ejecución — ', 'Execution log — ') + L(asistentes[actual].nombre), colsBit(), filasBit()); }));
    bar.appendChild(btn('🧹 ' + X('Limpiar', 'Clear'), 'pa-pel', function () {
      if (!window.confirm(X('Se borrará la bitácora. Te recomiendo exportarla antes. ¿Continuar?', 'The log will be erased. I recommend exporting it first. Continue?'))) return;
      BIT = []; bitacora(null, 'real', 'nota', X('Bitácora limpiada por ', 'Log cleared by ') + (SEG.usuario || '—'), '');
    }));
    b.appendChild(bar); b.appendChild(fl); b.appendChild(cont); pintarTablaBit(cont);
  }

  /* --- Seguridad --- */
  function vistaSeg() {
    var b = ui.cfgBody, u, l1, e, mp, l2, c2, bar;
    u = document.createElement('input'); u.type = 'text'; u.value = SEG.usuario; u.placeholder = X('Tu nombre', 'Your name');
    u.oninput = function () { SEG.usuario = u.value; guardarSeg(); };
    b.appendChild(campo(X('Tu nombre (queda en la bitácora)', 'Your name (goes in the log)'), u));
    l1 = tx('label', 'pa-chk'); e = document.createElement('input'); e.type = 'checkbox'; e.checked = SEG.ensayo;
    e.onchange = function () { SEG.ensayo = e.checked; guardarSeg(); };
    l1.appendChild(e); l1.appendChild(tx('span', '', X('Modo ensayo global: nada se ejecuta de verdad (útil para demostraciones)', 'Global dry-run mode: nothing is really executed (useful for demos)')));
    b.appendChild(l1);
    mp = document.createElement('input'); mp.type = 'number'; mp.min = '1'; mp.max = '100'; mp.value = SEG.maxPasos;
    mp.oninput = function () { SEG.maxPasos = Math.min(100, Math.max(1, parseInt(mp.value, 10) || 20)); guardarSeg(); };
    b.appendChild(campo(X('Tope de pasos por habilidad', 'Step limit per skill'), mp));
    l2 = tx('label', 'pa-chk'); c2 = document.createElement('input'); c2.type = 'checkbox'; c2.checked = true; c2.disabled = true;
    l2.appendChild(c2); l2.appendChild(tx('span', '', X('Confirmar siempre antes de cualquier acción que salga de esta página (abrir enlaces, WhatsApp…). No se puede desactivar.',
      'Always confirm before any action that leaves this page (opening links, WhatsApp...). It cannot be turned off.')));
    b.appendChild(l2);
    b.appendChild(tx('p', 'pa-nota', X('Puente de escritorio: ', 'Desktop bridge: ') + (puente ? '✔ ' + (puente.nombre || X('conectado', 'connected')) : X('no conectado (se conecta en la app de escritorio, fase 2)', 'not connected (comes with the desktop app, phase 2)'))));
    b.appendChild(tx('small', '', X('Siguiente paso: roles, para que quien configura una habilidad no sea quien la aprueba (segregación de funciones).', 'Next step: roles, so whoever configures a skill is not the one who approves it (segregation of duties).')));
    b.appendChild(tx('h3', 'pa-h3', X('Datos guardados en este navegador', 'Data stored in this browser')));
    bar = tx('div', 'pa-bar');
    bar.appendChild(btn(X('Borrar habilidades', 'Delete skills'), 'pa-pel', function () {
      if (window.confirm(X('¿Borrar todas las habilidades?', 'Delete all skills?'))) { HAB = []; guardarHab(); avisoCfg(X('Habilidades borradas.', 'Skills deleted.')); }
    }));
    bar.appendChild(btn(X('Borrar bitácora', 'Delete log'), 'pa-pel', function () {
      if (window.confirm(X('¿Borrar la bitácora? Te recomiendo exportarla antes.', 'Delete the log? I recommend exporting it first.'))) { BIT = []; guardarBit(); avisoCfg(X('Bitácora borrada.', 'Log deleted.')); }
    }));
    b.appendChild(bar);
  }

  /* --- Preguntas que no entendí --- */
  function vistaPreg() {
    var b = ui.cfgBody, bar;
    b.appendChild(tx('p', 'pa-nota', X('Banco actual: ' + BANCO.length + ' temas de conversación, ' + GLOS.length + ' definiciones de contabilidad y finanzas.',
      'Current bank: ' + BANCO.length + ' conversation topics, ' + GLOS.length + ' accounting and finance definitions.')));
    if (!NOENT.length) {
      b.appendChild(tx('p', '', X('Todavía no hay frases sin entender. Cuando no entienda algo, la anoto aquí (solo en este navegador) para que puedas convertirla en una habilidad.',
        'No unrecognized phrases yet. When I do not understand something I note it here (only in this browser) so you can turn it into a skill.')));
      return;
    }
    bar = tx('div', 'pa-bar');
    bar.appendChild(btn('📊 ' + X('Exportar a Excel', 'Export to Excel'), 'pa-pri', function () {
      exportarExcel('preguntas_sin_respuesta', [X('Frase', 'Phrase'), X('Veces', 'Times'), X('Última vez', 'Last time')], NOENT.map(function (x) { return [x.t, x.n, fechaHora(x.f)]; }));
    }));
    bar.appendChild(btn(X('Vaciar lista', 'Empty list'), 'pa-pel', function () { NOENT = []; jguardar('pa_noent', NOENT); pintarCfg(); }));
    b.appendChild(bar);
    NOENT.slice().reverse().forEach(function (x) {
      var c = tx('div', 'pa-card'), ac = tx('div', 'pa-bar');
      c.appendChild(tx('b', '', '“' + x.t + '”'));
      c.appendChild(tx('small', '', x.n + (x.n === 1 ? X(' vez', ' time') : X(' veces', ' times')) + ' · ' + fechaHora(x.f)));
      ac.appendChild(btn(X('Convertir en habilidad', 'Turn into a skill'), '', function () {
        ui.edit = { nuevo: true, h: { id: nuevoId(), nombre: x.t.slice(0, 40), frases: [x.t], pasos: [], confirmar: true, maxDia: 0, activa: true } };
        NOENT = NOENT.filter(function (y) { return y !== x; }); jguardar('pa_noent', NOENT);
        ui.cfgVista = 'hab'; pintarCfg();
      }));
      ac.appendChild(btn(X('Descartar', 'Dismiss'), 'pa-pel', function () { NOENT = NOENT.filter(function (y) { return y !== x; }); jguardar('pa_noent', NOENT); pintarCfg(); }));
      c.appendChild(ac); b.appendChild(c);
    });
  }

  /* --- Mover, minimizar, tema --- */
  function posicionar(elm, p) { elm.style.left = p.x + 'px'; elm.style.top = p.y + 'px'; elm.style.right = 'auto'; elm.style.bottom = 'auto'; }
  function limitar(elm) {
    var r, x, y;
    if (!elm || elm.style.left === '') return;
    r = elm.getBoundingClientRect();
    if (!r.width) return;
    x = Math.min(Math.max(0, r.left), Math.max(0, window.innerWidth - r.width));
    y = Math.min(Math.max(0, r.top), Math.max(0, window.innerHeight - r.height));
    elm.style.left = x + 'px'; elm.style.top = y + 'px';
  }
  function arrastrable(asa, objetivo, clave) {
    var ox = 0, oy = 0, activo = false, movio = false;
    asa.style.touchAction = 'none';
    asa.addEventListener('pointerdown', function (e) {
      var r;
      if (e.button !== undefined && e.button !== 0) return;
      if (asa !== objetivo && e.target.closest && e.target.closest('button,input,select,textarea,a')) return;
      r = objetivo.getBoundingClientRect();
      ox = e.clientX - r.left; oy = e.clientY - r.top; activo = true; movio = false;
      try { asa.setPointerCapture(e.pointerId); } catch (err) {}
    });
    asa.addEventListener('pointermove', function (e) {
      var r, x, y;
      if (!activo) return;
      r = objetivo.getBoundingClientRect(); x = e.clientX - ox; y = e.clientY - oy;
      if (!movio && Math.abs(x - r.left) < 4 && Math.abs(y - r.top) < 4) return;
      movio = true;
      x = Math.min(Math.max(0, x), Math.max(0, window.innerWidth - r.width));
      y = Math.min(Math.max(0, y), Math.max(0, window.innerHeight - r.height));
      posicionar(objetivo, { x: x, y: y });
    });
    function fin(e) {
      var r;
      if (!activo) return;
      activo = false;
      try { asa.releasePointerCapture(e.pointerId); } catch (err) {}
      if (movio) {
        objetivo._arr = true; objetivo._manual = true;
        setTimeout(function () { objetivo._arr = false; }, 120);
        r = objetivo.getBoundingClientRect(); jguardar(clave, { x: Math.round(r.left), y: Math.round(r.top) });
      }
    }
    asa.addEventListener('pointerup', fin); asa.addEventListener('pointercancel', fin);
  }
  function anclarPanel() {
    var r, w = 360, h = 480, x, y;
    if (!ui.btn.style.left || ui.panel._manual) return;
    r = ui.btn.getBoundingClientRect();
    x = Math.min(Math.max(8, r.right - w), Math.max(8, window.innerWidth - w - 8));
    y = r.top - h - 10;
    if (y < 8) y = Math.min(r.bottom + 10, Math.max(8, window.innerHeight - h - 8));
    posicionar(ui.panel, { x: x, y: y });
  }
  function minimizar(si) {
    if (!ui.panel) return;
    ui.panel.classList.toggle('pa-min', !!si); guardar('pa_min', si ? '1' : '0');
    ui.min.textContent = si ? '▢' : '—';
    ui.min.title = si ? X('Restaurar', 'Restore') : X('Minimizar', 'Minimize'); ui.min.setAttribute('aria-label', ui.min.title);
    limitar(ui.panel);
  }
  function setTema(t) {
    tema = (t === 'oscuro') ? 'oscuro' : 'claro'; guardar('pa_tema', tema);
    if (ui.panel) ui.panel.classList.toggle('pa-osc', tema === 'oscuro');
    try { document.dispatchEvent(new CustomEvent('pa-tema', { detail: tema })); } catch (e) {}
    return tema;
  }

  /* ---------- 11. API PÚBLICA ---------- */
  function init(config) {
    cfg = config || {};
    var g = leer('pa_idioma');
    lang = (g === 'en' || g === 'es') ? g : (cfg.idioma || ((typeof navigator !== 'undefined' && /^en/i.test(navigator.language || '')) ? 'en' : 'es'));
    if (lang !== 'en') lang = 'es';
    cargarDatos(); ritmo = parseFloat(leer('pa_ritmo')) || 1;
    var gt = leer('pa_tema');
    tema = (gt === 'oscuro' || gt === 'claro') ? gt : (cfg.tema || ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oscuro' : 'claro'));
    (cfg.asistentesExtra || []).forEach(registrarAsistente);
    var ga = leer('pa_asistente'); if (ga === 'alberto-nova') ga = 'nova'; if (ga && asistentes[ga]) actual = ga;
    hablaOn = leer('pa_voz') !== '0';
    E = { vars: [], acc: [], enl: [] };
    (cfg.variables || []).forEach(function (v) {
      var e = elemento(v); if (e) v._ini = e.value;
      nombresDe(v.nombre).concat(nombresDe(v.alias)).forEach(function (n) { E.vars.push({ txt: norm(n), ref: v }); });
    });
    (cfg.acciones || []).forEach(function (a) { nombresDe(a.frases).forEach(function (f) { E.acc.push({ txt: norm(f), ref: a }); }); });
    (cfg.enlaces || []).forEach(function (x) { nombresDe(x.nombre).forEach(function (n) { E.enl.push({ txt: norm(n), ref: x }); }); });
    var arrancar = function () {
      if (cfg.sinUI) return;
      construir(); aplicarIdioma();
      if (cfg.abierto) abrir(true);
    };
    if (document.body) arrancar(); else document.addEventListener('DOMContentLoaded', arrancar);
  }

  window.ProfesorAlberto = {
    init: init, registrarAsistente: registrarAsistente, abrir: abrir, decir: decir, elegir: elegir,
    procesar: procesar, paquete: paquete, idioma: function (l) { return l ? cambiarIdioma(l) : lang; },
    abrirConfig: abrirConfig, minimizar: minimizar, tema: function (t) { return t ? setTema(t) : tema; },
    habilidades: function () { return JSON.parse(JSON.stringify(HAB)); },
    ejecutar: function (nombre, opt) {
      var k = norm(nombre), h = HAB.filter(function (x) { return norm(x.nombre) === k; })[0];
      return h ? ejecutarHabilidad(h, opt || {}) : Promise.resolve(X('No encuentro esa habilidad.', 'I cannot find that skill.'));
    },
    registrarPuente: function (p) { puente = p; if (ui.cfgVista === 'seg') pintarCfg(); },
    registrarAccion: function (id, def) { ACC[id] = def; }
  };
})();
