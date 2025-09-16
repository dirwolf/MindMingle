import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout clicked, isAuthenticated:', isAuthenticated);
    logout();
    console.log('After logout, navigating to home page');
    // Wait a bit for state to update, then navigate
    await new Promise(resolve => setTimeout(resolve, 50));
    navigate('/', { replace: true });
  };

  const handleNavClick = () => {
    // Close the navbar collapse on mobile - simple approach
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Simply remove the 'show' class to hide the collapse
      navbarCollapse.classList.remove('show');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow"
      style={{
        background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
        
        borderBottom: '2px solid var(--primary-teal-dark)',
      }}
    >
      <div className="container-fluid px-3 px-md-4">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ color: '#ffffff' }}
          onClick={handleNavClick}
        >
          🧠 MindMingle
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-2 ms-md-3">
            {!isAuthenticated && (
              <li className="nav-item me-2 me-md-3 fw-bold">
                <Link
                  className="nav-link"
                  to="/"
                  style={{ color: '#fffff' }}
                  onClick={handleNavClick}
                >
                  Home
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/exercises" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Exercises
                  </Link>
                </li>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/mood-tracker" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Mood Tracker
                  </Link>
                </li>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/mood-history" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Mood History
                  </Link>
                </li>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/goals" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Goals
                  </Link>
                </li>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/anonymous-support" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Peer Support
                  </Link>
                </li>
                <li className="nav-item me-2 me-md-3">
                  <Link className="nav-link" to="/dashboard" style={{ color: '#FFFFFF' }} onClick={handleNavClick}>
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav align-items-lg-center me-2 me-md-3">
            {isAuthenticated ? (
              <>
                <li className="nav-item me-2 me-md-3">
                  <span
                    className="navbar-text me-lg-3 mb-2 mb-lg-0"
                    style={{ color: '#FFFFFF' }}
                  >
                    Welcome, {user?.username}!
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: 'var(--primary-teal-dark)',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                    onClick={() => {
                      handleLogout();
                      handleNavClick();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2 me-md-3 fw-bold">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: '#FFFFFF' }}
                    onClick={handleNavClick}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-sm ms-lg-2"
                    to="/register"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      border: '1px solid #FFFFFF',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = 'var(--primary-teal-dark)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onClick={handleNavClick}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
