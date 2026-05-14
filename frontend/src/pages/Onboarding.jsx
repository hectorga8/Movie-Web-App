import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import * as authService from '../services/authService';
import Phase1Genres from '../components/onboarding/Phase1Genres';
import Phase2Movies from '../components/onboarding/Phase2Movies';
import Phase3Profile from '../components/onboarding/Phase3Profile';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, updateUserLocally, token } = useAuth();
  
  // Si el usuario ya completó el onboarding, no debería estar aquí
  React.useEffect(() => {
    if (user && user.onboardingCompleted) {
      navigate('/inicio', { replace: true });
    }
  }, [user, navigate]);
  
  const [step, setStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    genres: [],
    movies: [],
    profile: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextGenres = (genres) => {
    setOnboardingData(prev => ({ ...prev, genres }));
    setStep(1);
  };

  const handleNextMovies = (movies) => {
    setOnboardingData(prev => ({ ...prev, movies }));
    setStep(2);
  };

  const handleCompleteProfile = async (profileData) => {
    setIsSubmitting(true);
    const finalData = { ...onboardingData, profile: profileData };
    setOnboardingData(finalData);

    try {
      // 1. Llamada real a la API para consolidar datos en el backend
      const response = await authService.updateProfile({
        bio: profileData.bio,
        genres: onboardingData.genres.map(id => String(id)), // Convertimos a string para el modelo
        favoriteMovies: onboardingData.movies.map(m => String(m.id)),
        onboardingCompleted: true
      });

      // 2. Actualizamos el estado local con la respuesta del servidor
      updateUserLocally(response);

      // 3. Redirigimos al dashboard
      setTimeout(() => {
        navigate('/inicio');
      }, 100);
    } catch (error) {
      console.error('Error finalizando onboarding:', error);
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return <Phase1Genres onNext={handleNextGenres} initialData={onboardingData.genres} />;
      case 1:
        return <Phase2Movies onNext={handleNextMovies} initialData={onboardingData.movies} />;
      case 2:
        return <Phase3Profile onComplete={handleCompleteProfile} initialData={onboardingData.profile} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#111419] py-12 px-6 relative overflow-hidden min-h-screen">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,96,255,0.05),transparent_70%)] pointer-events-none"></div>
      
      {/* Indicador de progreso */}
      <div className="absolute top-10 flex gap-3 z-20">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-[#1060ff]' : i < step ? 'w-10 bg-[#1060ff]/50' : 'w-4 bg-white/10'}`}
          />
        ))}
      </div>

      <div className="w-full max-w-[800px] flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
