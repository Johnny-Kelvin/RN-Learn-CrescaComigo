import axios from 'axios';

const api = axios.create({
  baseURL: 'https://phase-low-snowman.glitch.me/',
});

export default api;