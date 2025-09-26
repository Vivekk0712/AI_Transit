
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/history';

const saveHistory = (query, parsedQuery, selectedOption, token) => {
  const data = { query, parsedQuery, selectedOption };
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
