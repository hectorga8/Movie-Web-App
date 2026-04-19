const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testGoogleBooks() {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const query = 'Harry Potter';
  
  const urlWithKey = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;
  const urlNoKey = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`;

  console.log('--- PRUEBA CRUZADA DE CONEXIÓN ---');
  
  // PRUEBA 1: CON LLAVE
  console.log('\n1️⃣ Probando CON API Key...');
  try {
    const res = await fetch(urlWithKey);
    console.log(`Resultado: ${res.status} ${res.statusText}`);
  } catch (e) { console.log('Error 1:', e.message); }

  // PRUEBA 2: SIN LLAVE
  console.log('\n2️⃣ Probando SIN API Key...');
  try {
    const res = await fetch(urlNoKey);
    console.log(`Resultado: ${res.status} ${res.statusText}`);
    if (res.ok) console.log('✅ ¡SIN LLAVE FUNCIONA!');
  } catch (e) { console.log('Error 2:', e.message); }
}

testGoogleBooks();
