import axios from './axios';

export const getAllSpecies = () => axios.get('/species');
export const getPlantById = (id) => axios.get(`/species/${id}`);