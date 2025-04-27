import api from "./api";

const API_URL = '/auth';

const authService = {
  async login({ username, password }) {
    const { data } = await api.post(`${API_URL}/login`, { username, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      authService.setToken(data.token);
    }
    return data;
  },

  async register({ username, email, password }) {
    const response = await api.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authService.setToken(null);
  },

  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  getCurrentUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }
};

export default authService;
