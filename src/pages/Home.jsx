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
        background: #f8f9fa;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .hero-section {
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
        padding: 80px 40px;
        text-align: center;
        color: white;
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 16px;
        letter-spacing: -0.5px;
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: 1.4rem;
        font-weight: 400;
        margin-bottom: 12px;
        opacity: 0.95;
        line-height: 1.5;
      }

      .hero-description {
        font-size: 1.05rem;
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
        opacity: 0.9;
      }

      .feature-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        padding: 50px 40px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .feature-card {
        background: white;
        border-radius: 12px;
        padding: 32px;
        text-decoration: none;
        color: #1f2937;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        display: block;
      }

      .feature-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        border-color: #4F46E5;
      }

      .card-icon {
        font-size: 2.5rem;
        margin-bottom: 16px;
        display: block;
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 10px;
        color: #1f2937;
      }

      .card-text {
        font-size: 0.95rem;
        line-height: 1.5;
        color: #6b7280;
        margin-bottom: 16px;
      }

      .card-stats {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
      }

      .stat-item {
        font-size: 0.85rem;
        color: #9ca3af;
        font-weight: 500;
      }

      .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px 50px;
      }

      .section {
        background: white;
        border-radius: 12px;
        padding: 32px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        margin-bottom: 24px;
      }

      .section-title {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: #1f2937;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
      }

      .activity-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        border-radius: 8px;
        margin-bottom: 10px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease;
      }

      .activity-item:hover {
        background: #f3f4f6;
      }

      .activity-time {
        font-weight: 500;
        color: #4F46E5;
        font-size: 0.85rem;
        min-width: 130px;
      }

      .activity-text {
        color: #4b5563;
        font-size: 0.9rem;
        flex: 1;
      }

      .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tip-item {
        font-size: 0.9rem;
        padding: 12px 0;
        padding-left: 24px;
        position: relative;
        line-height: 1.5;
        color: #4b5563;
        border-bottom: 1px solid #f3f4f6;
      }

      .tip-item:last-child {
        border-bottom: none;
      }

      .quote-section {
        background: white;
        border-radius: 12px;
        padding: 36px;
        text-align: center;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        margin-bottom: 24px;
      }

      .blockquote {
        font-size: 1.35rem;
        font-style: italic;
        color: #4b5563;
        line-height: 1.5;
        margin: 0;
        font-weight: 500;
      }

      .quote-footer {
        margin-top: 14px;
        font-size: 0.95rem;
        color: #9ca3af;
        font-style: normal;
      }

      .support-section {
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
        border-radius: 12px;
        padding: 36px;
        text-align: center;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .support-title {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 14px;
      }

      .support-text {
        font-size: 1rem;
        margin-bottom: 24px;
        opacity: 0.95;
        line-height: 1.5;
      }

      .support-actions {
        display: flex;
        gap: 14px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .support-link {
        background: white;
        color: #4F46E5;
        padding: 10px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 0.95rem;
        font-weight: 600;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .support-link:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
