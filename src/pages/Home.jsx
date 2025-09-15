// src/pages/Home.jsx
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to MemoryCare Companion</h1>
        <p className="">Your personalized cognitive support system</p>
        <p className="hero-description">
          MemoryCare Companion is designed to support individuals with memory
          challenges through intuitive tools and personalized assistance for
          daily living.
        </p>
      </div>

      <div className="feature-cards">
        <Link to="/memory-aids" className="feature-card">
          <div className="card-content">
            <div className="card-icon">📸</div>
            <h2>Memory Aids</h2>
            <p>
              Access photo galleries, reminders, and voice notes to support your
              daily life. Store and organize important memories with ease.
            </p>
            <div className="card-stats">
              <span>Last used: Today</span>
              <span>12 items saved</span>
            </div>
          </div>
        </Link>

        <Link to="/daily-tasks" className="feature-card">
          <div className="card-content">
            <div className="card-icon">✅</div>
            <h2>Daily Tasks</h2>
            <p>
              Manage your tasks, medications, and daily routines with ease.
              Receive timely notifications and track your progress.
            </p>
            <div className="card-stats">
              <span>3 tasks today</span>
              <span>2 completed</span>
            </div>
          </div>
        </Link>

        <Link to="/cognitive-exercises" className="feature-card">
          <div className="card-content">
            <div className="card-icon">🧠</div>
            <h2>Cognitive Exercises</h2>
            <p>
              Engage in memory games and word recall activities to keep your
              mind active. Track your progress over time.
            </p>
            <div className="card-stats">
              <span>Daily streak: 5 days</span>
              <span>Last score: 85%</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
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

      <div className="quick-tips">
        <h3>Daily Tips for Cognitive Health</h3>
        <ul>
          <li>
            Check your daily tasks every morning to start your day organized
          </li>
          <li>
            Try to complete at least one cognitive exercise daily to keep your
            mind sharp
          </li>
          <li>
            Add new photos to your gallery regularly to strengthen memory
            connections
          </li>
          <li>Set reminders for important events and appointments</li>
          <li>
            Practice deep breathing exercises to reduce stress and improve focus
          </li>
          <li>
            Maintain a consistent daily routine to support memory retention
          </li>
        </ul>
      </div>

      <div className="motivational-quote">
        <blockquote>
          "The life in your years isn't measured by time, but by moments
          remembered."
          <footer>- MemoryCare Team</footer>
        </blockquote>
      </div>

      <div className="support-section">
        <h3>Need Help?</h3>
        <p>
          Our support team is available to assist you with any questions about
          using MemoryCare Companion.
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
  );
};

export default Home;
