// 📊 RIGO FINANCE V3.4 — PARTE A: NÚCLEO ADMINISTRATIVO AVANZADO

// 1. Primero declaras las constantes con tus credenciales
const SUPABASE_URL = "https://tktomsbcxyaotgbbqszt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EYgWbGKyDFrp1vImvcsCAw_CFJfxOpQ";

// 2. Luego creas el cliente UNA SOLA VEZ con la configuración limpia
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// 3. ¡Y listo! Aquí abajo sigue todo tu código de siempre sin cambios
document.addEventListener('DOMContentLoaded', () => {
  const btnModelos = document.getElementById('menu-modelos');
  const zonaPrincipal = document.querySelector('section');

  if (btnModelos && zonaPrincipal) {
    btnModelos.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.menu a').forEach(el => el.classList.remove('active-excel'));
      btnModelos.classList.add('active-excel');
      cargarPanelModelos(zonaPrincipal);
    });
  }

  const btnNuevo = document.getElementById('newArticle');
  if (btnNuevo) {
    btnNuevo.addEventListener('click', () => abrirFormularioNuevo());
  }
});

async function cargarPanelModelos(contenedor) {
  contenedor.innerHTML = '<div class="card"><h3>🔍 Leyendo registros de Supabase Cloud...</h3></div>';
  try {
    const { data: modelos, error } = await supabase
      .from('articulos')
      .select('*')
      .eq('categoria', 'Intelligency')
      .order('id', { ascending: false });

    if (error) throw error;

    let html = '<div class="card" style="background:#fff; padding:20px; border-radius:4px; border:1px solid #d8d3c4;">';
    html += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:10px; flex-wrap:wrap;">';
    html += '    <h3 style="margin:0; font-family:\'Source Serif 4\', serif; font-size:18px; color:#1b2a3a;">🎰 Catálogo de Modelos Activos</h3>';
    html += '    <button class="btn primary" style="background:#1b2a3a; color:#fafaf6; border:none; padding:8px 14px; border-radius:3px; cursor:pointer; font-weight:600;" onclick="abrirFormularioNuevo()">+ Agregar Nuevo Modelo</button>';
    html += '  </div>';
    html += '  <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">';
    html += '    <thead><tr style="border-bottom:2px solid #1b2a3a;"><th style="padding:8px;">Icono</th><th style="padding:8px;">Título del Simulador</th><th style="padding:8px;">Archivo Enlazado</th><th style="padding:8px; text-align:center;">Acciones</th></tr></thead>';
    html += '    <tbody>';

    if (modelos.length === 0) {
      html += '<tr><td colspan="4" style="padding:20px; text-align:center; color:#4a5a68;">No hay modelos guardados en la nube todavía.</td></tr>';
    } else {
      modelos.forEach(item => {
        // Validación visual para pintar el icono si es ruta de imagen o emoji
        let dibujoIcono = '📊';
        if (item.imagen_url) {
          dibujoIcono = item.imagen_url.includes('/') ? '<img src="' + item.imagen_url + '" style="width:24px; height:24px; object-fit:contain;">' : item.imagen_url;
        }

        html += '<tr style="border-bottom:1px solid #d8d3c4;">';
        html += '  <td style="padding:10px; font-size:22px; vertical-align:middle;">' + dibujoIcono + '</td>';
        html += '  <td style="padding:10px; font-weight:600; color:#1b2a3a; vertical-align:middle;">' + item.titulo + '</td>';
        html += '  <td style="padding:10px; font-family:monospace; color:#4a5a68; vertical-align:middle;">' + item.pdf_url + '</td>';
        html += '  <td style="padding:10px; text-align:center; white-space:nowrap; vertical-align:middle;">';
        html += '    <button class="btn" style="background:#b5834c; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer; margin-right:6px; font-size:12px;" onclick="abrirEditorModelo(' + item.id + ')">📝 Editar</button>';
        html += '    <button class="btn" style="background:#a13d2e; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer; font-size:12px;" onclick="eliminarModelo(' + item.id + ')">🗑️ Borrar</button>';
        html += '  </td>';
        html += '</tr>';
      });
    }
    html += '    </tbody></table></div>';
    contenedor.innerHTML = html;
  } catch (err) {
    contenedor.innerHTML = '<div class="card"><p style="color:#a13d2e;">❌ Error: ' + err.message + '</p></div>';
  }
}
// 📊 RIGO FINANCE V3.3 — PIEZA 2 (PARTE B): CARGA AUTOMÁTICA AL STORAGE
function abrirFormularioNuevo() {
  const modal = document.createElement('div');
  modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:250; width:90%; max-width:520px; background:#16222f; padding:24px; border:1px solid #2b5c8a; border-radius:6px; box-shadow:0 20px 50px rgba(0,0,0,0.6); color:#fff; max-height:90vh; overflow-y:auto;';
  
  let fHtml = '<h2 style="margin:0 0 16px; font-family:\'Source Serif 4\', serif;">🚀 Registrar Nuevo Modelo Avanzado</h2>';
  fHtml += '<form id="formNuevoObjeto" style="display:flex; flex-direction:column; gap:12px;">';
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">Título del Modelo</label><input type="text" id="insTitulo" required style="width:100%; padding:8px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
  
  // 1. SELECTOR NATIVO PARA EL ICONO (Reemplaza la casilla manual)
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">🎨 Seleccionar Imagen de Icono (PNG/JPG)</label>';
  fHtml += '       <input type="file" id="insIconoFile" accept="image/*" required style="display:block; margin-top:4px; color:#fff; font-size:13px;">';
  fHtml += '  </div>';
  
  // 2. SELECTOR NATIVO PARA EL ARCHIVO SIMULADOR HTML
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">📁 Seleccionar Archivo Interactivo (HTML)</label>';
  fHtml += '       <input type="file" id="insArchivoFile" accept=".html" required style="display:block; margin-top:4px; color:#fff; font-size:13px;">';
  fHtml += '  </div>';

  // 3. NUEVO CAMPO: SELECTOR NATIVO PARA EL MAPA CONCEPTUAL
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">🧠 Seleccionar Mapa Conceptual / Imagen de Análisis</label>';
  fHtml += '       <input type="file" id="insMapaFile" accept="image/*" required style="display:block; margin-top:4px; color:#fff; font-size:13px;">';
  fHtml += '  </div>';
  
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">📖 Análisis Técnico (10 líneas)</label><textarea id="insContenido" required rows="4" style="width:100%; padding:8px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px; font-family:inherit;"></textarea></div>';
  fHtml += '  <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:10px;">';
  fHtml += '    <button type="button" id="btnCancelIns" class="btn" style="background:#4a5a68; color:#fff; border:none; padding:8px 14px; border-radius:3px; cursor:pointer;">Cancelar</button>';
  fHtml += '    <button type="submit" id="btnGuardarMaestro" class="btn" style="background:#b5834c; color:#fff; border:none; padding:8px 14px; border-radius:3px; cursor:pointer; font-weight:600;">Guardar en Supabase</button>';
  fHtml += '  </div></form>';
  
  modal.innerHTML = fHtml;
  document.body.appendChild(modal);

  document.getElementById('btnCancelIns').addEventListener('click', () => modal.remove());
  document.getElementById('formNuevoObjeto').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btnGuardar = document.getElementById('btnGuardarMaestro');
    btnGuardar.innerText = '⏳ Subiendo archivos al Storage...';
    btnGuardar.disabled = true;

    const fileIcono = document.getElementById('insIconoFile').files[0];
    const fileHtml = document.getElementById('insArchivoFile').files[0];
    const fileMapa = document.getElementById('insMapaFile').files[0];

    try {
      // Función interna automatizada para subir archivos de Windows directo a tu Storage público
      async function subirAlStorage(archivo, prefijo) {
        const nombreUnico = prefijo + '_' + Date.now() + '_' + archivo.name;
        const { data, error } = await supabase.storage.from('documentos').upload(nombreUnico, archivo);
        if (error) throw error;
        // Obtenemos la URL pública real para el navegador
        const { data: publicData } = supabase.storage.from('documentos').getPublicUrl(nombreUnico);
        return publicData.publicUrl;
      }

      // Subimos los tres archivos de golpe a la nube de Supabase
      const urlIconoCloud = await subirAlStorage(fileIcono, 'icono');
      const urlMapaCloud = await subirAlStorage(fileMapa, 'mapa');

      const paquete = {
        titulo: document.getElementById('insTitulo').value,
        categoria: 'Intelligency',
        resumen: document.getElementById('insTitulo').value,
        contenido: document.getElementById('insContenido').value,
        pdf_url: '/models/' + fileHtml.name, // Mantiene la ruta local de tu Render para ejecutar el HTML
        imagen_url: urlIconoCloud, // URL del icono en la nube
        mapa_url: urlMapaCloud // URL del mapa conceptual en la nube
      };

      const { error: errInsert } = await supabase.from('articulos').insert([paquete]);
      if (errInsert) throw errInsert;

      alert('🎉 ¡Modelo registrado, archivos subidos al Storage y enlazados con éxito!');
      modal.remove();
      window.location.reload();
    } catch (err) {
      alert('Error crítico de carga: ' + err.message);
      btnGuardar.innerText = 'Guardar en Supabase';
      btnGuardar.disabled = false;
    }
  });
}

