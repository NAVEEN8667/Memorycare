import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'navbar-internal-styles';
    styleElement.textContent = `
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes navPulse {
        0%, 100% {
          box-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
        }
        50% {
          box-shadow: 0 6px 30px rgba(74, 144, 226, 0.5);
        }
      }

      @keyframes shimmerNav {
        0% {
          background-position: -200% center;
        }
        100% {
          background-position: 200% center;
        }
      }

      .navbar {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 18px 0;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(12px);
        animation: slideDown 0.5s ease-out;
        border-bottom: 2px solid rgba(74, 144, 226, 0.35);
      }

      .navbar-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      @media (max-width: 768px) {
        .navbar-container {
          padding: 0 24px;
        }
      }

      .navbar-logo {
        color: #FFFFFF;
        font-size: 1.875rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: -0.5px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
      }

      @media (max-width: 768px) {
        .navbar-logo {
          font-size: 1.5rem;
        }
      }

      .navbar-logo::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #4A90E2, #50E3C2);
        transition: width 0.3s ease;
      }

      .navbar-logo:hover::after {
        width: 100%;
      }

      .navbar-logo:hover {
        transform: scale(1.05);
        color: #50E3C2;
      }

      .navbar-links {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }

      @media (max-width: 768px) {
        .navbar-links {
          gap: 6px;
        }
      }

      .navbar-link {
        color: #B8C1D9;
        text-decoration: none;
        font-size: 1.0625rem;
        font-weight: 600;
        padding: 12px 22px;
        border-radius: 10px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .navbar-link {
          font-size: 0.9375rem;
          padding: 10px 16px;
        }
      }

      .navbar-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.2), transparent);
        transition: left 0.5s ease;
      }

      .navbar-link:hover::before {
        left: 100%;
      }

      .navbar-link:hover {
        background: rgba(74, 144, 226, 0.2);
        color: #FFFFFF;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(74, 144, 226, 0.35);
      }

      .navbar-link.active {
        background: rgba(74, 144, 226, 0.25);
        color: #50E3C2;
        border: 2px solid rgba(80, 227, 194, 0.4);
        box-shadow: 0 2px 10px rgba(80, 227, 194, 0.2);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('navbar-internal-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💙 Elderly Care Assistant
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/memory-aids" className="navbar-link">
            Memory Aids
          </Link>
          <Link to="/daily-tasks" className="navbar-link">
            Daily Tasks
          </Link>
          <Link to="/face-recognition" className="navbar-link">
            🤖 Face Recognition
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
          <Link to="/companion" className="navbar-link">
            Companion
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
