require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// 📂 PIEZA CLAVE: En tu proyecto tus archivos visuales están en la raíz.
// Esta línea le dice a Node.js que sirva tus carpetas (admin, css, js, pages) directamente.
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

// Cliente seguro de Supabase con privilegios de Administrador para subir tus blogs/artículos
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// RUTA INICIAL: Sirve tu hermosa portada principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🚀 NUEVA RUTA DEL FUTURO: Para obtener tus artículos de finanzas desde Supabase
app.get('/api/articulos', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('articulos').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error al obtener artículos:', err);
    res.status(500).json({ error: 'No se pudieron cargar los artículos financieros' });
  }
});

// Arranca el motor de Rigo Finance
app.listen(PORT, () => {
  console.log(`📈 Rigo Finance V2 corriendo de forma impecable en el puerto ${PORT}`);
});
