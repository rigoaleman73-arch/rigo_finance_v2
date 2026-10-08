// 🎰 MOTOR RECEPTOR DINÁMICO — RIGO FINANCE V3
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Buscamos el contenedor del diseño donde el programador dejó la clase 'cards'
  const contenedor = document.querySelector('.cards');
  
  if (!contenedor) return;

  try {
    // 2. Le pedimos a tu nueva base de datos cloud (tktomsbcxyaotgbbqszt) los modelos
    const { data: modelos, error } = await supabase
      .from('articulos')
      .select('*')
      .eq('categoria', 'Intelligency') // Solo trae los que registres en esa sección
      .order('id', { ascending: false });

    if (error) throw error;

    // 3. Si la base de datos está vacía, mostramos un letrero limpio
    if (modelos.length === 0) {
      contenedor.innerHTML = '<div class="card"><p style="color:#4a5a68; text-align:center;">Aún no has registrado modelos interactivos desde tu panel de Admin.</p></div>';
      return;
    }

    // 4. ¡La magia! Borramos el texto estático viejo y pintamos las tarjetas reales de la nube
    contenedor.innerHTML = modelos.map(item => `
      <article class="card" style="background:#fff; border:1px solid #d8d3c4; border-radius:4px; padding:20px 22px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-family:'Source Serif 4', serif; font-size:16px; margin:0; font-weight:600;">${item.titulo}</h3>
          <span style="font-family:'IBM Plex Mono', monospace; font-size:11px; color:#8f6538; background:#f1efe7; padding:3px 8px; border-radius:3px;">MODELO INTERACTIVO</span>
        </div>
        <p style="color:#4a5a68; font-size:13.5px; margin:0 0 14px;">${item.resumen}</p>
        <div>
          <!-- El botón apunta directo a la ruta /models/tu-archivo.html que seleccionaste en el Admin -->
          <a href="${item.pdf_url}" class="btn primary" style="text-decoration:none; display:inline-block; font-size:13px; font-weight:600; padding:8px 14px; background:#1b2a3a; color:#fafaf6; border-radius:3px;">Abrir Simulador 🚀</a>
        </div>
      </article>
    `).join('');

  } catch (err) {
    console.error('Error al cargar modelos desde Supabase:', err);
    contenedor.innerHTML = '<div class="card"><p style="color:#a13d2e;">❌ Error al conectar con el catálogo cloud.</p></div>';
  }
});
