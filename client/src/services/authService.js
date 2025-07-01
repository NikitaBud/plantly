import axios from './axios';

export const login = (credentials) => axios.post('/auth/login', credentials);
export const logout = () => axios.post('/auth/logout', {});
export const register = (credentials) => axios.post('/auth/register', credentials);
export const getCurrentUser = () => axios.get('/auth/current-user');