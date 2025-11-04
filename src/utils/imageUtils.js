const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getProxiedImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/400x250?text=No+Image+Available';
  }
  return `${API_URL}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
};

export const handleImageError = (e) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
};