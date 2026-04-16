import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Libro from './pages/Libro';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF7]">
      <Header variant="app" />
      
      <main className="flex-1">
        {/* Renderizamos el Dashboard por defecto */}
        <Landing />
      </main>

      <Footer />
    </div>
  );
}

export default App;
