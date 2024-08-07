import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'learnlytakehomebe-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
