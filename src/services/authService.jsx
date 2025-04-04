import axios from "axios";

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data) {
        localStorage.setItem('token', response.data); 
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token'); 
};