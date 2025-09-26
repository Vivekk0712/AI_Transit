
import React, { useState } from 'react';
import AuthService from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or home page
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="page">
      <h1 className="fade-in">Welcome back</h1>
      <div className="card">
        <form className="form" onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-ghost" onClick={() => { setEmail(''); setPassword(''); }}>Clear</button>
          </div>
        </form>
        {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
