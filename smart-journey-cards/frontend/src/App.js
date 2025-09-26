import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import History from './pages/History';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <header className="topbar">
        <div className="topbar-inner">
          <h3 style={{ margin: 0 }}>Smart Journey Cards</h3>
          <nav className="nav-links">
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;