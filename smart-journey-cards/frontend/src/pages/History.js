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
    <div>
      <h2>Travel History</h2>
      {message && <p>{message}</p>}
      <div>
        {history.map((item) => (
          <div key={item._id}>
            <p>Query: {item.query}</p>
            <p>Selected: {item.selectedOption.mode}</p>
            <p>Date: {new Date(item.timestamp).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;