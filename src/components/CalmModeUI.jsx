import { useEffect } from "react";

// A simple calming overlay with a breathing animation and soothing tips
// Props:
// - onClose: function to close the Calm Mode overlay
export default function CalmModeUI({ onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const styleElement = document.createElement('style');
    styleElement.id = 'calm-mode-styles';
    styleElement.textContent = `
      @keyframes breathe {
        0% { transform: scale(0.8); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(0.8); opacity: 0.8; }
      }

      .calm-overlay {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, rgba(74, 144, 226, 0.85), rgba(80, 227, 194, 0.85));
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .calm-panel {
        position: relative;
        width: min(92vw, 720px);
        background: #FFFFFF;
        border-radius: 12px;
        padding: 40px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
        border: 2px solid #E0E0E0;
      }

      .calm-close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 44px;
        height: 44px;
        border-radius: 8px;
        border: none;
        background: #4A90E2;
        color: white;
        font-size: 28px;
        line-height: 28px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 600;
      }

      .calm-close-btn:hover {
        background: #3A7BC8;
        transform: scale(1.1);
      }

      .calm-title {
        margin: 8px 0 12px;
        font-size: 2.5rem;
        color: #333333;
        font-weight: 600;
      }

      .calm-subtitle {
        margin: 0 0 32px;
        font-size: 1.125rem;
        color: #666666;
        line-height: 1.6;
      }

      .breathe-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 0;
      }

      .breathing-circle {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4A90E2, #50E3C2);
        animation: breathe 6s ease-in-out infinite;
        box-shadow: 0 0 60px rgba(74, 144, 226, 0.6);
      }

      .calm-tips {
        margin-top: 32px;
        font-size: 1.0625rem;
        color: #333333;
        text-align: left;
        list-style: none;
        padding: 0;
      }

      .calm-tips li {
        padding: 12px 0;
        padding-left: 32px;
        position: relative;
        border-bottom: 1px solid #E0E0E0;
      }

      .calm-tips li:last-child {
        border-bottom: none;
      }

      .calm-tips li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #50E3C2;
        font-weight: bold;
        font-size: 1.25rem;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      document.body.style.overflow = prevOverflow;
      const existingStyle = document.getElementById('calm-mode-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="calm-overlay" role="dialog" aria-modal="true" aria-label="Calm Mode">
      <div className="calm-panel">
        <button aria-label="Close calm mode" onClick={onClose} className="calm-close-btn">
          ×
        </button>
        <h2 className="calm-title">Calm Mode</h2>
        <p className="calm-subtitle">Follow the circle. Breathe in as it grows, breathe out as it shrinks.</p>
        <div className="breathe-container">
          <div className="breathing-circle" />
        </div>
        <ul className="calm-tips">
          <li>Relax your shoulders</li>
          <li>Inhale gently through the nose for 4 seconds</li>
          <li>Hold for 2 seconds</li>
          <li>Exhale slowly through the mouth for 6 seconds</li>
        </ul>
      </div>
    </div>
  );
}
