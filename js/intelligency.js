// 🎰 MOTOR RECEPTOR CENTRALIZADO — RIGO FINANCE V3.3 (CON MAPAS CONCEPTUALES)
const SUPABASE_URL = "https://tktomsbcxyaotgbbqszt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EYgWbGKyDFrp1vImvcsCAw_CFJfxOpQ";
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.querySelector('.cards');
  if (!contenedor) return;

  try {
    const { data: modelos, error } = await supabase
      .from('articulos')
      .select('*')
      .eq('categoria', 'Intelligency')
      .order('id', { ascending: false });

    if (error) throw error;

    if (!modelos || modelos.length === 0) {
      contenedor.innerHTML = '<div class="card" style="background:#fff; padding:20px; border-radius:4px; border:1px solid #d8d3c4;"><p style="color:#4a5a68; text-align:center; margin:0;">Aún no has registrado modelos interactivos desde tu panel de Admin.</p></div>';
      return;
    }

    let htmlFinal = '';
    modelos.forEach(item => {
      // Si el icono es una imagen de Supabase Storage, se dibuja como etiqueta img
      let iconoHtml = '<span style="font-size:32px;">📊</span>';
      if (item.imagen_url) {
        iconoHtml = item.imagen_url.includes('/') ? '<img src="' + item.imagen_url + '" style="width:40px; height:40px; object-fit:contain; border-radius:4px;">' : '<span style="font-size:32px;">' + item.imagen_url + '</span>';
      }

      // NUEVO: Si inyectaste un mapa conceptual, crea un bloque visual espectacular
      let mapaHtml = '';
      if (item.mapa_url) {
        mapaHtml += '<div style="margin-top:14px; border:1px solid #e7efe9; border-radius:4px; overflow:hidden; background:#fafaf6; padding:10px; text-align:center;">';
        mapaHtml += '  <small style="color:#8f6538; font-weight:600; display:block; margin-bottom:6px; font-family:monospace;">🧠 MAPA CONCEPTUAL / ARQUITECTURA DEL MODELO</small>';
        mapaHtml += '  <img src="' + item.mapa_url + '" style="width:100%; max-height:300px; object-fit:contain; border-radius:2px; cursor:pointer;" onclick="window.open(\'' + item.mapa_url + '\',\'_blank\')">';
        mapaHtml += '</div>';
      }

      let descripcionLarga = item.contenido || 'Sin descripción detallada.';

      htmlFinal += '<article class="card" style="background:#fff; border:1px solid #d8d3c4; border-radius:4px; padding:24px; margin-bottom:24px; display:flex; flex-direction:column; gap:16px;">';
      htmlFinal += '  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px; border-bottom:1px solid #e7efe9; padding-bottom:12px;">';
      htmlFinal += '    <div style="display:flex; align-items:center; gap:14px;">' + iconoHtml + '<h3 style="font-family:\'Source Serif 4\', serif; font-size:18px; margin:0; font-weight:700; color:#1b2a3a;">' + item.titulo + '</h3></div>';
      htmlFinal += '    <span style="font-family:\'IBM Plex Mono\', monospace; font-size:11px; color:#8f6538; background:#f1efe7; padding:4px 10px; border-radius:3px; font-weight:600; white-space:nowrap;">MODELO INTERACTIVO</span>';
      htmlFinal += '  </div>';
      htmlFinal += '  <div style="color:#4a5a68; font-size:14px; line-height:1.6; white-space:pre-line;">' + descripcionLarga + '</div>';
      
      // Acoplamos el mapa conceptual abajo del texto de análisis
      htmlFinal += mapaHtml;

      htmlFinal += '  <div style="margin-top:auto; border-top:1px solid #f1efe7; padding-top:14px; display:flex; justify-content:flex-end;">';
      htmlFinal += '    <a href="' + item.pdf_url + '" class="btn primary" style="text-decoration:none; display:inline-block; font-size:13px; font-weight:600; padding:10px 18px; background:#1b2a3a; color:#fafaf6; border-radius:3px;">Abrir Simulador Interactivo 🚀</a>';
      htmlFinal += '  </div>';
      htmlFinal += '</article>';
    });

    contenedor.innerHTML = htmlFinal;

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<div class="card"><p style="color:#a13d2e;">❌ Error al conectar con el catálogo cloud.</p></div>';
  }
});

