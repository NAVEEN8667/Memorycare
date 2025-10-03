// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Add internal CSS to the document
    const styleElement = document.createElement('style');
    styleElement.id = 'home-internal-styles';
    styleElement.textContent = `
      .home-container {
        min-height: 100vh;
        background: linear-gradient(to bottom, #e0f2fe 0%, #f0f9ff 100%);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .hero-section {
        background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
        padding: 100px 40px;
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
      }

      .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
        opacity: 0.3;
      }

      .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 20px;
        letter-spacing: -1px;
        line-height: 1.1;
        position: relative;
        z-index: 1;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        font-weight: 300;
        margin-bottom: 16px;
        opacity: 0.95;
        line-height: 1.4;
        position: relative;
        z-index: 1;
      }

      .hero-description {
        font-size: 1.1rem;
        max-width: 750px;
        margin: 0 auto;
        line-height: 1.7;
        opacity: 0.9;
        position: relative;
        z-index: 1;
      }

      .feature-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 30px;
        padding: 60px 40px;
        max-width: 1300px;
        margin: 0 auto;
      }

      .feature-card {
        background: white;
        border-radius: 20px;
        padding: 40px;
        text-decoration: none;
        color: #0f172a;
        border: 2px solid transparent;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: block;
        position: relative;
        overflow: hidden;
      }

      .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #0ea5e9, #06b6d4);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .feature-card:hover::before {
        transform: scaleX(1);
      }

      .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
        border-color: #0ea5e9;
      }

      .card-icon {
        font-size: 3rem;
        margin-bottom: 20px;
        display: block;
        background: linear-gradient(135deg, #0ea5e9, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .card-title {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 12px;
        color: #0f172a;
      }

      .card-text {
        font-size: 1rem;
        line-height: 1.6;
        color: #64748b;
        margin-bottom: 20px;
      }

      .card-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid #e0f2fe;
      }

      .stat-item {
        font-size: 0.875rem;
        color: #0ea5e9;
        font-weight: 600;
      }

      .section-container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 40px 60px;
      }

      .section {
        background: white;
        border-radius: 20px;
        padding: 40px;
        border: 2px solid #e0f2fe;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.08);
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 24px;
        color: #0f172a;
        padding-bottom: 16px;
        border-bottom: 3px solid #0ea5e9;
        display: inline-block;
      }

      .activity-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 20px;
        border-radius: 12px;
        margin-bottom: 12px;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 1px solid #bae6fd;
        transition: all 0.2s ease;
      }

      .activity-item:hover {
        background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
        transform: translateX(4px);
      }

      .activity-time {
        font-weight: 600;
        color: #0ea5e9;
        font-size: 0.9rem;
        min-width: 140px;
      }

      .activity-text {
        color: #334155;
        font-size: 0.95rem;
        flex: 1;
      }

      .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tip-item {
        font-size: 0.95rem;
        padding: 16px 0;
        padding-left: 32px;
        position: relative;
        line-height: 1.6;
        color: #334155;
        border-bottom: 1px solid #e0f2fe;
      }

      .tip-item::before {
        content: '→';
        position: absolute;
        left: 8px;
        color: #0ea5e9;
        font-weight: bold;
      }

      .tip-item:last-child {
        border-bottom: none;
      }

      .quote-section {
        background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
        border-radius: 20px;
        padding: 50px 40px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
      }

      .quote-section::before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 40px;
        font-size: 120px;
        color: rgba(255, 255, 255, 0.1);
        font-family: Georgia, serif;
      }

      .blockquote {
        font-size: 1.5rem;
        font-style: italic;
        color: white;
        line-height: 1.6;
        margin: 0;
        font-weight: 400;
        position: relative;
        z-index: 1;
      }

      .quote-footer {
        margin-top: 20px;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        font-style: normal;
        font-weight: 500;
      }

      .support-section {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 20px;
        padding: 50px 40px;
        text-align: center;
        border: 2px solid #0ea5e9;
      }

      .support-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 16px;
        color: #0f172a;
      }

      .support-text {
        font-size: 1.05rem;
        margin-bottom: 28px;
        color: #334155;
        line-height: 1.6;
      }

      .support-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .support-link {
        background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
        color: white;
        padding: 14px 32px;
        border-radius: 12px;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
      }

      .support-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
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

        <Link to="/cognitive-exercises" className="feature-card">
          <span className="card-icon">🧠</span>
          <h2 className="card-title">Cognitive Exercises</h2>
          <p className="card-text">
            Engage in memory games and word recall activities to keep your
            mind active. Track your progress over time.
          </p>
          <div className="card-stats">
            <span className="stat-item">Daily streak: 5 days</span>
            <span className="stat-item">Last score: 85%</span>
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
              ✓ Check your daily tasks every morning to start your day organized
            </li>
            <li className="tip-item">
              ✓ Try to complete at least one cognitive exercise daily to keep your mind sharp
            </li>
            <li className="tip-item">
              ✓ Add new photos to your gallery regularly to strengthen memory connections
            </li>
            <li className="tip-item">
              ✓ Set reminders for important events and appointments
            </li>
            <li className="tip-item">
              ✓ Practice deep breathing exercises to reduce stress and improve focus
            </li>
            <li className="tip-item">
              ✓ Maintain a consistent daily routine to support memory retention
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
