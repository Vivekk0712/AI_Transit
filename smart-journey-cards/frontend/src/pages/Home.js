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
          <div className="actions">
            <button type="submit" className="btn btn-primary">Get Recommendations</button>
          </div>
        </form>
        {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      </div>

      <div className="grid cols-2">
        {recommendations.map((rec) => (
          <div key={rec.mode} className="card">
            <h3>{rec.mode}</h3>
            <p>Cost: {rec.cost}</p>
            <p>Time: {rec.time}</p>
            <p>Comfort: {rec.comfort}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;