// src/services/aiCompanionService.js

class AICompanionService {
  constructor() {
    this.conversationHistory = [];
    this.userName = 'Friend';
    this.companionName = 'Companion';
    this.apiKey = null;
  }

  // Initialize with API key (optional - can work without)
  initialize(apiKey, userName = 'Friend') {
    this.apiKey = apiKey;
    this.userName = userName;
    this.loadConversationHistory();
  }

  // Load conversation history from localStorage
  loadConversationHistory() {
    const saved = localStorage.getItem('companionConversation');
    if (saved) {
      this.conversationHistory = JSON.parse(saved);
    }
  }

  // Save conversation history
  saveConversationHistory() {
    localStorage.setItem('companionConversation', JSON.stringify(this.conversationHistory));
  }

  // Add message to conversation
  addMessage(role, content, metadata = {}) {
    const message = {
      role, // 'user' or 'assistant'
      content,
      timestamp: new Date().toISOString(),
      ...metadata,
    };
    this.conversationHistory.push(message);
    this.saveConversationHistory();
    return message;
  }

  // Generate AI response (with or without API)
  async generateResponse(userMessage, context = {}) {
    // Add user message to history
    this.addMessage('user', userMessage);

    // If API key is available, use AI service
    if (this.apiKey) {
      return await this.generateAIResponse(userMessage, context);
    } else {
      // Use rule-based responses
      return this.generateRuleBasedResponse(userMessage, context);
    }
  }

