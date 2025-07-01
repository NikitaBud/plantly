import axios from './axios';

export const getUserPlants = () => axios.get('/user-plants');
export const addUserPlant = (data) => axios.post('/user-plants', data);
export const updateUserPlant = (id, data) => axios.patch(`/user-plants/${id}`, data);
export const deleteUserPlant = (id) => axios.delete(`/user-plants/${id}`);