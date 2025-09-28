
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/history';

const saveHistory = async (userId, text, parsedQuery, selectedOption, token) => {
  console.log('=== HistoryService.saveHistory called ===');
  console.log('API_URL:', API_URL);
  console.log('Request data:', { userId, text, parsedQuery, selectedOption });
  console.log('Token:', token ? token.substring(0, 20) + '...' : 'No token');
  
  try {
    const response = await axios.post(`${API_URL}`, { userId, text, parsedQuery, selectedOption }, { 
      headers: { 'x-auth-token': token } 
    });
    console.log('HistoryService response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving history:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

const getHistory = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, { headers: { 'x-auth-token': token } });
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

const HistoryService = {
  saveHistory,
  getHistory,
};

export default HistoryService;
