// src/services/authService.js
import api from './api';

const API_URL = '/auth';

/**
 * Servicio de autenticación: login, logout y gestión de token.
 */
const authService = {
  /**
   * Inicia sesión y guarda token + usuario en localStorage.
   * @param {{username: string, password: string}} creds
   * @returns {{token: string, user: object}}
   */
  async login({ username, password }) {
    try {
      const { data } = await api.post(`${API_URL}/login`, { username, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        authService.setToken(data.token);
      }
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Error de conexión');
    }
  },

  /**
   * Cierra sesión eliminando token y datos de usuario.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authService.setToken(null);
  },

  /**
   * Configura el header Authorization de Axios.
   * @param {string|null} token
   */
  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  /**
   * @returns {object|null} El usuario logueado o null.
   */
  getCurrentUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },

  /**
   * @returns {boolean}
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }
};

export default authService;
