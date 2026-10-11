// 📊 RIGO FINANCE V3.2 — SISTEMA ADMINISTRATIVO MAESTRO (NIVEL EXCEL/VBA)
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EYgWbGKyDFrp1vImvcsCAw_CFJfxOpQ";
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Buscamos el menú de la izquierda de tu imagen (Modelos es la segunda opción)
  const menuOpciones = document.querySelectorAll('.menu a');
  const zonaPrincipal = document.querySelector('section'); // El centro de la pantalla

  if (menuOpciones.length > 0 && zonaPrincipal) {
    // Le asignamos el evento al botón de 'Modelos' (índice 1 en la lista)
    menuOpciones[1].addEventListener('click', (e) => {
      e.preventDefault();
      cargarPanelModelos(zonaPrincipal);
    });
  }
});

// 🔄 FUNCIÓN MAESTRA: Carga la lista completa de Supabase con botones de acción
async function cargarPanelModelos(contenedor) {
  contenedor.innerHTML = '<div class="card"><h3>Cargando modelos desde Supabase Cloud...</h3></div>';

  try {
    const { data: modelos, error } = await supabase
      .from('articulos')
      .select('*')
      .eq('categoria', 'Intelligency')
      .order('id', { ascending: false });

    if (error) throw error;

    // Actualizamos el contador de la tarjeta superior de tu pantalla
    const contadorModelos = document.querySelectorAll('.stats strong')[1];
    if (contadorModelos) contadorModelos.innerText = modelos.length;

    // Construimos la tabla dinámica con controles de Edición y Eliminación
    let tablaHtml = '<div class="card"><h3>🎰 Catálogo de Modelos Activos (Supabase)</h3>';
    tablaHtml += '<table style="width:100%; border-collapse:collapse; margin-top:14px;">';
    tablaHtml += '<tr><th style="text-align:left; border-bottom:2px solid #1b2a3a; padding:8px;">Icono</th><th style="text-align:left; border-bottom:2px solid #1b2a3a; padding:8px;">Título</th><th style="text-align:left; border-bottom:2px solid #1b2a3a; padding:8px;">Ruta HTML</th><th style="text-align:center; border-bottom:2px solid #1b2a3a; padding:8px;">Acciones</th></tr>';

    modelos.forEach(item => {
      tablaHtml += '<tr>';
      tablaHtml += '  <td style="padding:10px; border-bottom:1px solid #d8d3c4; font-size:24px;">' + (item.imagen_url || '📊') + '</td>';
      tablaHtml += '  <td style="padding:10px; border-bottom:1px solid #d8d3c4; font-weight:600;">' + item.titulo + '</td>';
      tablaHtml += '  <td style="padding:10px; border-bottom:1px solid #d8d3c4; color:#4a5a68; font-family:monospace;">' + item.pdf_url + '</td>';
      tablaHtml += '  <td style="padding:10px; border-bottom:1px solid #d8d3c4; text-align:center;">';
      tablaHtml += '    <button class="btn" style="background:#b5834c; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer; margin-right:6px;" onclick="abrirEditorModelo(' + item.id + ')">📝 Editar</button>';
      tablaHtml += '    <button class="btn" style="background:#a13d2e; color:#fff; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;" onclick="eliminarModelo(' + item.id + ')">🗑️ Borrar</button>';
      tablaHtml += '  </td>';
      tablaHtml += '</tr>';
    });

    tablaHtml += '</table></div>';
    contenedor.innerHTML = tablaHtml;

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<div class="card"><p style="color:#a13d2e;">❌ Error al leer los datos de la nube.</p></div>';
  }
}

// 🗑️ ACCIÓN: Eliminar registro de la nube de forma directa
async function eliminarModelo(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este modelo financiero de la nube?')) {
    try {
      const { error } = await supabase.from('articulos').delete().eq('id', id);
      if (error) throw error;
      alert('🗑️ Registro borrado exitosamente.');
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
}

// 📝 ACCIÓN: Ventana de edición para modificar datos existentes
async function abrirEditorModelo(id) {
  try {
    const { data: item, error } = await supabase.from('articulos').select('*').eq('id', id).single();
    if (error) throw error;

    const modal = document.createElement('div');
    modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:200; width:90%; max-width:450px; background:#16222f; padding:24px; border:1px solid #b5834c; border-radius:6px; box-shadow:0 20px 40px rgba(0,0,0,0.5); color:#fff;';
    
    modal.innerHTML = `
      <h3>📝 Editar Modelo Financiero</h3>
      <div style="margin-top:12px;"><label>Título</label><input type="text" id="editTitulo" value="${item.titulo}" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68;"></div>
      <div style="margin-top:12px;"><label>Icono (Emoji)</label><input type="text" id="editIcono" value="${item.imagen_url || '📊'}" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68;"></div>
      <div style="margin-top:12px;"><label>Descripción (Insights)</label><textarea id="editContenido" rows="4" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; font-family:inherit;">${item.contenido || ''}</textarea></div>
      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:16px;">
        <button id="btnCancelEdit" class="btn secondary" style="background:#4a5a68; color:#fff; border:none; padding:6px 12px;">Cancelar</button>
        <button id="btnSaveEdit" class="btn primary" style="padding:6px 12px;">Actualizar Cambios</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('btnCancelEdit').addEventListener('click', () => modal.remove());
    document.getElementById('btnSaveEdit').addEventListener('click', async () => {
      const actualizaciones = {
        titulo: document.getElementById('editTitulo').value,
        imagen_url: document.getElementById('editIcono').value,
        contenido: document.getElementById('editContenido').value,
        resumen: document.getElementById('editTitulo').value
      };

      const { error: errUpdate } = await supabase.from('articulos').update(actualizaciones).eq('id', id);
      if (errUpdate) alert('Error: ' + errUpdate.message);
      else {
        alert('🎉 Cambios guardados en la nube.');
        modal.remove();
        window.location.reload();
      }
    });
  } catch (err) {
    alert(err.message);
  }
}

