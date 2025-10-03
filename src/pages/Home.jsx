// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Add internal CSS to the document with animations
    const styleElement = document.createElement('style');
    styleElement.id = 'home-internal-styles';
    styleElement.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes glow {
        0%, 100% {
          box-shadow: 0 15px 40px rgba(74, 144, 226, 0.3);
        }
        50% {
          box-shadow: 0 20px 50px rgba(74, 144, 226, 0.5);
        }
      }

      .home-container {
        min-height: 100vh;
        background: #F7F7F7;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .hero-section {
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
        padding: 120px 40px;
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
      }

      .hero-section::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: float 20s linear infinite;
      }

      .hero-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        letter-spacing: -1px;
        line-height: 1.2;
        position: relative;
        z-index: 1;
        animation: fadeInUp 0.8s ease-out;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.15);
      }

      .hero-subtitle {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 16px;
        opacity: 0.95;
        line-height: 1.5;
        position: relative;
        z-index: 1;
        animation: fadeInUp 1s ease-out;
      }

      .hero-description {
        font-size: 1.125rem;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.8;
        opacity: 0.95;
        position: relative;
        z-index: 1;
        animation: fadeInUp 1.2s ease-out;
      }

      .feature-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 32px;
        padding: 60px 40px;
        max-width: 1300px;
        margin: 0 auto;
      }

      .feature-card {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 40px;
        text-decoration: none;
        color: #333333;
        border: 2px solid transparent;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: block;
        position: relative;
        overflow: hidden;
        animation: fadeInUp 0.6s ease-out backwards;
      }

      .feature-card:nth-child(1) { animation-delay: 0.1s; }
      .feature-card:nth-child(2) { animation-delay: 0.2s; }
      .feature-card:nth-child(3) { animation-delay: 0.3s; }

      .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #4A90E2, #50E3C2, #4A90E2);
        background-size: 200% 100%;
        transform: scaleX(0);
        transition: transform 0.4s ease;
        animation: shimmer 3s linear infinite;
      }

      .feature-card:hover::before {
        transform: scaleX(1);
      }

      .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(74, 144, 226, 0.2);
        border-color: #4A90E2;
      }

      .card-icon {
        font-size: 3rem;
        margin-bottom: 20px;
        display: block;
        animation: float 3s ease-in-out infinite;
      }

      .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 12px;
        color: #333333;
      }

      .card-text {
        font-size: 1rem;
        line-height: 1.7;
        color: #666666;
        margin-bottom: 20px;
      }

      .card-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid #F7F7F7;
      }

      .stat-item {
        font-size: 0.875rem;
        color: #4A90E2;
        font-weight: 600;
        animation: pulse 2s ease-in-out infinite;
      }

      .section-container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 40px 60px;
      }

      .section {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 40px;
        border: 1px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        margin-bottom: 32px;
        animation: slideInLeft 0.8s ease-out;
      }

      .section:nth-child(even) {
        animation: slideInRight 0.8s ease-out;
      }

      .section-title {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 24px;
        color: #333333;
        padding-bottom: 16px;
        border-bottom: 3px solid #50E3C2;
        display: inline-block;
      }

      .activity-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-radius: 8px;
        margin-bottom: 12px;
        background: #F7F7F7;
        border: 1px solid #E0E0E0;
        transition: all 0.3s ease;
      }

      .activity-item:hover {
        background: #E8F5FF;
        transform: translateX(8px);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
        border-color: #4A90E2;
      }

      .activity-time {
        font-weight: 600;
        color: #4A90E2;
        font-size: 0.9rem;
        min-width: 140px;
      }

      .activity-text {
        color: #333333;
        font-size: 1rem;
        flex: 1;
      }

      .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tip-item {
        font-size: 1rem;
        padding: 16px 0;
        padding-left: 36px;
        position: relative;
        line-height: 1.7;
        color: #333333;
        border-bottom: 1px solid #E0E0E0;
        transition: all 0.3s ease;
      }

      .tip-item::before {
        content: '✓';
        position: absolute;
        left: 10px;
        color: #50E3C2;
        font-size: 1.2rem;
        font-weight: bold;
        animation: pulse 2s ease-in-out infinite;
      }

      .tip-item:hover {
        padding-left: 40px;
        color: #4A90E2;
        transform: translateX(4px);
      }

      .tip-item:last-child {
        border-bottom: none;
      }

      .quote-section {
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
        border-radius: 12px;
        padding: 50px 40px;
        text-align: center;
        box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        animation: glow 3s ease-in-out infinite;
      }

      .quote-section::before {
        content: '"';
        position: absolute;
        top: 10px;
        left: 30px;
        font-size: 140px;
        color: rgba(255, 255, 255, 0.1);
        font-family: Georgia, serif;
        animation: float 4s ease-in-out infinite;
      }

      .blockquote {
        font-size: 1.5rem;
        font-style: italic;
        color: white;
        line-height: 1.7;
        margin: 0;
        font-weight: 500;
        position: relative;
        z-index: 1;
        text-shadow: 2px 2px 6px rgba(0,0,0,0.15);
      }

      .quote-footer {
        margin-top: 20px;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.95);
        font-style: normal;
        font-weight: 600;
      }

      .support-section {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 50px 40px;
        text-align: center;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        animation: fadeInUp 1s ease-out;
      }

      .support-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: #333333;
      }

      .support-text {
        font-size: 1.0625rem;
        margin-bottom: 28px;
        color: #666666;
        line-height: 1.7;
      }

      .support-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .support-link {
        background: #4A90E2;
        color: white;
        padding: 14px 32px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
        position: relative;
        overflow: hidden;
      }

      .support-link::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .support-link:hover::before {
        width: 300px;
        height: 300px;
      }

      .support-link:hover {
        background: #3A7BC8;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(74, 144, 226, 0.4);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      // Cleanup: remove the style element when component unmounts
      const existingStyle = document.getElementById('home-internal-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Elderly Care Assistant</h1>
        <p className="hero-subtitle">Your AI companion for stress management and daily support</p>
        <p className="hero-description">
          Elderly Care Assistant is designed to support seniors with gentle reminders,
          companionship, and stress detection through intuitive tools and personalized
          care for daily living.
        </p>
      </div>

      <div className="feature-cards">
        <Link to="/memory-aids" className="feature-card">
          <span className="card-icon">📸</span>
          <h2 className="card-title">Memory Aids</h2>
          <p className="card-text">
            Access photo galleries, reminders, and voice notes to support your
            daily life. Store and organize important memories with ease.
          </p>
          <div className="card-stats">
            <span className="stat-item">Last used: Today</span>
            <span className="stat-item">12 items saved</span>
          </div>
        </Link>

        <Link to="/daily-tasks" className="feature-card">
          <span className="card-icon">✅</span>
          <h2 className="card-title">Daily Tasks</h2>
          <p className="card-text">
            Manage your tasks, medications, and daily routines with ease.
            Receive timely notifications and track your progress.
          </p>
          <div className="card-stats">
            <span className="stat-item">3 tasks today</span>
            <span className="stat-item">2 completed</span>
          </div>
        </Link>

      
      </div>

      <div className="section-container">
        <div className="section">
          <h3 className="section-title">Recent Activity</h3>
          <div>
            <div className="activity-item">
              <span className="activity-time">Today, 9:30 AM</span>
              <span className="activity-text">
                Completed "Word Match" exercise
              </span>
            </div>
            <div className="activity-item">
              <span className="activity-time">Yesterday, 2:15 PM</span>
              <span className="activity-text">
                Added new family photo to gallery
              </span>
            </div>
            <div className="activity-item">
              <span className="activity-time">Yesterday, 10:00 AM</span>
              <span className="activity-text">
                Checked daily medication schedule
              </span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Daily Tips for Cognitive Health</h3>
          <ul className="tips-list">
            <li className="tip-item">
              Check your daily tasks every morning to start your day organized
            </li>
            <li className="tip-item">
              Try to complete at least one cognitive exercise daily to keep your mind sharp
            </li>
            <li className="tip-item">
              Add new photos to your gallery regularly to strengthen memory connections
            </li>
            <li className="tip-item">
              Set reminders for important events and appointments
            </li>
            <li className="tip-item">
              Practice deep breathing exercises to reduce stress and improve focus
            </li>
            <li className="tip-item">
              Maintain a consistent daily routine to support memory retention
            </li>
          </ul>
        </div>

        <div className="quote-section">
          <blockquote className="blockquote">
            "The life in your years isn't measured by time, but by moments remembered."
            <footer className="quote-footer">- Elderly Care Assistant Team</footer>
          </blockquote>
        </div>

        <div className="support-section">
          <h3 className="support-title">Need Help?</h3>
          <p className="support-text">
            Our support team is available to assist you with any questions about
            using Elderly Care Assistant.
          </p>
          <div className="support-actions">
            <Link to="/help" className="support-link">
              View Help Guides
            </Link>
            <Link to="/contact" className="support-link">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
