import React from 'react';
import LandingHero from '../components/landing/LandingHero';
import MovieSection from '../components/landing/MovieSection';
import TrailerSection from '../components/landing/TrailerSection';
import JoinSection from '../components/landing/JoinSection';

function Landing() {
  
  // Datos simulados (Se podrían traer de una API en el futuro)
  const trendingMovies = [
    { id: 1, title: "Dune: Part Two", date: "01 mar 2024", rating: "83", image: "https://image.tmdb.org/t/p/w500/8b8R8l3bd9o9vSStqGDb4hq9zms.jpg" },
    { id: 2, title: "Kung Fu Panda 4", date: "02 mar 2024", rating: "71", image: "https://image.tmdb.org/t/p/w500/kDp1vUBiR1CzuRA6S3pWtD4lsbi.jpg" },
    { id: 3, title: "Poor Things", date: "07 dic 2023", rating: "78", image: "https://image.tmdb.org/t/p/w500/kS6I9MvU6Yq6KAnvHdrC6m8t0pI.jpg" },
    { id: 4, title: "Oppenheimer", date: "19 jul 2023", rating: "81", image: "https://image.tmdb.org/t/p/w500/8Gxv8UbgDx9p0X7tpIq1XzXm78B.jpg" },
    { id: 5, title: "The Zone of Interest", date: "15 dic 2023", rating: "72", image: "https://image.tmdb.org/t/p/w500/hU7si7dmGTD9L99AgR0yxp9o9S.jpg" },
    { id: 6, title: "Madame Web", date: "14 feb 2024", rating: "56", image: "https://image.tmdb.org/t/p/w500/rULWuRefuvvJAy0YvGuwCY61L3B.jpg" },
  ];

  const popularMovies = [
    { id: 10, title: "The Dark Knight", date: "16 jul 2008", rating: "85", image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9s1DZu89Iu29mY9Y.jpg" },
    { id: 11, title: "Inception", date: "15 jul 2010", rating: "84", image: "https://image.tmdb.org/t/p/w500/edv5CZvjR79upO8626Y3r8SjvPT.jpg" },
    { id: 12, title: "Pulp Fiction", date: "10 sep 1994", rating: "85", image: "https://image.tmdb.org/t/p/w500/d5iIl9h9btztU0kz5vYOROfP0hx.jpg" },
    { id: 13, title: "The Godfather", date: "14 mar 1972", rating: "87", image: "https://image.tmdb.org/t/p/w500/3bhkrjOiERoSTq9L9vA1Rya木.jpg" }, 
    { id: 14, title: "Interstellar", date: "05 nov 2014", rating: "84", image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlSabaC.jpg" },
    { id: 15, title: "The Matrix", date: "30 mar 1999", rating: "82", image: "https://image.tmdb.org/t/p/w500/f89U3Y9SJuCYFJjbb9msqSSh6Vg.jpg" },
  ];

  return (
    <div className="w-full bg-white overflow-hidden font-['DM_Sans',sans-serif]">
      <LandingHero />
      <MovieSection title="Tendencias" items={trendingMovies} />
      <TrailerSection />
      <MovieSection title="Lo más popular" items={popularMovies} />
      <JoinSection />
    </div>
  );
}

export default Landing;
