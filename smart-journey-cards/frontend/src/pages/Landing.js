import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Landing.css';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        await AuthService.signup(email, password);
        setMessage('Signup successful! Please login.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="landing-page">
      <div className="form-container">
        <div className="form-toggle">
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Signup</button>
        </div>
        <form onSubmit={handleAuth} className="auth-form">
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
      <div className="animation-container">
        {/* Add an animation or image here */}
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
    </div>
  );
};

export default Landing;
