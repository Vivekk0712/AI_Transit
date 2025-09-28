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
        const data = await HistoryService.getHistory(userId, token); // 👈 directly the data
        console.log('Fetched history data:', data);
        console.log('First history item:', data[0]);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
        setMessage('Error fetching history');
      }
    }
  };
  fetchHistory();
}, []);


  console.log('History state before rendering:', history);

  return (
    <div className="page">
      <h1 className="fade-in">Travel History</h1>
      {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      <div className="grid cols-2">
        {history && history.length > 0 ? (
          history.map((item) => (
            <div key={item._id} className="card">
              <h3>{item.selectedOption?.mode || 'Unknown Mode'}</h3>
              <p><strong>Query:</strong> {item.text || 'No query text'}</p>
              <p><strong>From:</strong> {item.parsedQuery?.source || 'Unknown'}</p>
              <p><strong>To:</strong> {item.parsedQuery?.destination || 'Unknown'}</p>
              <p><strong>Intent:</strong> {item.parsedQuery?.intent || 'Unknown'}</p>
              <p><strong>Cost:</strong> {item.selectedOption?.cost || 'N/A'}</p>
              <p><strong>Time:</strong> {item.selectedOption?.time || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(item.timestamp || item.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No history found.</p>
        )}

      </div>
    </div>
  );
};

export default History;