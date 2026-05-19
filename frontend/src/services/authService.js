const API_URL = import.meta.env.VITE_AUTH_API_URL || '/api/auth';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const getUserProfile = async (identifier) => {
  const response = await fetch(`${API_URL}/profile/${identifier}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al obtener el perfil');
  }
  return response.json();
};

export const getFullProfile = async (identifier) => {
  const response = await fetch(`${API_URL}/profile-full/${identifier}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al obtener el perfil completo');
  }
  return response.json();
};

export const getBulkUsers = async (userIds) => {
  const response = await fetch(`${API_URL}/users/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userIds })
  });
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return response.json();
};

export const followUser = async (userId) => {
  const response = await fetch(`${API_URL}/follow/${userId}`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al seguir al usuario');
  return response.json();
};

export const unfollowUser = async (userId) => {
  const response = await fetch(`${API_URL}/follow/${userId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al dejar de seguir al usuario');
  return response.json();
};

export const toggleFavoriteMovie = async (movieId) => {
  const response = await fetch(`${API_URL}/toggle-favorite/${movieId}`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al actualizar películas favoritas');
  return response.json();
};

export const updateProfile = async (profileData) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profileData)
  });
  if (!response.ok) throw new Error('Error al actualizar el perfil');
  return response.json();
};

export const deleteAccount = async () => {
  const response = await fetch(`${API_URL}/account`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al eliminar la cuenta');
  }
  return response.json();
};
