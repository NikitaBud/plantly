import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_API_URL + '/api/v1' : '/api/v1',
  withCredentials: true,
});

export default axiosInstance;