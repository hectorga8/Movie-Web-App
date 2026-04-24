import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function EditarPerfil() {
  const { user, token, updateUserLocally, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('Profile');
  
  const [formData, setFormData] = useState({
    username: '',
    givenName: '',
    familyName: '',
    email: '',
    location: '',
    website: '',
    bio: '',
    pronoun: 'They / their',
    avatar: ''
  });

  const [authData, setAuthData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.name || '',
        givenName: user.givenName || '',
        familyName: user.familyName || '',
        email: user.email || '',
        location: user.location || '',
        website: user.website || '',
        bio: user.bio || '',
        pronoun: user.pronoun || 'They / their',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5001/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        updateUserLocally(data);
        setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Error al actualizar' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de red al actualizar' });
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (authData.newPassword !== authData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5001/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: authData.currentPassword,
          newPassword: authData.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
        setAuthData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Error al actualizar contraseña' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de red al actualizar contraseña' });
    }
    setLoading(false);
  };

  const handleDeactivate = async () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres desactivar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    try {
      const res = await fetch('http://localhost:5001/api/auth/account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Cuenta desactivada');
        logout();
        navigate('/');
      } else {
        const data = await res.json();
        alert(data.message || 'Error al desactivar la cuenta');
      }
    } catch (error) {
      alert('Error de red al intentar desactivar la cuenta');
    }
  };

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header: Title + Upgrade */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
          <h1 className="text-white text-[28px] font-light leading-none">Configuración de la Cuenta</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#2c3440] mb-10 gap-y-4">
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('Profile')} 
              className={`text-[13px] uppercase tracking-[1px] py-3 border-b-2 mt-[2px] transition-colors ${activeTab === 'Profile' ? 'text-white font-bold border-[#00e054]' : 'text-[#8b9bb4] hover:text-white border-transparent'}`}
            >
              Perfil
            </button>
            <button 
              onClick={() => setActiveTab('Auth')} 
              className={`text-[13px] uppercase tracking-[1px] py-3 border-b-2 mt-[2px] transition-colors ${activeTab === 'Auth' ? 'text-white font-bold border-[#00e054]' : 'text-[#8b9bb4] hover:text-white border-transparent'}`}
            >
              Autenticación
            </button>
            <button 
              onClick={() => setActiveTab('Avatar')} 
              className={`text-[13px] uppercase tracking-[1px] py-3 border-b-2 mt-[2px] transition-colors ${activeTab === 'Avatar' ? 'text-white font-bold border-[#00e054]' : 'text-[#8b9bb4] hover:text-white border-transparent'}`}
            >
              Avatar
            </button>
          </nav>
          <button onClick={handleDeactivate} className="text-[12px] text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest font-bold">
            Desactivar cuenta
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            
            {message && (
              <div className={`mb-6 p-4 rounded text-white ${message.type === 'success' ? 'bg-[#00e054]/20 border border-[#00e054]' : 'bg-red-500/20 border border-red-500'}`}>
                {message.text}
              </div>
            )}

            {activeTab === 'Profile' && (
              <>
                <h2 className="text-white text-2xl font-light mb-6">Perfil</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Nombre de Usuario</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-[13px] font-bold mb-2">Nombre</label>
                      <input
                        type="text"
                        name="givenName"
                        value={formData.givenName}
                        onChange={handleChange}
                        className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-[13px] font-bold mb-2">Apellidos</label>
                      <input
                        type="text"
                        name="familyName"
                        value={formData.familyName}
                        onChange={handleChange}
                        className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-[13px] font-bold mb-2">Ubicación</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-[13px] font-bold mb-2">Sitio Web</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Biografía</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full h-[120px] bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Pronombre</label>
                    <select
                      name="pronoun"
                      value={formData.pronoun}
                      onChange={handleChange}
                      className="w-full sm:w-[180px] bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="They / their">Ellos / Ellas</option>
                      <option value="He / him">Él</option>
                      <option value="She / her">Ella</option>
                    </select>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#00e054] hover:bg-[#00c048] text-white font-bold text-[13px] px-4 py-2.5 rounded-[3px] uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'Auth' && (
              <>
                <h2 className="text-white text-2xl font-light mb-6">Autenticación</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div className="mb-4">
                    <p className="text-[14px] text-[#8b9bb4]">
                      Si creaste tu cuenta con Google, puedes establecer una contraseña para iniciar sesión directamente.
                    </p>
                  </div>
                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Contraseña Actual (Dejar en blanco si usas Google)</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={authData.currentPassword}
                      onChange={handleAuthChange}
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Nueva Contraseña</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={authData.newPassword}
                      onChange={handleAuthChange}
                      required
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[13px] font-bold mb-2">Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={authData.confirmPassword}
                      onChange={handleAuthChange}
                      required
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                    />
                  </div>
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#00e054] hover:bg-[#00c048] text-white font-bold text-[13px] px-4 py-2.5 rounded-[3px] uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'Avatar' && (
              <>
                <h2 className="text-white text-2xl font-light mb-6">Avatar</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white text-[13px] font-bold mb-4">Selecciona un Avatar</label>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {predefinedAvatars.map((url, index) => (
                        <div 
                          key={index} 
                          onClick={() => setFormData({...formData, avatar: url})}
                          className={`w-[70px] h-[70px] rounded-full cursor-pointer overflow-hidden border-2 transition-colors ${formData.avatar === url ? 'border-[#00e054]' : 'border-[#445566] hover:border-white'}`}
                        >
                          <img src={url} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                      <div className="text-[13px] text-[#8b9bb4]">O sube tu propia imagen:</div>
                      <label className="bg-[#445566] hover:bg-[#556677] text-white text-[12px] font-bold px-4 py-2 rounded-[3px] uppercase tracking-widest cursor-pointer transition-colors inline-block text-center">
                        Cargar Imagen
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {formData.avatar && !predefinedAvatars.includes(formData.avatar) && (
                    <div className="mt-6 border-t border-[#2c3440] pt-6">
                      <p className="text-[13px] text-[#8b9bb4] font-bold mb-3 uppercase tracking-widest">Vista Previa:</p>
                      <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-[#00e054]">
                        <img src={formData.avatar} alt="Vista previa del avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#00e054] hover:bg-[#00c048] text-white font-bold text-[13px] px-4 py-2.5 rounded-[3px] uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Guardando...' : 'Guardar Avatar'}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default EditarPerfil;