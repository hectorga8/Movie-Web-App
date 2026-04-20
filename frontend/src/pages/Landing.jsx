import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LandingHero from '../components/landing/LandingHero';
import MovieSection from '../components/landing/MovieSection';
import TrailerSection from '../components/landing/TrailerSection';
import JoinSection from '../components/landing/JoinSection';
import movieService from '../services/movieService';

function Landing() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);

  const mapResults = (items) => items.map(m => ({
    id: m.id,
    title: m.title || m.name,
    date: m.release_date || m.first_air_date ? new Date(m.release_date || m.first_air_date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : 'Próximamente',
    rating: Math.round(m.vote_average * 10),
    image: movieService.getImageUrl(m.poster_path),
    backdrop: movieService.getBackdropUrl(m.backdrop_path)
  }));

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const trendingData = await movieService.getTrending();
        setTrendingMovies(mapResults(trendingData));
      } catch (e) { console.warn("Fallo trending movies"); }

      try {
        const popularData = await movieService.getPopular();
        setPopularMovies(mapResults(popularData));
      } catch (e) { console.warn("Fallo popular movies"); }

      try {
        const tvData = await movieService.getTVTrending();
        setTrendingTV(mapResults(tvData));
      } catch (e) { console.error("❌ Fallo trending TV:", e); }
    };
    fetchInitialData();
  }, []);

  // Configuración de la animación de entrada (Container)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre cada sección
        duration: 0.5
      }
    }
  };

  // Configuración de cada sección
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      className="w-full bg-white overflow-hidden font-['DM_Sans',sans-serif]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 1. HERO (Entra primero) */}
      <motion.div variants={itemVariants}>
        <LandingHero />
      </motion.div>
      
      {/* 2. TENDENCIAS (Entra segundo) */}
      <motion.div 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <MovieSection title="Tendencias" items={trendingMovies} />
      </motion.div>

      {/* 3. TRAILERS (Con efecto de revelación al scroll) */}
      <motion.div 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <TrailerSection movies={trendingMovies.slice(0, 10)} />
      </motion.div>

      {/* 4. SERIES (Aparece suavemente) */}
      <motion.div 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <MovieSection title="Series más populares" items={trendingTV} type="serie" />
      </motion.div>

      {/* 5. POPULARES */}
      <motion.div 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <MovieSection title="Lo más popular" items={popularMovies} />
      </motion.div>
      
      {/* 6. JOIN SECTION (Cierre de página) */}
      <motion.div 
        variants={itemVariants}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <JoinSection />
      </motion.div>
    </motion.div>
  );
}

export default Landing;
