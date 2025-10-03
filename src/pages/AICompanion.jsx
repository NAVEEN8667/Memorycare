// src/pages/AICompanion.jsx
import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMusic, FiBook, FiBell, FiHeart, FiAlertCircle, FiSmile, FiClock } from 'react-icons/fi';
import aiCompanionService from '../services/aiCompanionService';

const AICompanion = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [caregiverAlerts, setCaregiverAlerts] = useState([]);
  const [medications, setMedications] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'ai-companion-styles';
    styleElement.textContent = `
      .ai-companion-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 40px;
        background: #0f172a;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .companion-header {
        text-align: center;
        margin-bottom: 40px;
      }

      .companion-header h1 {
        color: #f1f5f9;
        font-size: 2.75rem;
        font-weight: 700;
        margin-bottom: 16px;
        letter-spacing: -1px;
      }

      .companion-header p {
        color: #cbd5e1;
        font-size: 1.1875rem;
        line-height: 1.6;
      }

      .name-input-modal {
        background: #1e293b;
        border-radius: 16px;
        padding: 40px;
        max-width: 500px;
        margin: 0 auto;
        border: 2px solid #334155;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        text-align: center;
      }

      .name-input-modal h2 {
        color: #f1f5f9;
        font-size: 1.875rem;
        margin-bottom: 16px;
      }

      .name-input-modal p {
        color: #cbd5e1;
        margin-bottom: 24px;
        font-size: 1.0625rem;
      }

      .name-input-modal input {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid #334155;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #f1f5f9;
        background: #0f172a;
        margin-bottom: 20px;
      }

      .name-input-modal input:focus {
        outline: none;
        border-color: #50E3C2;
        box-shadow: 0 0 0 3px rgba(80, 227, 194, 0.1);
      }

      .name-input-modal button {
        padding: 14px 36px;
        background: #50E3C2;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .name-input-modal button:hover {
        background: #3DCFB0;
        transform: translateY(-2px);
      }

      .chat-container {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 24px;
        height: 600px;
      }

      @media (max-width: 968px) {
        .chat-container {
          grid-template-columns: 1fr;
          height: auto;
        }
      }

      .chat-main {
        background: #1e293b;
        border-radius: 16px;
        border: 2px solid #334155;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .message {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .message.user {
        flex-direction: row-reverse;
      }

      .message-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        flex-shrink: 0;
      }

      .message.user .message-avatar {
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
      }

      .message.assistant .message-avatar {
        background: linear-gradient(135deg, #50E3C2 0%, #4A90E2 100%);
      }

      .message-content {
        max-width: 70%;
        padding: 14px 18px;
        border-radius: 12px;
        line-height: 1.6;
      }

      .message.user .message-content {
        background: #4A90E2;
        color: white;
        border-radius: 12px 12px 4px 12px;
      }

      .message.assistant .message-content {
        background: #0f172a;
        color: #f1f5f9;
        border: 2px solid #334155;
        border-radius: 12px 12px 12px 4px;
      }

      .message-type-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .badge-reminder {
        background: #F5A623;
        color: white;
      }

      .badge-music {
        background: #9B59B6;
        color: white;
      }

      .badge-story {
        background: #50E3C2;
        color: white;
      }

      .badge-alert {
        background: #E74C3C;
        color: white;
      }

      .typing-indicator {
        display: flex;
        gap: 6px;
        padding: 12px;
      }

      .typing-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #50E3C2;
        animation: typing 1.4s infinite;
      }

      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        30% {
          transform: scale(1.2);
          opacity: 1;
        }
      }

      .chat-input-container {
        padding: 20px;
        background: #0f172a;
        border-top: 2px solid #334155;
      }

      .quick-actions {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }

      .quick-action-btn {
        padding: 8px 14px;
        background: #334155;
        color: #f1f5f9;
        border: none;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .quick-action-btn:hover {
        background: #50E3C2;
        transform: translateY(-2px);
      }

      .chat-input-form {
        display: flex;
        gap: 12px;
      }

      .chat-input-form input {
        flex: 1;
        padding: 14px 18px;
        border: 2px solid #334155;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #f1f5f9;
        background: #1e293b;
      }

      .chat-input-form input:focus {
        outline: none;
        border-color: #50E3C2;
        box-shadow: 0 0 0 3px rgba(80, 227, 194, 0.1);
      }

      .send-btn {
        padding: 14px 24px;
        background: #50E3C2;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .send-btn:hover:not(:disabled) {
        background: #3DCFB0;
        transform: translateY(-2px);
      }

      .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .sidebar-card {
        background: #1e293b;
        border-radius: 12px;
        padding: 20px;
        border: 2px solid #334155;
      }

      .sidebar-card h3 {
        color: #f1f5f9;
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .alert-item {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 8px;
      }

      .alert-urgent {
        border-color: #E74C3C;
        background: rgba(231, 76, 60, 0.1);
      }

      .alert-moderate {
        border-color: #F5A623;
        background: rgba(245, 166, 35, 0.1);
      }

      .alert-time {
        font-size: 0.75rem;
        color: #94a3b8;
        margin-bottom: 4px;
      }

      .alert-reason {
        font-size: 0.875rem;
        color: #f1f5f9;
        font-weight: 600;
      }

      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #334155;
      }

      .stat-item:last-child {
        border-bottom: none;
      }

      .stat-label {
        color: #94a3b8;
        font-size: 0.875rem;
      }

      .stat-value {
        color: #50E3C2;
        font-weight: 700;
        font-size: 1.125rem;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: #94a3b8;
      }

      .empty-state-icon {
        font-size: 3rem;
        margin-bottom: 12px;
        opacity: 0.5;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('ai-companion-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Load saved data
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      setShowNameInput(false);
      aiCompanionService.initialize(null, savedName);
      loadConversation();
    }
    loadAlerts();
    loadMedications();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = () => {
    const history = aiCompanionService.conversationHistory;
    setMessages(history);
  };

  const loadAlerts = () => {
    const alerts = JSON.parse(localStorage.getItem('caregiverAlerts') || '[]');
    setCaregiverAlerts(alerts.slice(0, 5)); // Show last 5 alerts
  };

  const loadMedications = () => {
    const meds = JSON.parse(localStorage.getItem('medications') || '[]');
    setMedications(meds.map(m => m.name));
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('userName', userName);
      aiCompanionService.initialize(null, userName);
      setShowNameInput(false);
      
      // Send welcome message
      const welcomeMsg = aiCompanionService.addMessage(
        'assistant',
        `Hello ${userName}! I'm your AI companion. I'm here to chat with you, remind you about medications, suggest music, share stories, and keep you company. How are you feeling today?`
      );
      setMessages([welcomeMsg]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Check for alerts
      const alertCheck = aiCompanionService.needsCaregiverAlert(userMessage);
      if (alertCheck.alert) {
        await aiCompanionService.sendCaregiverAlert({
          level: alertCheck.level,
          reason: alertCheck.reason,
          message: userMessage,
        });
        loadAlerts();
      }

      // Generate response
      const context = { medications };
      const result = await aiCompanionService.generateResponse(userMessage, context);
      
      // Update messages
      loadConversation();
    } catch (error) {
      console.error('Error:', error);
      aiCompanionService.addMessage(
        'assistant',
        "I'm sorry, I'm having trouble right now. Please try again."
      );
      loadConversation();
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      greeting: 'How are you?',
      medication: 'Remind me about my medications',
      music: 'Suggest some music for me',
      story: 'Tell me a positive story',
      time: 'What time is it?',
      help: 'I need help',
    };
    
    setInputValue(actionMessages[action] || '');
  };

  const getMessageIcon = (role) => {
    return role === 'user' ? '👤' : '🤖';
  };

  const getTypeBadge = (type) => {
    const badges = {
      reminder: { label: '💊 Reminder', class: 'badge-reminder' },
      music: { label: '🎵 Music', class: 'badge-music' },
      story: { label: '📖 Story', class: 'badge-story' },
      alert: { label: '🚨 Alert', class: 'badge-alert' },
    };
    return badges[type] || null;
  };

  if (showNameInput) {
    return (
      <div className="ai-companion-page">
        <div className="companion-header">
          <h1>🤖 AI Companion</h1>
          <p>Your caring friend, always here to help</p>
        </div>

        <div className="name-input-modal">
          <h2>Welcome!</h2>
          <p>What should I call you?</p>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name..."
              autoFocus
            />
            <button type="submit">Start Chatting</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-companion-page">
      <div className="companion-header">
        <h1>🤖 AI Companion</h1>
        <p>Hello {userName}! I'm here to keep you company</p>
      </div>

      <div className="chat-container">
        <div className="chat-main">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <p>Start a conversation! I'm here to help.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {getMessageIcon(msg.role)}
                </div>
                <div className="message-content">
                  {msg.type && getTypeBadge(msg.type) && (
                    <div className={`message-type-badge ${getTypeBadge(msg.type).class}`}>
                      {getTypeBadge(msg.type).label}
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="quick-actions">
              {aiCompanionService.getQuickActions().map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
              />
              <button type="submit" className="send-btn" disabled={!inputValue.trim() || isTyping}>
                <FiSend /> Send
              </button>
            </form>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h3><FiAlertCircle /> Caregiver Alerts</h3>
            {caregiverAlerts.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No alerts</p>
            ) : (
              caregiverAlerts.map((alert, index) => (
                <div key={index} className={`alert-item alert-${alert.level}`}>
                  <div className="alert-time">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                  <div className="alert-reason">{alert.reason}</div>
                </div>
              ))
            )}
          </div>

          <div className="sidebar-card">
            <h3><FiHeart /> Conversation Stats</h3>
            <div className="stat-item">
              <span className="stat-label">Total Messages</span>
              <span className="stat-value">{messages.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Your Messages</span>
              <span className="stat-value">
                {messages.filter(m => m.role === 'user').length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Companion Replies</span>
              <span className="stat-value">
                {messages.filter(m => m.role === 'assistant').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
