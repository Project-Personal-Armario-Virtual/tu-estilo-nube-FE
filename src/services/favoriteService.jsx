import api from "./api";

const createOutfit = async (outfitData) => {
  const response = await api.post("/outfits", outfitData);
  return response.data; // ahora response.data es un número (ID del outfit)
};

const addFavorite = async (outfitId) => {
  const response = await api.post(`/favorites/${outfitId}`);
  return response.data;
};

const removeFavorite = async (outfitId) => {
  const response = await api.delete(`/favorites/${outfitId}`);
  return response.data;
};

const favoriteService = {
  createOutfit,
  addFavorite,
  removeFavorite,
};

export default favoriteService;
