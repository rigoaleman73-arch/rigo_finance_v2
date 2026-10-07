// 📈 RIGO FINANCE V3 — MOTOR DEL ADMINISTRADOR DINÁMICO
document.addEventListener('DOMContentLoaded', () => {
  const btnNuevo = document.getElementById('newArticle');
  
  if (btnNuevo) {
    btnNuevo.addEventListener('click', () => {
      // 1. Inyectamos un formulario real y elegante sobre la pantalla en lugar de la alerta vieja
      const modal = document.createElement('div');
      modal.className = 'card modal-admin';
      modal.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:100; width:90%; max-width:500px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); background:#16222f; padding:24px; border:1px solid #2b5c8a;';
      
      modal.innerHTML = `
        <h2 style="font-family:'Source Serif 4', serif; color:#fff; margin-bottom:16px;">🚀 Registrar Nuevo Contenido (V3)</h2>
        <form id="formPublicar" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="color:#b5834c; font-weight:600;">Título del Modelo / Artículo</label>
            <input type="text" id="txtTitulo" required placeholder="Ej. Consolidador Multimoneda" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68;">
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600;">Categoría</label>
            <select id="txtCategoria" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68;">
              <option value="Intelligency">Intelligency (Modelos Interactivos)</option>
              <option value="Knowledge">Knowledge (Artículos / Blogs)</option>
              <option value="Automation">Automation</option>
              <option value="AI Lab">AI Lab</option>
            </select>
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600;">Resumen / Insights</label>
            <input type="text" id="txtResumen" required placeholder="Pequeña descripción del modelo..." style="background:#0f1a26; color:#fff; border:1px solid #4a5a68;">
          </div>
          <div>
            <label style="color:#b5834c; font-weight:600;">Ruta local del archivo HTML</label>
            <input type="text" id="txtRuta" required placeholder="Ej. /models/consolidador.html" style="background:#0f1a26; color:#fff; border:1px solid #4a5a68;">
          </div>
          <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:10px;">
            <button type="button" class="btn secondary" id="btnCancelar" style="background:#4a5a68; color:#fff; border:none;">Cancelar</button>
            <button type="submit" class="btn primary">Guardar en Base de Datos</button>
          </div>
        </form>
      `;
      
      document.body.appendChild(modal);

      // 2. Evento para cerrar la ventana emergente
      document.getElementById('btnCancelar').addEventListener('click', () => modal.remove());

      // 3. Envío de datos directo a la base de datos cloud a través de nuestro Backend
      document.getElementById('formPublicar').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nuevoArticulo = {
          titulo: document.getElementById('txtTitulo').value,
          categoria: document.getElementById('txtCategoria').value,
          resumen: document.getElementById('txtResumen').value,
          contenido: document.getElementById('txtResumen').value, // Duplicamos en contenido por estructura de tabla
          pdf_url: document.getElementById('txtRuta').value
        };

        try {
          // Llamamos a las llaves directas de Supabase inyectadas en la ventana global
          if (typeof supabase === 'undefined') {
            throw new Error('La librería de conexión no está lista. Revisa las claves del index.html');
          }

          const { data, error } = await supabase.from('articulos').insert([nuevoArticulo]);
          if (error) throw error;

          alert('🎉 ¡Modelo registrado con éxito en la nube de Supabase!');
          modal.remove();
          window.location.reload(); // Recargamos para ver los cambios
        } catch (err) {
          console.error(err);
          alert('❌ Error al guardar en Supabase: ' + err.message);
        }
      });
    });
  }
});
