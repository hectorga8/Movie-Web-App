const path = require('path');
// No cargaremos el .env esta vez para probar "limpio"

async function testGoogleBooksV3() {
  const query = 'Harry Potter';
  // Probamos una URL sin API KEY, la más simple posible
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`;

  console.log('--- PRUEBA LIMPIA (SIN LLAVE) ---');
  console.log('URL:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    });

    console.log(`\nEstado: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ ¡SIN LLAVE FUNCIONA!');
      console.log('Primer título:', data.items?.[0]?.volumeInfo?.title);
    } else {
      const errorText = await response.text();
      console.log('❌ SIGUE FALLANDO SIN LLAVE:', errorText);
    }
  } catch (err) {
    console.error('💥 ERROR:', err.message);
  }
}

testGoogleBooksV3();
