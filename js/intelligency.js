// 📊 js/intelligency.js — MOTOR RECEPTOR DINÁMICO (V3.4)

// Ejecución inmediata: Soluciona el problema de la pantalla en blanco
cargarTarjetasIntelligency();

async function cargarTarjetasIntelligency() {
    const contenedor = document.querySelector('.cards');
    if (!contenedor) return;

    contenedor.innerHTML = '<div style="padding:20px; color:#fafaf6;">🔍 Extrayendo modelos financieros de Supabase...</div>';

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
        tarjeta.className = 'tarjeta-premium-v3-horizontal';
        
        // Estilos en línea para forzar que ocupe todo el ancho y se distribuya horizontalmente
        tarjeta.style.cssText = 'background:#fff; border:1px solid #d8d3c4; padding:25px; margin-bottom:25px; border-radius:6px; display:flex; gap:25px; align-items:stretch; width:100%; box-sizing:border-box; color:#1b2a3a;';
        
        // Bloque Izquierdo: Mapa Conceptual Integrado de forma proporcional
        let htmlBloqueIzquierdo = '<div class="bloque-mapa" style="flex: 0 0 250px; max-width: 250px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#f7fafc; border:1px solid #e2e8f0; border-radius:4px; padding:10px;">';
        if (articulo.mapa_url) {
            htmlBloqueIzquierdo += '  <img src="' + articulo.mapa_url + '" style="width:100%; height:auto; max-height:180px; object-fit:contain; border-radius:3px;" title="Mapa de análisis de ' + articulo.titulo + '"/>';
        } else {
            htmlBloqueIzquierdo += '  <img src="https://placehold.co" style="width:100%; height:auto; object-fit:contain;" />';
        }
        htmlBloqueIzquierdo += '</div>';

        // Bloque Derecho: Información Financiera, Análisis, Enlaces y Power BI
        let htmlBloqueDerecho = '<div class="bloque-informacion" style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">';
        
        // Encabezado con Icono y Título
        htmlBloqueDerecho += '  <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">';
        htmlBloqueDerecho += '    <img src="' + (articulo.imagen_url || 'https://placehold.co') + '" style="width:35px; height:35px; object-fit:contain;" onerror="this.src=\'https://placehold.co\'"/>';
        htmlBloqueDerecho += '    <h3 style="margin:0; font-family:\'Source Serif 4\', serif; color:#1b2a3a; font-size:22px; font-weight:700;">' + articulo.titulo + '</h3>';
        htmlBloqueDerecho += '  </div>';
        
        // Cuerpo del Análisis
        htmlBloqueDerecho += '  <p style="font-size:14.5px; color:#4a5568; line-height:1.6; text-align:justify; margin:0 0 15px 0;">' + (articulo.resumen || 'Sin descripción de análisis disponible.') + '</p>';
        
        // Enlaces (Cambiado el nombre del PDF a Despliegue de Modelo HTML)
        htmlBloqueDerecho += '  <div class="recursos-enlaces" style="margin-bottom:15px; font-size:13.5px; display:flex; gap:20px;">';
        if (articulo.pdf_url) {
            htmlBloqueDerecho += '    <a href="' + articulo.pdf_url + '" target="_blank" style="color:#10b981; text-decoration:none; font-weight:700; display:flex; align-items:center; gap:5px;">🚀 Despliegue del Modelo HTML</a>';
        }
        htmlBloqueDerecho += '  </div>';
        
        // Área del Power BI Embebido
        htmlBloqueDerecho += '  <div class="powerbi-container" id="bi-' + articulo.id + '" style="margin-top:10px; background:#f7fafc; border-radius:4px; width:100%;"></div>';
        htmlBloqueDerecho += '</div>';
        
        // Ensamblamos ambos bloques en la tarjeta horizontal
        tarjeta.innerHTML = htmlBloqueIzquierdo + htmlBloqueDerecho;
        contenedor.appendChild(tarjeta);

        // Inyección activa de Power BI
        if (articulo.contenido && articulo.contenido.includes('<iframe')) {
            const biDiv = document.getElementById('bi-' + articulo.id);
            if (biDiv) {
                biDiv.innerHTML = articulo.contenido;
                const iframe = biDiv.querySelector('iframe');
                if (iframe) {
                    iframe.style.width = '100%';
                    iframe.style.height = '480px';
                    iframe.style.border = '0';
                    iframe.style.marginTop = '10px';
                }
            }
        }
    });
}

