// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#f8f9fa',
      padding: '0',
      margin: '0',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    heroSection: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      padding: '80px 40px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      letterSpacing: '-0.5px',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      marginBottom: '15px',
      opacity: '0.95',
      lineHeight: '1.5'
    },
    heroDescription: {
      fontSize: '1.1rem',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.7',
      opacity: '0.9'
    },
    featureCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
      padding: '60px 40px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#f8f9fa'
    },
    featureCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '35px',
      textDecoration: 'none',
      color: '#1f2937',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'block'
    },
    cardIcon: {
      fontSize: '3rem',
      marginBottom: '20px',
      display: 'block'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#1f2937'
    },
    cardText: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#6b7280',
      marginBottom: '20px'
    },
    cardStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb'
    },
    statItem: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      fontWeight: '500'
    },
    sectionContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 40px 60px',
      background: '#f8f9fa'
    },
    activitySection: {
      background: 'white',
      borderRadius: '16px',
      padding: '35px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '1.875rem',
      fontWeight: '600',
      marginBottom: '25px',
      color: '#1f2937',
      paddingBottom: '12px',
      borderBottom: '2px solid #e5e7eb'
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease'
    },
    activityTime: {
      fontWeight: '500',
      color: '#4F46E5',
      fontSize: '0.875rem',
      minWidth: '140px'
    },
    activityText: {
      color: '#4b5563',
      fontSize: '0.95rem',
      flex: '1'
    },
    tipsSection: {
      background: 'white',
      borderRadius: '16px',
      padding: '35px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    },
    tipsList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    tipItem: {
      fontSize: '0.95rem',
      padding: '14px 0',
      paddingLeft: '28px',
      position: 'relative',
      lineHeight: '1.6',
      color: '#4b5563',
      borderBottom: '1px solid #f3f4f6'
    },
    quoteSection: {
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      textAlign: 'center',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    },
    blockquote: {
      fontSize: '1.5rem',
      fontStyle: 'italic',
      color: '#4b5563',
      lineHeight: '1.6',
      margin: '0',
      fontWeight: '500'
    },
    quoteFooter: {
      marginTop: '16px',
      fontSize: '1rem',
      color: '#9ca3af',
      fontStyle: 'normal'
    },
    supportSection: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      borderRadius: '16px',
      padding: '40px',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    supportTitle: {
      fontSize: '1.875rem',
      fontWeight: '600',
      marginBottom: '16px'
    },
    supportText: {
      fontSize: '1.05rem',
      marginBottom: '28px',
      opacity: '0.95',
      lineHeight: '1.6'
    },
    supportActions: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    supportLink: {
      background: 'white',
      color: '#4F46E5',
      padding: '12px 32px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to Elderly Care Assistant</h1>
        <p style={styles.heroSubtitle}>Your AI companion for stress management and daily support</p>
        <p style={styles.heroDescription}>
          Elderly Care Assistant is designed to support seniors with gentle reminders,
          companionship, and stress detection through intuitive tools and personalized
          care for daily living.
        </p>
      </div>

      <div style={styles.featureCards}>
        <Link 
          to="/memory-aids" 
          style={styles.featureCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#4F46E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div>
            <span style={styles.cardIcon}>📸</span>
            <h2 style={styles.cardTitle}>Memory Aids</h2>
            <p style={styles.cardText}>
              Access photo galleries, reminders, and voice notes to support your
              daily life. Store and organize important memories with ease.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.statItem}>Last used: Today</span>
              <span style={styles.statItem}>12 items saved</span>
            </div>
          </div>
        </Link>

        <Link 
          to="/daily-tasks" 
          style={styles.featureCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#4F46E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div>
            <span style={styles.cardIcon}>✅</span>
            <h2 style={styles.cardTitle}>Daily Tasks</h2>
            <p style={styles.cardText}>
              Manage your tasks, medications, and daily routines with ease.
              Receive timely notifications and track your progress.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.statItem}>3 tasks today</span>
              <span style={styles.statItem}>2 completed</span>
            </div>
          </div>
        </Link>

        <Link 
          to="/cognitive-exercises" 
          style={styles.featureCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#4F46E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <div>
            <span style={styles.cardIcon}>🧠</span>
            <h2 style={styles.cardTitle}>Cognitive Exercises</h2>
            <p style={styles.cardText}>
              Engage in memory games and word recall activities to keep your
              mind active. Track your progress over time.
            </p>
            <div style={styles.cardStats}>
              <span style={styles.statItem}>Daily streak: 5 days</span>
              <span style={styles.statItem}>Last score: 85%</span>
            </div>
          </div>
        </Link>
      </div>

      <div style={styles.sectionContainer}>
        <div style={styles.activitySection}>
          <h3 style={styles.sectionTitle}>Recent Activity</h3>
          <div>
            <div 
              style={styles.activityItem}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
            >
              <span style={styles.activityTime}>Today, 9:30 AM</span>
              <span style={styles.activityText}>
                Completed "Word Match" exercise
              </span>
            </div>
            <div 
              style={styles.activityItem}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
            >
              <span style={styles.activityTime}>Yesterday, 2:15 PM</span>
              <span style={styles.activityText}>
                Added new family photo to gallery
              </span>
            </div>
            <div 
              style={styles.activityItem}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
            >
              <span style={styles.activityTime}>Yesterday, 10:00 AM</span>
              <span style={styles.activityText}>
                Checked daily medication schedule
              </span>
            </div>
          </div>
        </div>

        <div style={styles.tipsSection}>
          <h3 style={{...styles.sectionTitle, color: '#1f2937', borderBottom: '2px solid #e5e7eb'}}>Daily Tips for Cognitive Health</h3>
          <ul style={styles.tipsList}>
            <li style={styles.tipItem}>
              ✓ Check your daily tasks every morning to start your day organized
            </li>
            <li style={styles.tipItem}>
              ✓ Try to complete at least one cognitive exercise daily to keep your mind sharp
            </li>
            <li style={styles.tipItem}>
              ✓ Add new photos to your gallery regularly to strengthen memory connections
            </li>
            <li style={styles.tipItem}>
              ✓ Set reminders for important events and appointments
            </li>
            <li style={styles.tipItem}>
              ✓ Practice deep breathing exercises to reduce stress and improve focus
            </li>
            <li style={styles.tipItem}>
              ✓ Maintain a consistent daily routine to support memory retention
            </li>
          </ul>
        </div>

        <div style={styles.quoteSection}>
          <blockquote style={styles.blockquote}>
            "The life in your years isn't measured by time, but by moments remembered."
            <footer style={styles.quoteFooter}>- Elderly Care Assistant Team</footer>
          </blockquote>
        </div>

        <div style={styles.supportSection}>
          <h3 style={styles.supportTitle}>Need Help?</h3>
          <p style={styles.supportText}>
            Our support team is available to assist you with any questions about
            using Elderly Care Assistant.
          </p>
          <div style={styles.supportActions}>
            <Link 
              to="/help" 
              style={styles.supportLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              View Help Guides
            </Link>
            <Link 
              to="/contact" 
              style={styles.supportLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
