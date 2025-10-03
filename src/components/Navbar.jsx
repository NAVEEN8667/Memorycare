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

      .navbar {
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
        padding: 18px 0;
        box-shadow: 0 4px 16px rgba(74, 144, 226, 0.25);
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(10px);
        animation: slideDown 0.5s ease-out;
      }

      .navbar-container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navbar-logo {
        color: white;
        font-size: 1.75rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: -0.5px;
        text-shadow: 2px 2px 6px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .navbar-logo:hover {
        transform: scale(1.05);
        text-shadow: 3px 3px 12px rgba(0,0,0,0.25);
      }

      .navbar-links {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .navbar-link {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 600;
        padding: 10px 20px;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .navbar-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        transition: left 0.3s ease;
      }

      .navbar-link:hover::before {
        left: 100%;
      }

      .navbar-link:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
         
          <Link to="/memory-aids" className="navbar-link">
            Memory Aids
          </Link>
          <Link to="/daily-tasks" className="navbar-link">
            Daily Tasks
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
