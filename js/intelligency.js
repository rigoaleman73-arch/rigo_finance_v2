// 📊 js/intelligency.js — MOTOR RECEPTOR DINÁMICO CON PESTAÑAS (V3.4)

// Variable global interna para guardar los datos descargados de Supabase
let todosLosArticulosLocales = [];

// Inicialización automática de la carga
descargarDatosDeSupabase();

async function descargarDatosDeSupabase() {
    const contenedor = document.querySelector('.cards');
    if (!contenedor) return;

    contenedor.innerHTML = '<div style="padding:20px; color:#94a3b8;">🔍 Conectando con Supabase Cloud y organizando suite...</div>';

    try {
        // Traemos todos los artículos de la categoría Intelligency de un solo golpe
        const { data: dataArticulos, error } = await supabase
            .from('articulos')
            .select('*')
            .eq('categoria', 'Intelligency')
            .order('id', { ascending: false });

        if (error) throw error;

        // Almacenamos en memoria y en caché de respaldo
        todosLosArticulosLocales = dataArticulos || [];
        localStorage.setItem('rigo_cache_intelligency', JSON.stringify(todosLosArticulosLocales));

        // Por defecto pintamos "Todos" los modelos al entrar
        filtrarYRenderizar('Todos');

    } catch (error) {
        console.warn('⚠️ Error de conexión. Activando escudo local...', error);
        const datosCaché = localStorage.getItem('rigo_cache_intelligency');
        if (datosCaché) {
            todosLosArticulosLocales = JSON.parse(datosCaché);
            filtrarYRenderizar('Todos');
        } else {
            contenedor.innerHTML = '<div style="padding:20px; color:red;">❌ Error al enlazar los tableros de control financieros.</div>';
        }
    }
}

// 🎛️ CONTROLADOR FILTRADOR DINÁMICO DE PESTAÑAS
function cambiarPestaña(subcategoriaSeleccionada, botonPresionado) {
    // Intercambiar estilos activos de los botones superiores
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
    botonPresionado.classList.add('active-tab');
    
    // Filtrar y pintar los modelos correspondientes
    filtrarYRenderizar(subcategoriaSeleccionada);
}

function filtrarYRenderizar(filtro) {
    const contenedor = document.querySelector('.cards');
    if (!contenedor) return;

    // Si el filtro es 'Todos', pasamos el arreglo completo.
    // Si no, buscamos que el campo 'titulo' o el 'resumen' incluyan el nombre de la subcategoría 
    // o que coincida directamente con lo que guardaste.
    let articulosFiltrados = todosLosArticulosLocales;
    
    if (filtro !== 'Todos') {
        articulosFiltrados = todosLosArticulosLocales.filter(articulo => {
            const tituloLower = (articulo.titulo || '').toLowerCase();
            const resumenLower = (articulo.resumen || '').toLowerCase();
            const filtroLower = filtro.toLowerCase();
            
            // Busca coincidencia en el título o descripción por si organizas tus modelos ahí
            return tituloLower.includes(filtroLower) || resumenLower.includes(filtroLower);
        });
    }

    if (articulosFiltrados.length === 0) {
        contenedor.innerHTML = '<div style="padding:40px 20px; color:#64748b; text-align:center; font-size:15px;">🎰 No se encontraron modelos registrados para la sección de: <b>' + filtro + '</b>.</div>';
        return;
    }

    contenedor.innerHTML = ''; // Limpiamos la rejilla

    articulosFiltrados.forEach(articulo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-premium-v3-horizontal-dark';
        tarjeta.style.cssText = 'background:#131c2e; border:1px solid #1e293b; padding:25px; margin-bottom:5px; border-radius:8px; display:flex; gap:25px; align-items:stretch; width:100%; box-sizing:border-box; color:#f8fafc; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);';
        
        // 🗺️ MAPA AL DOBLE DE TAMAÑO (500px) CON LUPA INTERACTIVA
        let htmlBloqueIzquierdo = '<div class="bloque-mapa" style="flex: 0 0 500px; max-width: 500px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0b0f19; border:1px solid #1e293b; border-radius:6px; padding:12px; overflow:hidden;">';
        if (articulo.mapa_url) {
            htmlBloqueIzquierdo += '  <img src="' + articulo.mapa_url + '" class="img-mapa-click" style="width:100%; height:auto; max-height:280px; object-fit:contain; border-radius:4px; cursor:zoom-in;" title="Haz clic para ampliar mapa conceptual" onclick="abrirVisorGrande(\'' + articulo.mapa_url + '\')"/>';
        } else {
            htmlBloqueIzquierdo += '  <img src="https://placehold.co" style="width:100%; height:auto; object-fit:contain; border-radius:4px;" />';
        }
        htmlBloqueIzquierdo += '</div>';

        // BLOQUE DERECHO: Información y Acción
        let htmlBloqueDerecho = '<div class="bloque-informacion" style="flex:1; display:flex; flex-direction:column; justify-content:space-between; padding-left:10px;">';
        
        // Icono Corporativo al TRIPLE (105px) y Título Alineado
        htmlBloqueDerecho += '  <div style="display:flex; align-items:center; gap:20px; margin-bottom:16px;">';
        htmlBloqueDerecho += '    <img src="' + (articulo.imagen_url || 'https://placehold.co') + '" style="width:105px; height:105px; object-fit:contain; border-radius:6px; background:#0b0f19; padding:8px; border:1px solid #1e293b;" onerror="this.src=\'https://placehold.co\'"/>';
        htmlBloqueDerecho += '    <h3 style="margin:0; font-family:\'Source Serif 4\', serif; color:#ffffff; font-size:26px; font-weight:700;">' + articulo.titulo + '</h3>';
        htmlBloqueDerecho += '  </div>';
        
        // Resumen
        htmlBloqueDerecho += '  <p style="font-size:15px; color:#cbd5e1; line-height:1.6; text-align:justify; margin:0 0 20px 0;">' + (articulo.resumen || 'Sin descripción de análisis disponible.') + '</p>';
        
        // Enlace Verde de Despliegue de Simulador
        htmlBloqueDerecho += '  <div class="recursos-enlaces" style="margin-bottom:5px; font-size:14px; display:flex;">';
        if (articulo.pdf_url) {
            htmlBloqueDerecho += '    <a href="' + articulo.pdf_url + '" target="_blank" style="color:#10b981; text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:6px; border: 1px solid rgba(16,185,129,0.3); padding: 8px 16px; border-radius: 4px; background: rgba(16,185,129,0.07);">🚀 Despliegue del Modelo HTML</a>';
        }
        htmlBloqueDerecho += '  </div>';
        htmlBloqueDerecho += '</div>';
        
        tarjeta.innerHTML = htmlBloqueIzquierdo + htmlBloqueDerecho;
        contenedor.appendChild(tarjeta);
    });
}

// Visor interactivo en pantalla completa
function abrirVisorGrande(url) {
    const modal = document.getElementById('mapa-lightbox');
    const modalImg = document.getElementById('mapa-lightbox-img');
    if (modal && modalImg) {
        modalImg.src = url;
        modal.style.display = 'flex';
    }
}

