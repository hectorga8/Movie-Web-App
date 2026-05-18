import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Phase3Profile({ onComplete, initialData, isSubmitting }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    bio: initialData?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center w-full max-w-sm"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Tu Identidad</h2>
        <p className="text-white/50">Cuéntanos un poco sobre ti para completar tu perfil.</p>
      </div>

      <div className="w-full space-y-6 mb-10">
        <div className="flex justify-center mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-[#2c3440] border-2 border-white/10 flex items-center justify-center overflow-hidden group-hover:border-[#1060ff] transition-colors">
              <User className="w-10 h-10 text-white/20 group-hover:text-[#1060ff] transition-colors" />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#1060ff] p-2 rounded-full border-2 border-[#111419] shadow-lg">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        <div className="w-full space-y-2 text-center">
          <p className="text-white font-normal text-xl">{user?.name}</p>
          <p className="text-white/40 text-xs uppercase">Nombre de Usuario</p>
        </div>

        <div className="w-full space-y-2">
          <label className="text-[10px] font-normal uppercase text-white/40 block text-center">Bio Corta</label>
          <textarea 
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Amante del cine de autor y el café..."
            rows={3}
            className="w-full px-4 py-3 rounded-[8px] bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#1060ff] focus:bg-white/10 transition-all text-center placeholder:text-white/20 resize-none"
          />
        </div>
      </div>

      <button
        onClick={() => onComplete(profile)}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-[8px] font-normal text-[13px] uppercase transition-all ${!isSubmitting ? 'bg-[#1060ff] hover:bg-[#2b89ff] text-white shadow-lg shadow-[#1060ff]/20 cursor-pointer' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
      >
        {isSubmitting ? 'Finalizando...' : 'Entrar a CineSaaS'}
      </button>
    </motion.div>
  );
}
