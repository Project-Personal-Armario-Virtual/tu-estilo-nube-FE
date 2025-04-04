import api from "../services/api"; 

const API_URL = '/auth'; 

export const login = async (username, password) => {
  const response = await api.post(`${API_URL}/login`, { username, password });
  if (response.data) {
    localStorage.setItem('token', response.data);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};