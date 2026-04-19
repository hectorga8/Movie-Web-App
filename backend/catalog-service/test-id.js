async function testVolumeId() {
  const id = 'yH92DwAAQBAJ'; // ID de "La Sombra del Viento"
  const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

  console.log('--- TEST ID GOOGLE BOOKS (SIN LLAVE) ---');
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log(`Estado: ${res.status} ${res.statusText}`);
    if (res.ok) {
      const data = await res.json();
      console.log('✅ ¡ID FUNCIONA! Título:', data.volumeInfo.title);
    } else {
      console.log('❌ FALLÓ ID:', await res.text());
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}
testVolumeId();
