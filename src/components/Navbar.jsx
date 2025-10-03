import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.id = "navbar-styles";
    styleElement.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

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

      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .navbar {
        background: #FFFFFF;
        padding: 16px 0;
        box-shadow: 0 2px 16px rgba(15, 23, 42, 0.08);
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(12px);
        animation: slideDown 0.5s ease-out;
        border-bottom: 1px solid #E2E8F0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .navbar-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navbar-logo {
        color: #1E293B;
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: -0.025em;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
        background: linear-gradient(135deg, #1E293B 0%, #475569 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: fadeInLeft 0.6s ease-out;
      }

      .navbar-logo:hover {
        transform: translateY(-1px);
        background: linear-gradient(135deg, #1E3A8A 0%, #3730A3 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .navbar-links {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }

      .navbar-link {
        color: #64748B;
        text-decoration: none;
        font-size: 0.9375rem;
        font-weight: 500;
        padding: 12px 20px;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        border: 1px solid transparent;
      }

      .navbar-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(30, 58, 138, 0.05), transparent);
        transition: left 0.5s ease;
      }

      .navbar-link:hover::before {
        left: 100%;
      }

      .navbar-link:hover {
        background: rgba(30, 58, 138, 0.04);
        color: #1E3A8A;
        transform: translateY(-1px);
        border-color: #E2E8F0;
      }

      .navbar-link.active {
        background: rgba(30, 58, 138, 0.08);
        color: #1E3A8A;
        border: 1px solid rgba(30, 58, 138, 0.2);
        font-weight: 600;
      }

      /* Focus states for accessibility */
      .navbar-link:focus {
        outline: 2px solid #1E3A8A;
        outline-offset: 2px;
      }

      .navbar-logo:focus {
        outline: 2px solid #1E3A8A;
        outline-offset: 4px;
        border-radius: 4px;
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .navbar {
          animation: none;
        }
        
        .navbar-logo {
          animation: none;
        }
        
        .navbar-link:hover {
          transform: none;
        }
        
        .navbar-link::before {
          display: none;
        }
      }

      /* Responsive design */
      @media (max-width: 1024px) {
        .navbar-container {
          padding: 0 24px;
        }
        
        .navbar-links {
          gap: 6px;
        }
        
        .navbar-link {
          padding: 10px 16px;
          font-size: 0.875rem;
        }
      }

      @media (max-width: 768px) {
        .navbar {
          padding: 12px 0;
        }
        
        .navbar-container {
          padding: 0 20px;
          flex-direction: column;
          gap: 16px;
        }
        
        .navbar-logo {
          font-size: 1.375rem;
        }
        
        .navbar-links {
          justify-content: center;
          gap: 4px;
        }
        
        .navbar-link {
          padding: 8px 12px;
          font-size: 0.8125rem;
        }
      }

      @media (max-width: 480px) {
        .navbar-container {
          padding: 0 16px;
        }
        
        .navbar-links {
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .navbar-link {
          padding: 6px 10px;
          font-size: 0.75rem;
        }
        
        .navbar-logo {
          font-size: 1.25rem;
          text-align: center;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .navbar {
          border-bottom: 2px solid #1E293B;
        }
        
        .navbar-link {
          border: 1px solid #64748B;
        }
        
        .navbar-link.active {
          border: 2px solid #1E3A8A;
          background: #EFF6FF;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .navbar {
          background: #1E293B;
          border-bottom-color: #334155;
        }
        
        .navbar-logo {
          background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .navbar-logo:hover {
          background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .navbar-link {
          color: #CBD5E1;
        }
        
        .navbar-link:hover {
          background: rgba(96, 165, 250, 0.1);
          color: #F1F5F9;
          border-color: #475569;
        }
        
        .navbar-link.active {
          background: rgba(96, 165, 250, 0.15);
          color: #60A5FA;
          border-color: rgba(96, 165, 250, 0.3);
        }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      const existingStyle = document.getElementById("navbar-styles");
      if (existingStyle) existingStyle.remove();
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
          <Link to="/ai-features" className="navbar-link">
            🤖 AI Features
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