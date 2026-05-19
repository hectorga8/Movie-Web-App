const API_URL = import.meta.env.VITE_REVIEW_API_URL || '/api/reviews';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const createOrUpdateReview = async (reviewData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(reviewData)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar la reseña');
  }
  return response.json();
};

export const getPopularReviews = async (period = 'all', page = 1, limit = 10) => {
  const response = await fetch(`${API_URL}/popular?period=${period}&page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener reseñas populares');
  return response.json();
};

export const getPopularReviewers = async () => {
  const response = await fetch(`${API_URL}/reviewers/popular`);
  if (!response.ok) throw new Error('Error al obtener reseñadores populares');
  return response.json();
};

export const getAllReviewersStats = async () => {
  const response = await fetch(`${API_URL}/reviewers/all-stats`);
  if (!response.ok) throw new Error('Error al obtener estadísticas de todos los reseñadores');
  return response.json();
};

export const getWeeklyPopularReviews = async () => {
  const response = await fetch(`${API_URL}/popular/weekly`);
  if (!response.ok) throw new Error('Error al obtener reseñas populares de la semana');
  return response.json();
};

export const getReviewsForMedia = async (mediaType, mediaId) => {
  const response = await fetch(`${API_URL}/media/${mediaType}/${mediaId}`);
  if (!response.ok) throw new Error('Error al obtener reseñas');
  return response.json();
};

export const getReviewsForUser = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`);
  if (!response.ok) throw new Error('Error al obtener reseñas del usuario');
  return response.json();
};

export const getFeed = async (userIds) => {
  const response = await fetch(`${API_URL}/feed`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ userIds })
  });
  if (!response.ok) throw new Error('Error al obtener feed de actividad');
  return response.json();
};

export const toggleLikeReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}/like`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al dar like');
  return response.json();
};
