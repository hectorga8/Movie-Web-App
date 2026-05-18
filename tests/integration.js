const http = require('http');

async function testService(name, url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`✅ [${name}] IS UP (Status: ${response.status})`);
      return true;
    } else {
      console.log(`❌ [${name}] FAILED (Status: ${response.status})`);
      return false;
    }
  } catch (err) {
    console.log(`❌ [${name}] UNREACHABLE - ${err.message}`);
    return false;
  }
}

async function runIntegrationTests() {
  console.log('--- STARTING INTEGRATION TESTS ---');
  
  // Asumiendo puertos por defecto de la arquitectura (5001 Auth, 5002 Movie, 5003 Watchlist, 5004 Review)
  // Check auth-service
  await testService('Auth Service', 'http://localhost:5001/api/auth/profile/test'); // Debería dar 404 o un json de error, pero responder
  
  // Check movie-service
  await testService('Movie Service', 'http://localhost:5002/api/movies/popular'); // Debería dar 200 si la API TMDb está conectada
  
  // Check watchlist-service
  await testService('Watchlist Service', 'http://localhost:5003/api/watchlist/public-lists');
  
  // Check review-service
  await testService('Review Service', 'http://localhost:5004/api/reviews/popular');

  console.log('--- INTEGRATION TESTS FINISHED ---');
}

runIntegrationTests();
