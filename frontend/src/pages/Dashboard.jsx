import BookCard from '../components/BookCard';
import AddBookCard from '../components/AddBookCard';
import DashboardBanner from '../components/DashboardBanner';
import Sidebar from '../components/Sidebar';

// ═══════════════════════════════════════════════════════════════
// Dashboard.jsx
// Panel principal con Sidebar y Grid de libros dinámico
// ═══════════════════════════════════════════════════════════════

function Dashboard() {
  // ── Datos del usuario ──────────────────────────────────────────
  const userData = {
    name: "Elena",
    booksGoal: 12,
    year: 2026
  };

  // ── Lista de libros ────────────────────────────────────────────
  const libros = [
    { id: 1, title: "Dune", author: "Frank Herbert", image: "https://covers.openlibrary.org/b/id/10527843-L.jpg", status: "reading", progress: 45, favorite: false, rating: 0 },
    { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez", image: "https://covers.openlibrary.org/b/id/8739161-L.jpg", status: "read", progress: 100, favorite: true, rating: 5 },
    { id: 3, title: "1984", author: "George Orwell", image: "https://covers.openlibrary.org/b/id/12818862-L.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 4, title: "La casa de los espíritus", author: "Isabel Allende", image: "https://covers.openlibrary.org/b/id/8225261-L.jpg", status: "read", progress: 100, favorite: false, rating: 4 },
    { id: 5, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", image: "https://covers.openlibrary.org/b/id/9255566-L.jpg", status: "reading", progress: 15, favorite: false, rating: 0 },
    { id: 6, title: "Pedro Páramo", author: "Juan Rulfo", image: "https://covers.openlibrary.org/b/id/10521270-L.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 7, title: "El principito", author: "Antoine de Saint-Exupéry", image: "https://covers.openlibrary.org/b/id/8373426-L.jpg", status: "read", progress: 100, favorite: false, rating: 5 }
  ];

  // ── Lógica de conteo (Esto es la magia de React) ───────────────
  const counts = {
    total: libros.length,
    reading: libros.filter(l => l.status === "reading").length,
    pending: libros.filter(l => l.status === "pending").length,
    read: libros.filter(l => l.status === "read").length,
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 lg:gap-12 flex-1">
      
      {/* SIDEBAR Izquierdo */}
      <Sidebar counts={counts} />

      {/* CONTENIDO PRINCIPAL Derecho */}
      <section className="flex-1 min-w-0">
        
        {/* Banner del Reto */}
        <DashboardBanner 
          userName={userData.name}
          booksRead={counts.read}
          booksGoal={userData.booksGoal}
          year={userData.year}
        />

        {/* Cabecera de sección */}
        <div className="fade-up delay-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-2">Tu colección</p>
            <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#283618]">
              Todos los libros
            </h1>
            <p className="text-sm text-[#606C38]/80 mt-1">{counts.total} libros guardados en tu biblioteca</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select className="bg-white border border-[#606C38]/20 text-[#283618] text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-[#BC6C25] cursor-pointer shadow-sm">
              <option>Añadidos recientemente</option>
              <option>Título (A-Z)</option>
              <option>Autor (A-Z)</option>
              <option>Mejor valorados</option>
            </select>
          </div>
        </div>

        {/* Grid de libros */}
        <div className="fade-up delay-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {libros.map((libro) => (
            <BookCard 
              key={libro.id}
              image={libro.image}
              title={libro.title}
              author={libro.author}
              status={libro.status}
              progress={libro.progress}
              favorite={libro.favorite}
              rating={libro.rating}
            />
          ))}
          <AddBookCard onClick={() => alert("¡Pronto podrás añadir libros!")} />
        </div>

      </section>
    </div>
  );
}

export default Dashboard;
