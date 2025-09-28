import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelService from '../services/TravelService';
import HistoryService from '../services/HistoryService';
import SpeechService from '../services/SpeechService'; // New import
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [parsedQuery, setParsedQuery] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');

        try {
          const token = localStorage.getItem('token');
          const response = await SpeechService.transcribeAudio(formData, token);
          setQuery(response.data.text);
        } catch (error) {
          console.error('Error transcribing audio:', error);
          setMessage('Error transcribing audio.');
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMessage('Recording...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMessage(`Error accessing microphone. Please ensure it's enabled.`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setMessage('Processing audio...');
    }
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await TravelService.query(query, token);
      const { source, destination, intent } = response.data;
      setSource(source);
      setDestination(destination);
      setParsedQuery(response.data);
      const recommendationsResponse = await TravelService.recommend(
        source,
        destination,
        intent,
        token
      );
      setRecommendations(recommendationsResponse.data);
    } catch (error) {
      setMessage('Error getting recommendations');
    }
  };

  const handleCardClick = async (rec, e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('=== handleCardClick called ===');
    console.log('rec:', rec);
    console.log('parsedQuery:', parsedQuery);
    console.log('query:', query);
    
    const token = localStorage.getItem('token');
    console.log('token exists:', !!token);
    console.log('Attempting to save history...');

    if (!parsedQuery) {
      console.warn('Cannot save history: parsedQuery is not available.');
      // Optionally, you could show a user-facing message here.
      // Proceed with opening map even if history cannot be saved.
    } else {
      // Test backend connectivity first
      try {
        console.log('Testing backend connectivity...');
        const testResponse = await fetch('http://localhost:5000/api/history/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'data' })
        });
        const testData = await testResponse.json();
        console.log('Backend test response:', testData);
      } catch (testError) {
        console.error('Backend connectivity test failed:', testError);
      }
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        console.log('Saving history with data:', { userId, query, parsedQuery, selectedOption: rec });
        const response = await HistoryService.saveHistory(userId, query, parsedQuery, rec, token);
        console.log('History saved response:', response.data);
      } catch (error) {
        console.error('Error saving history from frontend:', error.response ? error.response.data : error.message);
      }
    }

    const travelModeMap = {
      Cab: 'driving',
      Auto: 'driving',
      Bus: 'transit',
      Train: 'transit',
      Walking: 'walking',
      Bicycling: 'bicycling',
      Flight: 'transit', // Google Maps does not have a 'flying' travel mode, defaulting to transit.
    };

    const travelMode = travelModeMap[rec.mode] || 'driving';
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;
    window.open(url, '_blank');
  };

  const handleCardSelect = (rec) => {
    setSelectedCard(rec.mode === selectedCard ? null : rec.mode);
  };

  return (
    <div className="page">
      <h1 className="fade-in">Plan your next journey</h1>
      <div className="card mb-3">
        <form className="form" onSubmit={handleQuery}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. From Delhi to Jaipur, budget friendly"
          />
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`btn btn-secondary ${isRecording ? 'recording' : ''}`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Get Recommendations</button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={async () => {
                console.log('=== Manual Test Save ===');
                const token = localStorage.getItem('token');
                if (token) {
                  try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.user.id;
                    const testData = {
                      userId,
                      text: 'Test query',
                      parsedQuery: { source: 'Delhi', destination: 'Mumbai', intent: 'cheapest' },
                      selectedOption: { mode: 'Bus', cost: '₹100', time: '2 hours' }
                    };
                    console.log('Test data:', testData);
                    const response = await HistoryService.saveHistory(userId, 'Test query', testData.parsedQuery, testData.selectedOption, token);
                    console.log('Test save response:', response);
                    setMessage('Test save successful!');
                  } catch (error) {
                    console.error('Test save error:', error);
                    setMessage('Test save failed: ' + error.message);
                  }
                } else {
                  setMessage('No token found');
                }
              }}
            >
              Test Save
            </button>
          </div>
        </form>
        {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      </div>

      <div className="grid cols-2">
        {recommendations.map((rec) => (
          <div key={rec.mode} className="card cursor-pointer hover:shadow-lg" onClick={() => handleCardSelect(rec)}>
            <h3>{rec.mode}</h3>
            {selectedCard === rec.mode ? (
              <div>
                <button className="btn btn-secondary" onClick={(e) => handleCardClick(rec, e)}>View on Map</button>
              </div>
            ) : (
              <>
                <p>Cost: {rec.cost}</p>
                <p>Time: {rec.time}</p>
                <p>Comfort: {rec.comfort}</p>
                <p>Description: {rec.ai_description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;