  // Generate AI response using API (OpenAI/Gemini compatible)
  async generateAIResponse(userMessage, context) {
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      
      // This is a placeholder for API integration
      // You can integrate with OpenAI, Google Gemini, or other AI services
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...this.conversationHistory.slice(-10).map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      this.addMessage('assistant', aiResponse);
      return { response: aiResponse, type: 'ai' };
    } catch (error) {
      console.error('AI API error:', error);
      // Fallback to rule-based
      return this.generateRuleBasedResponse(userMessage, context);
    }
  }

  // Build system prompt for AI
  buildSystemPrompt(context) {
    return `You are a caring AI companion for elderly people. Your role is to:
- Engage in friendly, warm conversations
- Provide medication reminders when needed
- Suggest uplifting music
- Share positive, encouraging stories
- Monitor for concerning statements and alert caregivers if needed
- Be patient, understanding, and supportive
- Use simple, clear language
- Show empathy and compassion

User's name: ${this.userName}
Current time: ${new Date().toLocaleString()}
${context.medications ? `Medications to remind: ${context.medications.join(', ')}` : ''}

Keep responses brief (2-3 sentences) and friendly.`;
  }

  // Rule-based response system (works without API)
  generateRuleBasedResponse(userMessage, context) {
    const message = userMessage.toLowerCase();
    let response = '';
    let type = 'chat';
    let action = null;

    // Greetings
    if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
      response = this.getRandomResponse([
        `Hello ${this.userName}! How are you feeling today?`,
        `Hi there! It's wonderful to see you. How can I help you today?`,
        `Good to hear from you! What would you like to talk about?`,
        `Hello! I'm here to keep you company. How's your day going?`,
      ]);
    }
    
    // How are you
    else if (this.matchesPattern(message, ['how are you', 'how do you do'])) {
      response = this.getRandomResponse([
        `I'm doing great, thank you for asking! More importantly, how are YOU feeling today?`,
        `I'm wonderful! But I'd love to know how you're doing.`,
        `I'm here and happy to chat with you! How about you?`,
      ]);
    }

    // Feeling responses
    else if (this.matchesPattern(message, ['i feel', 'i am', "i'm"])) {
      if (this.matchesPattern(message, ['good', 'great', 'fine', 'well', 'happy', 'wonderful'])) {
        response = this.getRandomResponse([
          `That's wonderful to hear! I'm so glad you're feeling good today!`,
          `I'm really happy to hear that! Keep that positive energy going!`,
          `That's fantastic! Your positive mood brightens my day too!`,
        ]);
      } else if (this.matchesPattern(message, ['sad', 'lonely', 'down', 'depressed', 'tired'])) {
        response = this.getRandomResponse([
          `I'm sorry you're feeling this way. Would you like to talk about it? I'm here to listen.`,
          `It's okay to feel down sometimes. Remember, this feeling will pass. Can I help cheer you up?`,
          `I understand. Would you like me to share a positive story or suggest some uplifting music?`,
        ]);
        action = 'alert_caregiver';
      } else if (this.matchesPattern(message, ['pain', 'hurt', 'sick', 'unwell'])) {
        response = `I'm concerned about you. Let me alert your caregiver right away. In the meantime, please rest and take it easy.`;
        action = 'urgent_alert';
      }
    }

    // Medication reminders
    else if (this.matchesPattern(message, ['medicine', 'medication', 'pills', 'tablet'])) {
      response = this.getMedicationReminder(context);
      type = 'reminder';
    }

    // Music suggestions
    else if (this.matchesPattern(message, ['music', 'song', 'listen', 'play'])) {
      response = this.getMusicSuggestion();
      type = 'music';
    }

    // Story requests
    else if (this.matchesPattern(message, ['story', 'tale', 'tell me'])) {
      response = this.getPositiveStory();
      type = 'story';
    }

    // Help/Assistance
    else if (this.matchesPattern(message, ['help', 'assist', 'need'])) {
      response = `I'm here to help! I can:
• Chat with you and keep you company
• Remind you about medications
• Suggest uplifting music
• Share positive stories
• Alert your caregiver if needed

What would you like?`;
      type = 'help';
    }

    // Time/Date
    else if (this.matchesPattern(message, ['time', 'date', 'day', 'what day'])) {
      const now = new Date();
      response = `It's ${now.toLocaleTimeString()} on ${now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}.`;
    }

    // Weather (simulated)
    else if (this.matchesPattern(message, ['weather', 'temperature', 'outside'])) {
      response = `I don't have real-time weather data, but I hope it's a beautiful day! Would you like to talk about your favorite weather or season?`;
    }

    // Family/Loved ones
    else if (this.matchesPattern(message, ['family', 'children', 'grandchildren', 'son', 'daughter'])) {
      response = this.getRandomResponse([
        `Family is so precious! Tell me about them - I'd love to hear your stories.`,
        `Your family must be wonderful. What's your favorite memory with them?`,
        `I bet they're thinking of you too. Would you like me to help you remember to call them?`,
      ]);
    }

    // Gratitude
    else if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate'])) {
      response = this.getRandomResponse([
        `You're very welcome! I'm always here for you.`,
        `My pleasure! That's what friends are for.`,
        `Anytime! I enjoy our conversations.`,
      ]);
    }

    // Goodbye
    else if (this.matchesPattern(message, ['bye', 'goodbye', 'see you', 'talk later'])) {
      response = this.getRandomResponse([
        `Goodbye! Take care and I'll be here whenever you need me.`,
        `See you soon! Remember, I'm always here if you want to chat.`,
        `Take care! Looking forward to our next conversation.`,
      ]);
    }

    // Default response
    else {
      response = this.getRandomResponse([
        `That's interesting! Tell me more about that.`,
        `I see. How does that make you feel?`,
        `I'm listening. Please go on.`,
        `That sounds important to you. Would you like to talk more about it?`,
        `I understand. What else is on your mind?`,
      ]);
    }

    this.addMessage('assistant', response, { type, action });
    return { response, type, action };
  }

  // Helper: Match patterns in message
  matchesPattern(message, patterns) {
    return patterns.some(pattern => message.includes(pattern));
  }

  // Helper: Get random response
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Get medication reminder
  getMedicationReminder(context) {
    const medications = context.medications || [];
    const currentHour = new Date().getHours();
    
    if (medications.length === 0) {
      return `I don't have any medication information stored. Would you like to add your medications to the tracker?`;
    }

    const reminders = [
      `Time for your medication! Please take: ${medications.join(', ')}. Don't forget to drink water!`,
      `Medication reminder: ${medications.join(', ')}. Have you taken them today?`,
      `It's important to take your medicine on time. Your medications: ${medications.join(', ')}.`,
    ];

    return this.getRandomResponse(reminders);
  }

  // Get music suggestion
  getMusicSuggestion() {
    const suggestions = [
      {
        genre: 'Classical',
        songs: ['Beethoven - Moonlight Sonata', 'Mozart - Eine Kleine Nachtmusik', 'Vivaldi - Four Seasons'],
        mood: 'calming and peaceful',
      },
      {
        genre: 'Jazz',
        songs: ['Louis Armstrong - What a Wonderful World', 'Ella Fitzgerald - Dream a Little Dream', 'Frank Sinatra - Fly Me to the Moon'],
        mood: 'smooth and relaxing',
      },
      {
        genre: 'Oldies',
        songs: ['The Beatles - Here Comes the Sun', 'Elvis Presley - Can\'t Help Falling in Love', 'Nat King Cole - Unforgettable'],
        mood: 'nostalgic and uplifting',
      },
      {
        genre: 'Nature Sounds',
        songs: ['Ocean Waves', 'Forest Birds', 'Gentle Rain'],
        mood: 'peaceful and meditative',
      },
    ];

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const song = suggestion.songs[Math.floor(Math.random() * suggestion.songs.length)];

    return `How about some ${suggestion.genre} music? It's ${suggestion.mood}. I recommend: "${song}". Would you like to hear it?`;
  }

  // Get positive story
  getPositiveStory() {
    const stories = [
      `Here's a heartwarming story: An elderly woman planted a tree every birthday. By age 90, she had created a beautiful forest where families now picnic. She said, "I may not see all these trees fully grown, but I know they'll bring joy to others." What a beautiful legacy!`,
      
      `Let me share this: A 95-year-old man learned to paint for the first time. His first exhibition was at age 97! He said, "It's never too late to discover your passion." His colorful paintings now hang in galleries worldwide. Isn't that inspiring?`,
      
      `Here's a lovely story: Two elderly neighbors who had never spoken became best friends at age 80. They discovered they both loved gardening and started a community garden together. Now they say they wish they'd met sooner, but they're grateful for every day they have now.`,
      
      `This one always makes me smile: An elderly gentleman started writing letters to his grandchildren, sharing life lessons and family stories. Those letters became a treasured family book that will be passed down for generations. Your stories matter too!`,
      
      `Here's something beautiful: A group of seniors started a "compliment club" where they write kind notes to strangers. They've sent over 10,000 notes! One recipient said it saved them on their darkest day. Small acts of kindness create ripples of joy.`,
    ];

    return this.getRandomResponse(stories);
  }

  // Check if message needs caregiver alert
  needsCaregiverAlert(message) {
    const urgentKeywords = ['pain', 'hurt', 'fall', 'fell', 'help', 'emergency', 'sick', 'dizzy', 'chest pain', 'can\'t breathe'];
    const concerningKeywords = ['sad', 'lonely', 'depressed', 'scared', 'confused', 'lost', 'alone'];
    
    const messageLower = message.toLowerCase();
    
    if (urgentKeywords.some(keyword => messageLower.includes(keyword))) {
      return { alert: true, level: 'urgent', reason: 'User expressed physical distress or emergency' };
    }
    
    if (concerningKeywords.some(keyword => messageLower.includes(keyword))) {
      return { alert: true, level: 'moderate', reason: 'User expressed emotional distress' };
    }
    
    return { alert: false };
  }

  // Send alert to caregiver
  async sendCaregiverAlert(alertData) {
    const alert = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      level: alertData.level,
      reason: alertData.reason,
      message: alertData.message,
      userName: this.userName,
      conversationContext: this.conversationHistory.slice(-5),
    };

    // Save to localStorage (in production, send to server/notification service)
    const alerts = JSON.parse(localStorage.getItem('caregiverAlerts') || '[]');
    alerts.unshift(alert);
    localStorage.setItem('caregiverAlerts', JSON.stringify(alerts));

    // In production, you would send this to a server or notification service
    console.log('Caregiver Alert Sent:', alert);

    return alert;
  }

  // Get conversation summary
  getConversationSummary() {
    const totalMessages = this.conversationHistory.length;
    const userMessages = this.conversationHistory.filter(m => m.role === 'user').length;
    const assistantMessages = this.conversationHistory.filter(m => m.role === 'assistant').length;
    
    return {
      totalMessages,
      userMessages,
      assistantMessages,
      lastConversation: this.conversationHistory[this.conversationHistory.length - 1]?.timestamp,
    };
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
    localStorage.removeItem('companionConversation');
  }

  // Get quick action suggestions
  getQuickActions() {
    return [
      { label: 'How are you?', icon: '😊', action: 'greeting' },
      { label: 'Medication reminder', icon: '💊', action: 'medication' },
      { label: 'Suggest music', icon: '🎵', action: 'music' },
      { label: 'Tell me a story', icon: '📖', action: 'story' },
      { label: 'What time is it?', icon: '🕐', action: 'time' },
      { label: 'I need help', icon: '🆘', action: 'help' },
    ];
  }
}

// Export singleton instance
export const aiCompanionService = new AICompanionService();
export default aiCompanionService;
