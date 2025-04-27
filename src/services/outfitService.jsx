import api from "./api";

const outfitService = {
  async generate(data) {
    const res = await api.post("/outfits/recommendations", data);
    return res.data;
  },

  async getAll() {
    const res = await api.get("/outfits/mine");
    return res.data;
  },

  async createOutfit(data) {
    const res = await api.post("/outfits", data);
    return res.data;
  },

  async deleteOutfit(id) {
    const res = await api.delete(`/outfits/${id}`);
    return res.data;
  }
};

export default outfitService;
