
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/history';

const saveHistory = (data, token) => {
  return axios.post(API_URL, data, { headers: { 'x-auth-token': token } });
};

const getHistory = (userId, token) => {
  return axios.get(`${API_URL}/${userId}`, { headers: { 'x-auth-token': token } });
};

const HistoryService = {
  saveHistory,
  getHistory,
};

export default HistoryService;
