// ─────────────────────────────────────────────────────────────
// TrendingGrid.jsx - Versión CineBox
// Cuadrícula de películas en tendencia
// ─────────────────────────────────────────────────────────────
import MovieCardTrending from "./MovieCardTrending";

const TRENDING_MOVIES = [
  {
    id: 1,
    title: "Dune: Parte Dos",
    author: "Denis Villeneuve",
    image: "https://image.tmdb.org/t/p/w400/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg",
    rating: 4.8,
    category: "Sci-Fi"
  },
  {
    id: 2,
    title: "Pobres Criaturas",
    author: "Yorgos Lanthimos",
    image: "https://image.tmdb.org/t/p/w400/811CcaulbxxDswZpXh9IuuIyS6H.jpg",
    rating: 4.6,
    category: "Drama",
    inLibrary: true
  },
  {
    id: 3,
    title: "Spider-Man: Cruzando el Multiverso",
    author: "Joaquim Dos Santos",
    image: "https://image.tmdb.org/t/p/w400/8Vtpi9BDTeC9mSjXmYpYp9S1sQ3.jpg",
    rating: 4.9,
    category: "Animación"
  },
  {
    id: 4,
    title: "Todo a la vez en todas partes",
    author: "Dan Kwan",
    image: "https://image.tmdb.org/t/p/w400/781p3u9O9v1481f37u1v8167f0v.jpg",
    rating: 4.5,
    category: "Aventura"
  }
];

function TrendingGrid() {
  return (
    <div className="fade-up delay-2">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-brand h-tight text-3xl text-black">Tendencias esta semana</h2>
          <p className="body-relaxed mt-1">Los más vistos en CineBox</p>
        </div>
        <a href="#" className="text-[13px] text-[#1060ff] font-bold hover:underline hidden sm:block">Ver cartelera completa →</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {TRENDING_MOVIES.map(movie => (
          <MovieCardTrending key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default TrendingGrid;
