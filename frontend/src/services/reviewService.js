const SERVER_IP = window.location.hostname;
const API_URL = `http://${SERVER_IP}:5004/api/reviews`;

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

export const getPopularReviews = async () => {
  const response = await fetch(`${API_URL}/popular`);
  if (!response.ok) throw new Error('Error al obtener reseñas populares');
  return response.json();
};

export const getReviewsForMedia = async (mediaType, mediaId) => {
  const response = await fetch(`${API_URL}/media/${mediaType}/${mediaId}`);
  if (!response.ok) throw new Error('Error al obtener reseñas');
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
