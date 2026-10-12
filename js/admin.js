// 📊 RIGO FINANCE V3.2 — PIEZA 2 (PARTE A): CONEXIÓN Y CUADRÍCULA CONTABLE
const SUPABASE_URL = "https://tktomsbcxyaotgbbqszt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EYgWbGKyDFrp1vImvcsCAw_CFJfxOpQ";
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const btnModelos = document.getElementById('menu-modelos');
  const zonaPrincipal = document.querySelector('section');

  if (btnModelos && zonaPrincipal) {
    btnModelos.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Efecto visual tipo Excel: Marcamos la hoja seleccionada
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

// 🔄 FUNCIÓN: Carga la lista de la nube en la cuadrícula contable
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
        html += '<tr style="border-bottom:1px solid #d8d3c4;">';
        html += '  <td style="padding:10px; font-size:22px;">' + (item.imagen_url || '📊') + '</td>';
        html += '  <td style="padding:10px; font-weight:600; color:#1b2a3a;">' + item.titulo + '</td>';
        html += '  <td style="padding:10px; font-family:monospace; color:#4a5a68;">' + item.pdf_url + '</td>';
        html += '  <td style="padding:10px; text-align:center; white-space:nowrap;">';
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
// 📊 RIGO FINANCE V3.2 — PIEZA 2 (PARTE B): EXPLORADOR NATIVO Y ACCIONES
function abrirFormularioNuevo() {
  const modal = document.createElement('div');
  modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:250; width:90%; max-width:500px; background:#16222f; padding:24px; border:1px solid #2b5c8a; border-radius:6px; box-shadow:0 20px 50px rgba(0,0,0,0.6); color:#fff;';
  
  let fHtml = '<h2 style="margin:0 0 16px; font-family:\'Source Serif 4\', serif;">🚀 Registrar Nuevo Modelo</h2>';
  fHtml += '<form id="formNuevoObjeto" style="display:flex; flex-direction:column; gap:12px;">';
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">Título del Modelo</label><input type="text" id="insTitulo" required style="width:100%; padding:8px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">Icono (Emoji)</label><input type="text" id="insIcono" placeholder="📊" style="width:100%; padding:8px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
  
  // Activa el explorador de archivos nativo de Windows (Application.GetOpenFilename Style)
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">📁 Seleccionar Archivo Interactivo (HTML)</label>';
  fHtml += '       <input type="file" id="insArchivoFile" accept=".html" required style="display:block; margin-top:6px; color:#fff; font-size:13px;">';
  fHtml += '  </div>';
  
  fHtml += '  <div><label style="color:#b5834c; font-weight:600;">📖 Análisis (10 líneas)</label><textarea id="insContenido" required rows="5" style="width:100%; padding:8px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px; font-family:inherit;"></textarea></div>';
  fHtml += '  <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:10px;">';
  fHtml += '    <button type="button" id="btnCancelIns" class="btn" style="background:#4a5a68; color:#fff; border:none; padding:8px 14px; border-radius:3px; cursor:pointer;">Cancelar</button>';
  fHtml += '    <button type="submit" class="btn" style="background:#b5834c; color:#fff; border:none; padding:8px 14px; border-radius:3px; cursor:pointer; font-weight:600;">Guardar en Supabase</button>';
  fHtml += '  </div></form>';
  
  modal.innerHTML = fHtml;
  document.body.appendChild(modal);

  document.getElementById('btnCancelIns').addEventListener('click', () => modal.remove());
  document.getElementById('formNuevoObjeto').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('insArchivoFile');
    let nombreArchivo = 'modelo_alternativo.html';
    if (fileInput.files && fileInput.files.length > 0) {
      nombreArchivo = fileInput.files[0].name;
    }

    const paquete = {
      titulo: document.getElementById('insTitulo').value,
      categoria: 'Intelligency',
      resumen: document.getElementById('insTitulo').value,
      contenido: document.getElementById('insContenido').value,
      pdf_url: '/models/' + nombreArchivo,
      imagen_url: document.getElementById('insIcono').value || '📊'
    };

    try {
      const { error } = await supabase.from('articulos').insert([paquete]);
      if (error) throw error;
      alert('🎉 ¡Modelo guardado con éxito en la nube!');
      modal.remove();
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}

async function abrirEditorModelo(id) {
  try {
    const { data: item, error } = await supabase.from('articulos').select('*').eq('id', id).single();
    if (error) throw error;

    const modal = document.createElement('div');
    modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:250; width:90%; max-width:450px; background:#16222f; padding:24px; border:1px solid #b5834c; border-radius:6px; box-shadow:0 20px 40px rgba(0,0,0,0.5); color:#fff;';
    
    let eHtml = '<h3>📝 Editar Modelo Financiero</h3>';
    eHtml += '<div style="margin-top:12px;"><label>Título</label><input type="text" id="editTitulo" value="' + item.titulo + '" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
    eHtml += '<div style="margin-top:12px;"><label>Icono</label><input type="text" id="editIcono" value="' + (item.imagen_url || '📊') + '" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px;"></div>';
    eHtml += '<div style="margin-top:12px;"><label>Descripción</label><textarea id="editContenido" rows="4" style="width:100%; padding:6px; background:#0f1a26; color:#fff; border:1px solid #4a5a68; border-radius:3px; font-family:inherit;">' + (item.contenido || '') + '</textarea></div>';
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
        imagen_url: document.getElementById('editIcono').value,
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
      alert('🗑️ Registro borrado correctamente.');
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }
}

