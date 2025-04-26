import api from "./api"

const addFavorite = async (outfitId) => {
  const response = await api.post(`/favorites/${outfitId}`)
  return response.data
}

const removeFavorite = async (outfitId) => {
  const response = await api.delete(`/favorites/${outfitId}`)
  return response.data
}

const favoriteService = {
  addFavorite,
  removeFavorite,
}

export default favoriteService