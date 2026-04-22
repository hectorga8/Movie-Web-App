import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import watchlistService from '../services/watchlistService';
import ListaHeader from '../components/listas/ListaHeader';
import ListaActions from '../components/listas/ListaActions';
import ListaGrid from '../components/listas/ListaGrid';
import ListaComments from '../components/listas/ListaComments';

const DetalleLista = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListData = async () => {
      setLoading(true);
      try {
        const data = await watchlistService.getListById(id);
        if (data && !data.error) {
          setList(data);
        } else {
          throw new Error('Fallback to mock');
        }
      } catch (error) {
        // Mock data para desarrollo
        const mockLists = {
          '1': { title: "Top 500 Narrative Feature Films", creator: "Official Lists", description: "Una colección definitiva de las mejores películas narrativas de la historia." },
          '2': { title: "Most Fans on CineBox", creator: "Official Lists", description: "Las películas con más seguidores en nuestra comunidad." },
          '3': { title: "One Million Watched Club", creator: "Alexander", description: "Películas que han superado el millón de visualizaciones." },
          '7': { title: "my favorite sapphic films 🧡", creator: "cherry", description: "From my gay awakening until today I watched an insane amount of sapphic cinema..." }
        };

        const selectedMock = mockLists[id] || mockLists['1'];

        setList({
          id,
          title: selectedMock.title,
          creator: selectedMock.creator,
          description: selectedMock.description,
          likes: 12400,
          posters: [
            "/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", "/8739161.jpg", "/7222246.jpg", "/8231856.jpg", "/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg",
            "/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", "/8739161.jpg", "/7222246.jpg", "/8231856.jpg", "/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg",
            "/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", "/8739161.jpg", "/7222246.jpg", "/8231856.jpg", "/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg"
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Lista no encontrada</h2>
        <Link to="/listas" className="text-[#1060ff] hover:underline">Volver a listas</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#0d0e12] to-[#1a1c23] min-h-screen">
      <div className="max-w-[950px] mx-auto px-6 py-12">
        {/* Botón de retroceso */}
        <Link 
          to="/listas" 
          className="inline-flex items-center gap-2 text-[#8b9bb4] hover:text-white mb-10 text-[11px] font-bold uppercase tracking-widest transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Volver a Listas
        </Link>

        {/* Cabecera: Autor, Título, Descripción */}
        <ListaHeader list={list} />

        {/* Acciones: Like, Seguir, Compartir */}
        <ListaActions list={list} />

        {/* Rejilla de Películas (Posters) */}
        <ListaGrid movies={list.posters} />

        {/* Comentarios */}
        <ListaComments />
      </div>
    </div>
  );
};

export default DetalleLista;
