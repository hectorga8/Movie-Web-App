import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function EditarPerfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: user?.name || '',
    givenName: '',
    familyName: '',
    email: user?.email || '',
    location: '',
    website: '',
    bio: '',
    pronoun: 'They / their',
    posters: 'Any',
    replies: 'Anyone',
    includeProfile: true,
    adultContent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
    navigate('/perfil');
  };

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header: Title + Upgrade */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
          <h1 className="text-white text-[28px] font-light leading-none">Account Settings</h1>
          <div className="text-[13px] text-[#8b9bb4]">
            Upgrade to <span className="bg-[#ff8000] text-white px-1.5 py-0.5 rounded-[2px] font-bold text-[10px] uppercase tracking-widest mx-1">PRO</span> for additional features 
            <button className="ml-3 border border-[#445566] hover:border-white text-[#8b9bb4] hover:text-white px-3 py-1 rounded-[3px] text-[11px] font-bold uppercase tracking-widest transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#2c3440] mb-10 gap-y-4">
          <nav className="flex items-center gap-6">
            <Link to="#" className="text-white font-bold text-[13px] uppercase tracking-[1px] py-3 border-b-2 border-[#00e054] mt-[2px]">Profile</Link>
            <Link to="#" className="text-[#8b9bb4] hover:text-white text-[13px] uppercase tracking-[1px] py-3 border-b-2 border-transparent transition-colors mt-[2px]">Auth</Link>
            <Link to="#" className="text-[#8b9bb4] hover:text-white text-[13px] uppercase tracking-[1px] py-3 border-b-2 border-transparent transition-colors mt-[2px]">Avatar</Link>
            <Link to="#" className="text-[#8b9bb4] hover:text-white text-[13px] uppercase tracking-[1px] py-3 border-b-2 border-transparent transition-colors mt-[2px]">Notifications</Link>
          </nav>
          <button className="text-[12px] text-[#8b9bb4] hover:text-white transition-colors">
            Deactivate account
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <h2 className="text-white text-2xl font-light mb-6">Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username */}
              <div>
                <label className="block text-white text-[13px] font-bold mb-2">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b9bb4]">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </div>
                </div>
              </div>

              {/* Given name & Family name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[13px] font-bold mb-2">Given name</label>
                  <input
                    type="text"
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleChange}
                    className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-[13px] font-bold mb-2">Family name</label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-[13px] font-bold mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                />
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[13px] font-bold mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-[13px] font-bold mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white text-[13px] font-bold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full h-[120px] bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors resize-none"
                ></textarea>
              </div>

              {/* Pronoun */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 pt-2">
                <div className="w-[180px] shrink-0">
                  <label className="text-white text-[13px] font-bold mb-2 flex items-center gap-1">
                    Pronoun <span className="text-[#8b9bb4] bg-[#445566] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] cursor-help font-normal">?</span>
                  </label>
                  <div className="relative">
                    <select
                      name="pronoun"
                      value={formData.pronoun}
                      onChange={handleChange}
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-1.5 text-white text-[13px] focus:outline-none focus:bg-[#445566] transition-colors appearance-none cursor-pointer"
                    >
                      <option>They / their</option>
                      <option>He / him</option>
                      <option>She / her</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b9bb4]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                  </div>
                </div>
                <div className="sm:pt-7 text-[12px] text-[#8b9bb4]">
                  Example use: <strong className="text-white">{formData.username || 'User'}</strong> added <strong className="text-white">Pride</strong> to <strong className="text-white">their watchlist</strong>
                </div>
              </div>

              {/* Posters */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
                <div className="w-[180px] shrink-0">
                  <label className="text-white text-[13px] font-bold mb-2 flex items-center gap-1">
                    Posters <span className="text-[#8b9bb4] bg-[#445566] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] cursor-help font-normal">?</span>
                  </label>
                  <div className="relative">
                    <select
                      name="posters"
                      value={formData.posters}
                      onChange={handleChange}
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-1.5 text-white text-[13px] focus:outline-none focus:bg-[#445566] transition-colors appearance-none cursor-pointer"
                    >
                      <option>Any</option>
                      <option>Official only</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b9bb4]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                  </div>
                </div>
                <div className="sm:pt-7 text-[12px] text-[#8b9bb4]">
                  custom posters will be shown
                </div>
              </div>

              {/* Replies */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
                <div className="w-[180px] shrink-0">
                  <label className="text-white text-[13px] font-bold mb-2 flex items-center gap-1">
                    Replies <span className="text-[#8b9bb4] bg-[#445566] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] cursor-help font-normal">?</span>
                  </label>
                  <div className="relative">
                    <select
                      name="replies"
                      value={formData.replies}
                      onChange={handleChange}
                      className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-1.5 text-white text-[13px] focus:outline-none focus:bg-[#445566] transition-colors appearance-none cursor-pointer"
                    >
                      <option>Anyone</option>
                      <option>People you follow</option>
                      <option>No one</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8b9bb4]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                  </div>
                </div>
                <div className="sm:pt-7 text-[12px] text-[#8b9bb4]">
                  can reply to your content
                </div>
              </div>

              {/* Checkboxes */}
              <div className="pt-4 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input 
                      type="checkbox" 
                      name="includeProfile"
                      checked={formData.includeProfile}
                      onChange={handleChange}
                      className="peer appearance-none w-[18px] h-[18px] border border-[#445566] rounded-[3px] bg-[#2c3440] checked:bg-[#445566] transition-colors cursor-pointer"
                    />
                    <svg className="absolute inset-0 w-[18px] h-[18px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[13px] text-white">Include profile in the <span className="text-[#40bcf4] group-hover:underline">Members</span> section</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input 
                      type="checkbox" 
                      name="adultContent"
                      checked={formData.adultContent}
                      onChange={handleChange}
                      className="peer appearance-none w-[18px] h-[18px] border border-[#445566] rounded-[3px] bg-[#2c3440] checked:bg-[#445566] transition-colors cursor-pointer"
                    />
                    <svg className="absolute inset-0 w-[18px] h-[18px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <span className="text-[13px] text-white flex items-center gap-1">
                      Adult content <span className="text-[#8b9bb4] bg-[#445566] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] cursor-help font-normal">?</span>
                    </span>
                    <span className="block text-[11px] text-[#8b9bb4] mt-0.5">Include in content from friends and search; show adult posters</span>
                  </div>
                </label>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="bg-[#00e054] hover:bg-[#00c048] text-white font-bold text-[13px] px-4 py-2.5 rounded-[3px] uppercase tracking-widest transition-colors"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Favorite Films */}
          <div className="w-full md:w-[380px] shrink-0">
            <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest border-b border-[#2c3440] pb-2 mb-4">Favorite Films</h2>
            
            <div className="grid grid-cols-4 gap-3 mb-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[2/3] bg-[#2c3440] rounded-[3px] border border-[#445566] hover:border-white transition-colors cursor-pointer flex items-center justify-center group shadow-md">
                  <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#8b9bb4]">Drag posters to reorder.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EditarPerfil;