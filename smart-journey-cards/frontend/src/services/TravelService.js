
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/travel';

const query = (query, token) => {
  return axios.post(`${API_URL}/query`, { query }, { headers: { 'x-auth-token': token } });
};

const recommend = (source, destination, intent, token) => {
  return axios.post(`${API_URL}/recommend`, { source, destination, intent }, { headers: { 'x-auth-token': token } });
};

const locations = (place, token) => {
  return axios.get(`${API_URL}/locations?place=${place}`, { headers: { 'x-auth-token': token } });
};

const TravelService = {
  query,
  recommend,
  locations,
};

export default TravelService;