async function abrirEditorModelo(id) {
  // Se mantiene idéntico para control de texto rápido
  try {
    const { data: item, error } = await supabase.from('articulos').select('*').eq('id', id).single();
    if (error) throw error;

    const modal = document.createElement('div');
    modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:250; width:90%; max-width:450px; background:#16222f; padding:24px; border:1px solid #b5834c; border-radius:6px; box-shadow:0 20px 40px rgba(0,0,0,0.5); color:#fff;';
    
    let eHtml = '<h3>📝 Editar Texto de Insights</h3>';
    eHtml += '<div style="margin-top:12px;"><label>Título</label><input type="text" id="editTitulo" value="' + item.titulo + '" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
    eHtml += '<div style="margin-top:12px;"><label>Descripción</label><textarea id="editContenido" rows="5" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px; font-family:inherit;">' + (item.contenido || '') + '</textarea></div>';
    eHtml += '<div style="display:flex; gap:10px; justify-content:flex-end; margin-top:16px;">';
    eHtml += '  <button id="btnCancelEdit" class="btn" style="background:#4a5a68; color:#fff; border:none; padding:6px 12px; border-radius:3px; cursor:pointer;">Cancelar</button>';
    eHtml += '  <button id="btnSaveEdit" class="btn" style="background:#b5834c; color:#fff; border:none; padding:6px 12px; border-radius:3px; cursor:pointer; font-weight:600;">Actualizar Cambios</button>';
    eHtml += '</div>';

    modal.innerHTML = eHtml;
    document.body.appendChild(modal);

    document.getElementById('btnCancelEdit').addEventListener('click', () => modal.remove());
    document.getElementById('btnSaveEdit').addEventListener('click', async () => {
      const datosNuevos = {
        titulo: document.getElementById('editTitulo').value,
        contenido: document.getElementById('editContenido').value,
        resumen: document.getElementById('editTitulo').value
      };
      const { error: errUpdate } = await supabase.from('articulos').update(datosNuevos).eq('id', id);
      if (errUpdate) alert('Error: ' + errUpdate.message);
      else {
        alert('🎉 Registro actualizado.');
        modal.remove();
        window.location.reload();
      }
    });
  } catch (err) {
    alert(err.message);
  }
}

async function eliminarModelo(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este modelo de la nube?')) {
    try {
      const { error } = await supabase.from('articulos').delete().eq('id', id);
      if (error) throw error;
      alert('🗑️ Registro borrado.');
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
}
