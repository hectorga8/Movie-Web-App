import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { followUser, unfollowUser } from '../../services/authService';

function FollowButton({ targetUserId, className, children }) {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.following) {
      setIsFollowing(currentUser.following.includes(targetUserId));
    }
  }, [currentUser, targetUserId]);

  if (!currentUser || currentUser._id === targetUserId) {
    return null; // No renderizar si no está logueado o es él mismo
  }

  const handleFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId);
        setIsFollowing(false);
      } else {
        await followUser(targetUserId);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleFollow}
      disabled={loading}
      className={className || "w-8 h-8 rounded-full bg-[#2c3440] border border-[#445566] flex items-center justify-center text-[#8aa8c2] hover:bg-white hover:text-black transition-colors font-normal pb-0.5"}
      title={isFollowing ? 'Dejar de seguir' : 'Seguir'}
    >
      {children ? (isFollowing ? 'Siguiendo' : children) : (isFollowing ? '✓' : '+')}
    </button>
  );
}

export default FollowButton;
