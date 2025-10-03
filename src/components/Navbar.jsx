import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    // Add internal CSS to the document
    const styleElement = document.createElement('style');
    styleElement.id = 'navbar-internal-styles';
    styleElement.textContent = `
      .navbar {
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
        padding: 16px 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navbar-logo {
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: -0.3px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .navbar-logo:hover {
        opacity: 0.9;
      }

      .navbar-links {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .navbar-link {
        color: white;
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .navbar-link:hover {
        background: rgba(255, 255, 255, 0.2);
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
