import BookCard from '../components/dashboard/BookCard';
import AddBookCard from '../components/dashboard/AddBookCard';
import DashboardBanner from '../components/dashboard/DashboardBanner';
import Sidebar from '../components/dashboard/Sidebar';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import StatCard from '../components/dashboard/StatCard';

// ═══════════════════════════════════════════════════════════════
// Dashboard.jsx
// Panel principal con Sidebar, Grid de libros y Estadísticas
// ═══════════════════════════════════════════════════════════════

function Dashboard() {
  const userData = { name: "Elena", booksGoal: 12, year: 2026 };

  const libros = [
    { id: 1, title: "Dune", author: "Frank Herbert", image: "https://covers.openlibrary.org/b/id/10527843-L.jpg", status: "reading", progress: 45, favorite: false, rating: 0 },
    { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez", image: "https://covers.openlibrary.org/b/id/8739161-L.jpg", status: "read", progress: 100, favorite: true, rating: 5 },
    { id: 3, title: "1984", author: "George Orwell", image: "https://covers.openlibrary.org/b/id/12818862-L.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 4, title: "La casa de los espíritus", author: "Isabel Allende", image: "https://covers.openlibrary.org/b/id/8225261-L.jpg", status: "read", progress: 100, favorite: false, rating: 4 },
    { id: 5, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", image: "https://covers.openlibrary.org/b/id/9255566-L.jpg", status: "reading", progress: 15, favorite: false, rating: 0 },
    { id: 6, title: "Pedro Páramo", author: "Juan Rulfo", image: "https://covers.openlibrary.org/b/id/10521270-L.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 7, title: "El principito", author: "Antoine de Saint-Exupéry", image: "https://covers.openlibrary.org/b/id/8373426-L.jpg", status: "read", progress: 100, favorite: false, rating: 5 }
  ];

  const recomendaciones = [
    { 
      id: 1, variant: "main", title: "El nombre del viento", author: "Patrick Rothfuss", image: "https://covers.openlibrary.org/b/id/8373863-M.jpg", 
      description: "Folio AI cree que amarás esta historia por su sistema de magia único y su narrativa épica.", rating: 5 
    },
    { 
      id: 2, variant: "secondary", badge: "Por tu historial", title: "El señor de los anillos", author: "J.R.R. Tolkien", image: "https://covers.openlibrary.org/b/id/9003386-M.jpg", 
      description: "Un clásico de la fantasía que no puede faltar en tu biblioteca si disfrutaste de Dune.", rating: 5 
    },
    { 
      id: 3, variant: "secondary", badge: "Tendencia lectora", title: "Sapiens", author: "Yuval Noah Harari", image: "https://covers.openlibrary.org/b/id/8225267-M.jpg", 
      description: "Una exploración fascinante sobre la historia de la humanidad que está cautivando a lectores de todo el mundo.", rating: 4 
    }
  ];

  const counts = {
    total: libros.length,
    reading: libros.filter(l => l.status === "reading").length,
    pending: libros.filter(l => l.status === "pending").length,
    read: libros.filter(l => l.status === "read").length,
  };

  const ratedLibros = libros.filter(l => l.rating > 0);
  const avgRating = ratedLibros.length > 0 ? (ratedLibros.reduce((acc, l) => acc + l.rating, 0) / ratedLibros.length).toFixed(1) : "0.0";

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 lg:gap-12 flex-1">
      <Sidebar counts={counts} />
      <section className="flex-1 min-w-0">
        <DashboardBanner userName={userData.name} booksRead={counts.read} booksGoal={userData.booksGoal} year={userData.year} />
        
        <div className="fade-up delay-3 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>} value={counts.total} label="Total en biblioteca" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>} value={counts.read} label="Libros leídos" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>} value={avgRating} label="Valoración media" bgColor="bg-[#BC6C25]/10" iconColor="text-[#BC6C25]" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} value={counts.reading} label="Leyendo ahora" />
        </div>

        <div className="fade-up delay-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-2">Tu colección</p>
            <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#283618]">Todos los libros</h1>
            <p className="text-sm text-[#606C38]/80 mt-1">{counts.total} libros guardados en tu biblioteca</p>
          </div>
          <select className="bg-white border border-[#606C38]/20 text-[#283618] text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-[#BC6C25] cursor-pointer shadow-sm">
            <option>Añadidos recientemente</option>
            <option>Título (A-Z)</option>
          </select>
        </div>

        <div className="fade-up delay-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {libros.map((libro) => (
            <BookCard key={libro.id} image={libro.image} title={libro.title} author={libro.author} status={libro.status} progress={libro.progress} favorite={libro.favorite} rating={libro.rating} />
          ))}
          <AddBookCard onClick={() => alert("¡Pronto podrás añadir libros!")} />
        </div>

        <div className="fade-up delay-5 mt-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-3">Folio AI</p>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] mb-6">Recomendado para <em className="text-[#606C38] italic">ti</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recomendaciones.map((rec) => (
              <RecommendationCard key={rec.id} variant={rec.variant} title={rec.title} author={rec.author} image={rec.image} description={rec.description} rating={rec.rating} badge={rec.badge} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
