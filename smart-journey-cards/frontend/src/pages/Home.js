import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelService from '../services/TravelService';

const Home = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleQuery = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await TravelService.query(query, token);
      const { source, destination, intent } = response.data;
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

  return (
    <div>
      <h2>Smart Journey Cards</h2>
      <form onSubmit={handleQuery}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your travel query"
        />
        <button type="submit">Get Recommendations</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        {recommendations.map((rec) => (
          <div key={rec.mode}>
            <h3>{rec.mode}</h3>
            <p>Cost: {rec.cost}</p>
            <p>Time: {rec.time}</p>
            <p>Comfort: {rec.comfort}</p>
            <p>Description: {rec.ai_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;