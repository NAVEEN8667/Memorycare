import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMusic, FiBook, FiBell, FiHeart, FiAlertCircle } from 'react-icons/fi';
import aiCompanionService from '../services/aiCompanionService';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('Friend');
  const [showNameInput, setShowNameInput] = useState(true);
  const [caregiverAlerts, setCaregiverAlerts] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'chatbot-styles';
    styleElement.textContent = `
      .chatbot-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .chatbot-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
        color: white;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .chatbot-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 24px rgba(74, 144, 226, 0.5);
      }

      .chatbot-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 400px;
        height: 600px;
        background: #FFFFFF;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        border: 2px solid #E0E0E0;
        overflow: hidden;
      }

      .chatbot-header {
        background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .close-button {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.8rem;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
      }

      .close-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #F7F7F7;
      }

      .message {
        margin-bottom: 16px;
        display: flex;
      }

      .message.user {
        justify-content: flex-end;
      }

      .message.bot {
        justify-content: flex-start;
      }

      .message-content {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .message.user .message-content {
        background: #4A90E2;
        color: white;
      }

      .message.bot .message-content {
        background: #FFFFFF;
        color: #333333;
        border: 2px solid #E0E0E0;
      }

      .message-content p {
        margin: 0 0 4px 0;
        font-size: 1rem;
        line-height: 1.5;
      }

      .message-time {
        font-size: 0.75rem;
        opacity: 0.7;
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 8px 0;
      }

      .typing-indicator span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4A90E2;
        animation: typing 1.4s infinite;
      }

      .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-10px);
        }
      }

      .quick-questions {
        padding: 12px 16px;
        background: #FFFFFF;
        border-top: 2px solid #E0E0E0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .quick-question {
        padding: 8px 14px;
        background: #F7F7F7;
        border: 2px solid #E0E0E0;
        border-radius: 20px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
        color: #666666;
        font-weight: 600;
      }

      .quick-question:hover {
        background: #4A90E2;
        color: white;
        border-color: #4A90E2;
      }

      .chatbot-input {
        display: flex;
        gap: 8px;
        padding: 16px;
        background: #FFFFFF;
        border-top: 2px solid #E0E0E0;
      }

      .chatbot-input input {
        flex: 1;
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .chatbot-input input:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .chatbot-input button {
        padding: 12px 24px;
        background: #4A90E2;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .chatbot-input button:hover:not(:disabled) {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }

      .chatbot-input button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('chatbot-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = {
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send message to your Python backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: data.response,
        time: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        time: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Predefined questions for easy access
  const quickQuestions = [
    "What day is it today?",
    "Where am I?",
    "What time is it?",
    "Who are you?",
    "Help me remember something"
  ];

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {/* Chatbot toggle button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Memory Helper Chat</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender}`}
              >
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions buttons */}
          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question"
                onClick={() => setInputValue(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Message input form */}
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              aria-label="Type your message"
            />
            <button type="submit" disabled={!inputValue.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;