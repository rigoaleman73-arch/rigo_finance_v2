// 📊 js/intelligency.js — MOTOR RECEPTOR DINÁMICO (V3.4)

// Ejecución inmediata: Soluciona el problema de la pantalla en blanco
cargarTarjetasIntelligency();

async function cargarTarjetasIntelligency() {
    const contenedor = document.querySelector('.cards');
    if (!contenedor) return;

    contenedor.innerHTML = '<div style="padding:20px; color:#1b2a3a;">🔍 Extrayendo modelos financieros de Supabase...</div>';

    try {
        // Consultamos la tabla usando el cliente 'supabase' que ya encendió el HTML
        const { data: articulos, error } = await supabase
            .from('articulos')
            .select('*')
            .eq('categoria', 'Intelligency')
            .order('id', { ascending: false });

        if (error) throw error;

        // Guardamos copia de respaldo local (Escudo contra fallas de red)
        localStorage.setItem('rigo_cache_intelligency', JSON.stringify(articulos));

        renderizarTarjetas(articulos, contenedor);

    } catch (error) {
        console.warn('⚠️ Error de conexión. Activando escudo local...', error);
        const datosLocales = localStorage.getItem('rigo_cache_intelligency');
        if (datosLocales) {
            renderizarTarjetas(JSON.parse(datosLocales), contenedor);
        } else {
            contenedor.innerHTML = '<div style="padding:20px; color:red;">❌ Error al conectar con Supabase Cloud.</div>';
        }
    }
}

function renderizarTarjetas(articulos, contenedor) {
    if (!articulos || articulos.length === 0) {
        contenedor.innerHTML = '<div style="padding:20px; color:#718096;">🎰 No hay modelos activos en este momento.</div>';
        return;
    }

    contenedor.innerHTML = ''; // Limpiar mensaje de carga

    articulos.forEach(articulo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-premium-v3';
        tarjeta.style.cssText = 'background:#fff; border:1px solid #d8d3c4; padding:20px; margin-bottom:20px; border-radius:4px;';
        
        // Construimos el HTML de la tarjeta de forma segura
        let htmlContenido = '';
        htmlContenido += '<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">';
        htmlContenido += '  <img src="' + (articulo.imagen_url || 'https://placehold.co') + '" style="width:40px; height:40px; object-fit:contain;" onerror="this.src=\'https://placehold.co\'"/>';
        htmlContenido += '  <h3 style="margin:0; font-family:\'Source Serif 4\', serif; color:#1b2a3a;">' + articulo.titulo + '</h3>';
        htmlContenido += '</div>';
        htmlContenido += '<p style="font-size:14px; color:#4a5568; line-height:1.6; text-align:justify;">' + (articulo.resumen || '') + '</p>';
        
        // Bloque de enlaces para PDF y Mapa Conceptual
        htmlContenido += '<div style="margin: 12px 0; font-size:13px; display:flex; gap:15px;">';
        if (articulo.pdf_url) {
            htmlContenido += '  <a href="' + articulo.pdf_url + '" target="_blank" style="color:#2b6cb0; text-decoration:none; font-weight:600;">📄 Ver Reporte PDF</a>';
        }
        if (articulo.mapa_url) {
            htmlContenido += '  <a href="' + articulo.mapa_url + '" target="_blank" style="color:#2b6cb0; text-decoration:none; font-weight:600;">🗺️ Ver Mapa Conceptual</a>';
        }
        htmlContenido += '</div>';
        
        // Contenedor para inyectar el Power BI
        htmlContenido += '<div class="powerbi-container" id="bi-' + articulo.id + '" style="margin-top:15px; background:#f7fafc; border-radius:4px;"></div>';
        
        tarjeta.innerHTML = htmlContenido;
        contenedor.appendChild(tarjeta);

        // Si el registro incluye un iframe válido en la columna 'contenido', lo inyectamos de forma activa
        if (articulo.contenido && articulo.contenido.includes('<iframe')) {
            const biDiv = document.getElementById('bi-' + articulo.id);
            if (biDiv) {
                biDiv.innerHTML = articulo.contenido;
                const iframe = biDiv.querySelector('iframe');
                if (iframe) {
                    iframe.style.width = '100%';
                    iframe.style.height = '450px';
                    iframe.style.border = '0';
                }
            }
        }
    });
}

