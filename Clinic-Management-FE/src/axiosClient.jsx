// src/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL:'http://localhost:5000/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});


axiosClient.interceptors.response.use(
    (response) => {

        return response.data;
    },
    (error) => {

        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosClient;