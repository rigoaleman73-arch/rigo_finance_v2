// ⚡ Conexión V3 inyectada directamente en el motor del administrador
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EYgWbGKyDFrp1vImvcsCAw_CFJfxOpQ";
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const btnNuevo = document.getElementById('newArticle');
  
  if (btnNuevo) {
    btnNuevo.addEventListener('click', async () => {
      let opcionesHtml = '<option value="">Cargando modelos disponibles...</option>';
      
      try {
        // 1. Solicitamos a Node.js la lista de tus modelos HTML locales
        const respuesta = await fetch('/api/lista-modelos-locales');
        const archivos = await respuesta.json();
        if (archivos.length === 0) {
          opcionesHtml = '<option value="">⚠️ No se encontraron archivos .html en /models</option>';
        } else {
          opcionesHtml = archivos.map(archivo => `<option value="/models/${archivo}">${archivo}</option>`).join('');
        }
      } catch (err) {
        console.error(err);
        opcionesHtml = '<option value="">❌ Error al cargar archivos locales</option>';
      }

      // 2. Creamos la ventana flotante oscura con el formulario V3.1
      const modal = document.createElement('div');
      modal.className = 'card modal-admin';
      modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:100; width:90%; max-width:550px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); background:#16222f; padding:24px; border:1px solid #2b5c8a; border-radius:6px; max-height:90vh; overflow-y:auto;';
      
      modal.innerHTML = `
        <h2 style="font-family:'Source Serif 4', serif; color:#fff; margin-bottom:16px;">🚀 Registrar Nuevo Contenido (V3.1)</h2>
        <form id="formPublicar" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">Título del Modelo</label>
            <input type="text" id="txtTitulo" required placeholder="Ej. Precio de Equilibrio" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px;">
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">Categoría</label>
            <select id="txtCategoria" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px;">
              <option value="Intelligency">Intelligency (Modelos Interactivos)</option>
              <option value="Knowledge">Knowledge (Artículos / Blogs)</option>
            </select>
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">Resumen Corto (Para control interno)</label>
            <input type="text" id="txtResumen" required placeholder="Pequeña descripción..." style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px;">
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">🖼️ Icono del Modelo (Emoji o ruta, Ej: 📈 o 📊)</label>
            <input type="text" id="txtImagen" placeholder="Ej. 📊 o /assets/iconos/calc.png" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px;">
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">🎰 Selecciona el archivo interactivo (VBA Style)</label>
            <select id="txtRuta" required style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px;">
              ${opcionesHtml}
            </select>
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600; display:block; margin-bottom:4px;">📖 Descripción Detallada (Tus 10 líneas de Insights)</label>
            <textarea id="txtContenido" required rows="6" placeholder="Escribe aquí el análisis de razonabilidad, objetivos del modelo, variables críticas, etc..." style="background:#0f1a26; color:#fff; border:1px solid #4a5a68; width:100%; padding:8px; font-family:inherit; resize:vertical;"></textarea>
          </div>
          <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:10px;">
            <button type="button" class="btn secondary" id="btnCancelar" style="background:#4a5a68; color:#fff; border:none; padding:8px 14px;">Cancelar</button>
            <button type="submit" class="btn primary" style="padding:8px 14px;">Guardar en Supabase</button>
          </div>
        </form>
      `;
      
      document.body.appendChild(modal);
      document.getElementById('btnCancelar').addEventListener('click', () => modal.remove());

      // 3. Captura y envío de datos hacia Supabase Cloud
      document.getElementById('formPublicar').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nuevoArticulo = {
          titulo: document.getElementById('txtTitulo').value,
          categoria: document.getElementById('txtCategoria').value,
          resumen: document.getElementById('txtResumen').value,
          contenido: document.getElementById('txtContenido').value, // Tus 10 líneas
          pdf_url: document.getElementById('txtRuta').value,
          imagen_url: document.getElementById('txtImagen').value // Guardamos el Icono
        };

        try {
          const { data, error } = await supabase.from('articulos').insert([nuevoArticulo]);
          if (error) throw error;

          alert('🎉 ¡Modelo registrado y enlazado con éxito en Supabase!');
          modal.remove();
          window.location.reload();
        } catch (err) {
          console.error(err);
          alert('❌ Error al guardar en Supabase: ' + err.message);
        }
      });
    });
  }
});

