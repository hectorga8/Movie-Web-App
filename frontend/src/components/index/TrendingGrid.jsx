// ─────────────────────────────────────────────────────────────
// TrendingGrid.jsx
// Cuadrícula de libros en tendencia
// ─────────────────────────────────────────────────────────────
import BookCardTrending from "./BookCardTrending";

const TRENDING_BOOKS = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "García Márquez",
    image: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
    rating: 4.5,
    category: "Ficción"
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    image: "https://covers.openlibrary.org/b/id/8373426-M.jpg",
    rating: 4.8,
    category: "Sci-Fi",
    inLibrary: true
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: "https://covers.openlibrary.org/b/id/8114459-M.jpg",
    rating: 4.2,
    category: "Historia"
  },
  {
    id: 4,
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    image: "https://covers.openlibrary.org/b/id/10521270-M.jpg",
    rating: 4.3,
    category: "Realismo M."
  }
];

function TrendingGrid() {
  return (
    <div className="fade-up delay-2">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618]">Tendencias esta semana</h2>
          <p className="text-sm text-[#606C38]/70 mt-0.5">Los más añadidos en Folio</p>
        </div>
        <a href="#" className="text-sm text-[#283618] font-bold hover:text-[#BC6C25] transition-colors hidden sm:block">Ver todos →</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {TRENDING_BOOKS.map(book => (
          <BookCardTrending key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default TrendingGrid;
