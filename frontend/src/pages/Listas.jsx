import React, { useState, useEffect } from 'react';
import watchlistService from '../services/watchlistService';
import { ListCard } from '../components/listas/ListCard';
import { DetailedListCard } from '../components/listas/DetailedListCard';
import { MiniListCard } from '../components/listas/MiniListCard';
import { SectionHeader } from '../components/listas/SectionHeader';

function Listas() {
  const [listsData, setListsData] = useState({
    featured: [],
    popular: [],
    recentlyLiked: [],
    crewPicks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await watchlistService.getPublicLists();
        if (data && !data.error) {
          setListsData({
            featured: data.featured ?? [],
            popular: data.popular ?? [],
            recentlyLiked: data.recentlyLiked ?? [],
            crewPicks: data.crewPicks ?? []
          });
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[950px] mx-auto px-4 py-10 md:py-16 text-white font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-2xl md:text-[28px] text-[#8b9bb4] font-medium mb-4 leading-tight">
          Colecciona, organiza y comparte. Las listas son la forma perfecta de agrupar películas.
        </h1>
        <button className="bg-[#2c3440] hover:bg-[#445566] text-[#8b9bb4] hover:text-white px-5 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-colors">
          Crea tu propia lista
        </button>
      </div>

      {/* Featured Lists */}
      <section className="mb-20">
        <SectionHeader title="Listas Destacadas" linkText="Todas · Oficiales" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
          {listsData.featured.map(list => (
            <ListCard key={list.id} list={list} showAvatar={true} />
          ))}
        </div>
      </section>

      {/* Popular This Week */}
      <section className="mb-24">
        <SectionHeader title="Populares esta semana" linkText="Más" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
          {listsData.popular.map(list => (
            <ListCard key={list.id} list={list} showAvatar={true} />
          ))}
        </div>
      </section>

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
        
        {/* Left Column: Recently Liked */}
        <div className="flex-1">
          <SectionHeader title="Listas que te gustarán" />
          <div className="space-y-12">
            {listsData.recentlyLiked.map(list => (
              <DetailedListCard key={list.id} list={list} />
            ))}
          </div>
        </div>

        {/* Right Column: Crew Picks */}
        <aside className="w-full">
          <SectionHeader title="Selección del Staff" />
          <div className="space-y-12">
            {listsData.crewPicks.map(list => (
              <MiniListCard key={list.id} list={list} />
            ))}
          </div>
        </aside>

      </div>

    </div>
  );
}

export default Listas;
