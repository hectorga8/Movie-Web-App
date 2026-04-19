import MovieCard from '../components/dashboard/MovieCard';
import AddMovieCard from '../components/dashboard/AddMovieCard';
import DashboardBanner from '../components/dashboard/DashboardBanner';
import Sidebar from '../components/dashboard/Sidebar';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import StatCard from '../components/dashboard/StatCard';
import { useAuth } from '../context/AuthContext';

// ─────────────────────────────────────────────────────────────
// Dashboard.jsx - Versión CineBox
// Panel principal transformado para gestión de Películas
// ─────────────────────────────────────────────────────────────

function Dashboard() {
  const { user } = useAuth();
  
  const userName = user ? user.name.split(' ')[0] : "Elena";

  const userData = { name: userName, moviesGoal: 24, year: 2026 };

  const peliculas = [
    { id: 1, title: "Dune: Parte Dos", author: "Denis Villeneuve", image: "https://image.tmdb.org/t/p/w400/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", status: "reading", progress: 45, favorite: false, rating: 0 },
    { id: 2, title: "Pobres Criaturas", author: "Yorgos Lanthimos", image: "https://image.tmdb.org/t/p/w400/811CcaulbxxDswZpXh9IuuIyS6H.jpg", status: "read", progress: 100, favorite: true, rating: 5 },
    { id: 3, title: "Oppenheimer", author: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w400/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 4, title: "Spider-Man: Across the Spider-Verse", author: "Joaquim Dos Santos", image: "https://image.tmdb.org/t/p/w400/8Vtpi9BDTeC9mSjXmYpYp9S1sQ3.jpg", status: "read", progress: 100, favorite: false, rating: 4 },
    { id: 5, title: "Barbie", author: "Greta Gerwig", image: "https://image.tmdb.org/t/p/w400/9sh7ezS60p729v9u9v8089vV7I.jpg", status: "reading", progress: 15, favorite: false, rating: 0 },
    { id: 6, title: "Blade Runner 2049", author: "Denis Villeneuve", image: "https://image.tmdb.org/t/p/w400/gajva2L0vL462IZxaYI4pCoYjgz.jpg", status: "pending", progress: 0, favorite: false, rating: 0 },
    { id: 7, title: "Everything Everywhere All At Once", author: "Daniels", image: "https://image.tmdb.org/t/p/w400/781p3u9O9v1481f37u1v8167f0v.jpg", status: "read", progress: 100, favorite: false, rating: 5 }
  ];

  const recomendaciones = [
    { 
      id: 1, variant: "main", title: "Interstellar", author: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w400/gEU2QniE6E77NI6lCU6MxlSv2rP.jpg", 
      description: "CineBox AI cree que amarás esta obra maestra por su profundidad emocional y visual.", rating: 5 
    },
    { 
      id: 2, variant: "secondary", badge: "Por tu historial", title: "Arrival", author: "Denis Villeneuve", image: "https://image.tmdb.org/t/p/w400/m9vI36S8T47fN7t4b0K46p69H5w.jpg", 
      description: "Si te gustó Dune, esta exploración sobre el lenguaje y el tiempo te fascinará.", rating: 5 
    },
    { 
      id: 3, variant: "secondary", badge: "Tendencia", title: "The Bear", author: "Christopher Storer", image: "https://image.tmdb.org/t/p/w400/77S9it9A4Wn7N06C3KpUatS7fU6.jpg", 
      description: "Una de las series más discutidas que encaja con tu gusto por el drama intenso.", rating: 4 
    }
  ];

  const counts = {
    total: peliculas.length,
    reading: peliculas.filter(p => p.status === "reading").length,
    pending: peliculas.filter(p => p.status === "pending").length,
    read: peliculas.filter(p => p.status === "read").length,
  };

  const ratedPeliculas = peliculas.filter(p => p.rating > 0);
  const avgRating = ratedPeliculas.length > 0 ? (ratedPeliculas.reduce((acc, p) => acc + p.rating, 0) / ratedPeliculas.length).toFixed(1) : "0.0";

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 lg:gap-12 flex-1">
      <Sidebar counts={counts} />
      <section className="flex-1 min-w-0">
        <DashboardBanner userName={userData.name} moviesRead={counts.read} moviesGoal={userData.moviesGoal} year={userData.year} />
        
        <div className="fade-up delay-3 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>} value={counts.total} label="Total en colección" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} value={counts.read} label="Películas vistas" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>} value={avgRating} label="Valoración media" bgColor="bg-[#ffcf25]/10" iconColor="text-[#ffcf25]" />
          <StatCard icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} value={counts.reading} label="Viendo ahora" bgColor="bg-[#14c6cb]/10" iconColor="text-[#14c6cb]" />
        </div>

        <div className="fade-up delay-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="label-uppercase mb-2">Tu videoteca</p>
            <h1 className="font-brand h-tight text-4xl text-black">Todas las películas</h1>
            <p className="body-relaxed mt-2">{counts.total} títulos guardados en tu perfil</p>
          </div>
          <select className="bg-white border border-[#d5d7db] text-black text-[13px] font-bold rounded-[4px] px-4 py-2 focus:outline-none focus:border-[#1060ff] cursor-pointer shadow-whisper">
            <option>Añadidas recientemente</option>
            <option>Título (A-Z)</option>
          </select>
        </div>

        <div className="fade-up delay-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {peliculas.map((peli) => (
            <MovieCard key={peli.id} id={peli.id} image={peli.image} title={peli.title} author={peli.author} status={peli.status} progress={peli.progress} favorite={peli.favorite} rating={peli.rating} />
          ))}
          <AddMovieCard onClick={() => alert("¡Pronto podrás añadir películas!")} />
        </div>

        <div className="fade-up delay-5 mt-20">
          <p className="label-uppercase mb-3">CineBox AI</p>
          <h2 className="font-brand h-tight text-3xl text-black mb-8">Recomendado para <em className="text-[#656a76] italic">ti</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
