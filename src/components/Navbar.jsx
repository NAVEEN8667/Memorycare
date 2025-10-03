import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px 0',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      backdropFilter: 'blur(10px)'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      color: 'white',
      fontSize: '1.8rem',
      fontWeight: '800',
      textDecoration: 'none',
      letterSpacing: '-0.5px',
      textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      padding: '10px 20px',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link 
          to="/" 
          style={styles.logo}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.textShadow = '3px 3px 12px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.textShadow = '2px 2px 8px rgba(0,0,0,0.2)';
          }}
        >
          💙 Elderly Care Assistant
        </Link>
        <div style={styles.navLinks}>
          <Link 
            to="/dashboard" 
            style={styles.navLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Dashboard
          </Link>
          <Link 
            to="/memory-aids" 
            style={styles.navLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Memory Aids
          </Link>
          <Link 
            to="/daily-tasks" 
            style={styles.navLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Daily Tasks
          </Link>
       
          <Link 
            to="/profile" 
            style={styles.navLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Profile
          </Link>
          <Link 
            to="/companion" 
            style={styles.navLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Companion
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
