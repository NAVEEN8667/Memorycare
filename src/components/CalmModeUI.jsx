import { useEffect } from "react";

// A simple calming overlay with a breathing animation and soothing tips
// Props:
// - onClose: function to close the Calm Mode overlay
export default function CalmModeUI({ onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      className="calm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Calm Mode"
      style={styles.overlay}
    >
      <div style={styles.panel}>
        <button aria-label="Close calm mode" onClick={onClose} style={styles.closeBtn}>
          ×
        </button>
        <h2 style={styles.title}>Calm Mode</h2>
        <p style={styles.subtitle}>Follow the circle. Breathe in as it grows, breathe out as it shrinks.</p>
        <div style={styles.breatheContainer}>
          <div className="breathing-circle" style={styles.circle} />
        </div>
        <ul style={styles.tips}>
          <li>Relax your shoulders</li>
          <li>Inhale gently through the nose for 4 seconds</li>
          <li>Hold for 2 seconds</li>
          <li>Exhale slowly through the mouth for 6 seconds</li>
        </ul>
      </div>

      {/* Inline keyframes for the breathing animation */}
      <style>
        {`
          @keyframes breathe {
            0% { transform: scale(0.8); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.8); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,64,128,0.6), rgba(0,128,96,0.6))',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  panel: {
    position: 'relative',
    width: 'min(92vw, 720px)',
    background: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: '24px 20px 28px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 8,
    border: 'none',
    background: '#0d6efd',
    color: '#fff',
    fontSize: 28,
    lineHeight: '28px',
    cursor: 'pointer',
  },
  title: {
    margin: '8px 0 4px',
    fontSize: 28,
    color: '#0b3d5c',
  },
  subtitle: {
    margin: '0 0 16px',
    fontSize: 16,
    color: '#28526d',
  },
  breatheContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0 8px',
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, #8fd3f4, #84fab0)',
    animation: 'breathe 6s ease-in-out infinite',
    boxShadow: '0 0 40px rgba(132,250,176,0.6)',
  },
  tips: {
    marginTop: 16,
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'left',
    listStyle: 'disc',
    padding: '0 28px',
  },
};
