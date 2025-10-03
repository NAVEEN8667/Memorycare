// src/pages/AIFeatures.jsx
import { useState, useEffect } from 'react';
import { FiCamera, FiMic, FiMessageCircle } from 'react-icons/fi';
import FaceRecognition from './FaceRecognition';
import VoiceRecognition from './VoiceRecognition';
import AICompanion from './AICompanion';

const AIFeatures = () => {
  const [activeFeature, setActiveFeature] = useState('companion');

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'ai-features-styles';
    styleElement.textContent = `
      .ai-features-page {
        max-width: 1400px;
        margin: 0 auto;
        padding: 48px 40px;
        background: #0f172a;
        min-height: 100vh;
        font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      }

      @media (max-width: 768px) {
        .ai-features-page {
          padding: 32px 24px;
        }
      }

      .ai-features-header {
        text-align: center;
        margin-bottom: 48px;
      }

      .ai-features-header h1 {
        color: #f1f5f9;
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 16px;
        letter-spacing: -1px;
        background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @media (max-width: 768px) {
        .ai-features-header h1 {
          font-size: 2.25rem;
        }
      }

      .ai-features-header p {
        color: #cbd5e1;
        font-size: 1.25rem;
        line-height: 1.6;
      }

      .feature-selector {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-bottom: 48px;
      }

      @media (max-width: 768px) {
        .feature-selector {
          grid-template-columns: 1fr;
          gap: 16px;
        }
      }

      .feature-card {
        background: #1e293b;
        border: 2px solid #334155;
        border-radius: 16px;
        padding: 32px 24px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
        transition: left 0.5s ease;
      }

      .feature-card:hover::before {
        left: 100%;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        border-color: #60A5FA;
        box-shadow: 0 8px 24px rgba(96, 165, 250, 0.2);
      }

      .feature-card.active {
        background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%);
        border-color: #60A5FA;
        box-shadow: 0 4px 16px rgba(96, 165, 250, 0.3);
      }

      .feature-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: white;
        transition: all 0.3s;
      }

      .feature-card:hover .feature-icon {
        transform: scale(1.1) rotate(5deg);
      }

      .feature-card.active .feature-icon {
        background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        box-shadow: 0 8px 24px rgba(96, 165, 250, 0.4);
      }

      .feature-title {
        color: #f1f5f9;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .feature-description {
        color: #94a3b8;
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .feature-badge {
        display: inline-block;
        padding: 6px 16px;
        background: rgba(96, 165, 250, 0.2);
        color: #60A5FA;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .feature-card.active .feature-badge {
        background: rgba(96, 165, 250, 0.3);
        color: #93C5FD;
      }

      .feature-content {
        background: #1e293b;
        border-radius: 16px;
        border: 2px solid #334155;
        padding: 40px;
        min-height: 600px;
      }

      @media (max-width: 768px) {
        .feature-content {
          padding: 24px;
          min-height: 400px;
        }
      }

      .feature-content-wrapper {
        animation: fadeIn 0.5s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Override child component styles to fit within the container */
      .feature-content-wrapper > div {
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        min-height: auto !important;
      }

      .feature-content-wrapper .companion-header,
      .feature-content-wrapper .voice-recognition-page > h1,
      .feature-content-wrapper .face-recognition-page > h1 {
        display: none;
      }

      .feature-content-wrapper .subtitle {
        display: none;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('ai-features-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const features = [
    {
      id: 'companion',
      icon: <FiMessageCircle />,
      title: 'AI Companion',
      description: 'Chat, get reminders, music suggestions, and positive stories',
      badge: 'Chat & Support',
    },
    {
      id: 'face',
      icon: <FiCamera />,
      title: 'Face Recognition',
      description: 'Recognize family members and caregivers using AI',
      badge: 'Visual AI',
    },
    {
      id: 'voice',
      icon: <FiMic />,
      title: 'Voice Recognition',
      description: 'Analyze voice patterns and detect emotions',
      badge: 'Audio AI',
    },
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'companion':
        return <AICompanion />;
      case 'face':
        return <FaceRecognition />;
      case 'voice':
        return <VoiceRecognition />;
      default:
        return <AICompanion />;
    }
  };

  return (
    <div className="ai-features-page">
      <div className="ai-features-header">
        <h1>🤖 AI-Powered Features</h1>
        <p>Advanced AI technology for comprehensive elderly care</p>
      </div>

      <div className="feature-selector">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <span className="feature-badge">{feature.badge}</span>
          </div>
        ))}
      </div>

      <div className="feature-content">
        <div className="feature-content-wrapper">
          {renderFeatureContent()}
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
