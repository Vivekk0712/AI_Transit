
import React, { useState } from 'react';
import AuthService from '../services/AuthService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.signup(email, password);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="page">
      <h1 className="fade-in">Create your account</h1>
      <div className="card">
        <form className="form" onSubmit={handleSignup}>
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
            <button type="submit" className="btn btn-primary">Signup</button>
            <button type="button" className="btn btn-ghost" onClick={() => { setEmail(''); setPassword(''); }}>Clear</button>
          </div>
        </form>
        {message && <p className="mt-2" style={{ color: '#ffb4b4' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
