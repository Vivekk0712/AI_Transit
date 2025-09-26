import axios from 'axios';

const API_URL = 'http://localhost:5000/api/speech';

const transcribeAudio = (audioData, token) => {
  return axios.post(API_URL, audioData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
};

const SpeechService = {
  transcribeAudio,
};

export default SpeechService;
