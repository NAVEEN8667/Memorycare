import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    // Add internal CSS to the document
    const styleElement = document.createElement('style');
    styleElement.id = 'navbar-internal-styles';
    styleElement.textContent = `
      .navbar {
        background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
        padding: 20px 0;
        box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(10px);
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
        font-weight: 800;
        text-decoration: none;
        letter-spacing: -0.5px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .navbar-logo:hover {
        transform: scale(1.05);
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
        border-radius: 10px;
        transition: all 0.3s ease;
        position: relative;
      }

      .navbar-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s ease;
      }

      .navbar-link:hover {
        background: rgba(255, 255, 255, 0.25);
      }

      .navbar-link:hover::after {
        width: 60%;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      // Cleanup: remove the style element when component unmounts
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
          <Link to="/cognitive-exercises" className="navbar-link">
            Exercises
          </Link>
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
