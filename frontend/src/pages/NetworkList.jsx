import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getUserProfile, getBulkUsers } from '../services/authService';
import FollowButton from '../components/common/FollowButton';

function NetworkList() {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileUser, setProfileUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentTab = searchParams.get('tab') || 'followers';

  useEffect(() => {
    const fetchNetwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUserProfile(userId);
        setProfileUser(user);

        const targetIds = currentTab === 'followers' ? user.followers : user.following;

        if (targetIds && targetIds.length > 0) {
          const bulkData = await getBulkUsers(targetIds);
          setUsers(bulkData);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar la red de usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchNetwork();
  }, [userId, currentTab]);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  if (loading && !profileUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-12 text-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <Link to={`/perfil/${userId}`} className="inline-block mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#2c3440] border-2 border-transparent hover:border-[#1060ff] transition-colors flex items-center justify-center overflow-hidden">
              {profileUser?.avatar ? (
                <img loading="lazy" src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-normal text-white/50">{profileUser?.name?.[0]?.toUpperCase()}</span>
              )}
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Red de {profileUser?.name}</h1>
          <p className="text-white/40 text-[13px] font-light">Explora sus conexiones</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button 
            onClick={() => handleTabChange('followers')}
            className={`flex-1 py-4 text-[13px] font-medium uppercase tracking-wider transition-colors ${currentTab === 'followers' ? 'text-[#1060ff] border-b-2 border-[#1060ff]' : 'text-white/40 hover:text-white'}`}
          >
            Seguidores ({profileUser?.followers?.length || 0})
          </button>
          <button 
            onClick={() => handleTabChange('following')}
            className={`flex-1 py-4 text-[13px] font-medium uppercase tracking-wider transition-colors ${currentTab === 'following' ? 'text-[#1060ff] border-b-2 border-[#1060ff]' : 'text-white/40 hover:text-white'}`}
          >
            Siguiendo ({profileUser?.following?.length || 0})
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-white/40">
            <p>No hay usuarios en esta lista.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {users.map(u => (
              <div key={u._id} className="flex items-center justify-between py-4 border-b border-white/5 group hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <Link to={`/perfil/${u._id}`} className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#1c2228] border border-white/10 group-hover:border-[#1060ff] transition-colors flex items-center justify-center overflow-hidden">
                      {u.avatar ? (
                        <img loading="lazy" src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/50 text-lg font-normal">{u.name?.[0]?.toUpperCase()}</span>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <Link to={`/perfil/${u._id}`} className="text-white font-medium text-[15px] hover:text-[#1060ff] transition-colors">
                      {u.name}
                    </Link>
                    <span className="text-white/40 text-[12px] font-light">
                      {u.followers?.length || 0} seguidores
                    </span>
                  </div>
                </div>
                <FollowButton targetUserId={u._id} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default NetworkList;
