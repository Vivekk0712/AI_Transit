import React, { useState, useEffect } from 'react';
import HistoryService from '../services/HistoryService';
import { jwtDecode } from "jwt-decode";

const History = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        try {
          const response = await HistoryService.getHistory(userId, token);
          setHistory(response.data);
        } catch (error) {
          setMessage('Error fetching history');
        }
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="page">
      <h1 className="fade-in">Travel History</h1>
      {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      <div className="grid cols-2">
        {history.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.selectedOption.mode}</h3>
            <p>Query: {item.query}</p>
            <p>Date: {new Date(item.timestamp).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;