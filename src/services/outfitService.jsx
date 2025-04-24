import api from "./api"

const outfitService = {
  /**
   * Genera outfits recomendados según filtros.
   * @param {{ occasion: string, season: string, includeAccessories: boolean }} data
   * @returns {Promise<Array>} Lista de outfits generados
   */
  async generate(data) {
    const res = await api.post("/outfits/recommendations", data)
    return res.data
  }
}

export default outfitService
