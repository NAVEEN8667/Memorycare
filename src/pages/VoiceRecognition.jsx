// src/pages/VoiceRecognition.jsx
import { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff, FiPlay, FiSave, FiTrash2, FiActivity, FiMessageCircle } from 'react-icons/fi';
import voiceRecognitionService from '../services/voiceRecognitionService';

const VoiceRecognition = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [speechAnalysis, setSpeechAnalysis] = useState(null);
  
  const animationFrameRef = useRef(null);
  const durationIntervalRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'voice-recognition-styles';
    styleElement.textContent = `
      .voice-recognition-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 40px;
        background: #0f172a;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      @media (max-width: 768px) {
        .voice-recognition-page {
          padding: 32px 24px;
        }
      }

      .voice-recognition-page h1 {
        color: #f1f5f9;
        font-size: 2.75rem;
        font-weight: 700;
        margin-bottom: 16px;
        text-align: center;
        letter-spacing: -1px;
      }

      .subtitle {
        color: #cbd5e1;
        font-size: 1.1875rem;
        margin-bottom: 40px;
        text-align: center;
        line-height: 1.6;
      }

      .tabs {
        display: flex;
        gap: 14px;
        margin-bottom: 36px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .tabs button {
        padding: 16px 36px;
        border: 2px solid #334155;
        background: #1e293b;
        color: #cbd5e1;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .tabs button:hover {
        border-color: #50E3C2;
        color: #50E3C2;
        transform: translateY(-2px);
      }

      .tabs button.active {
        background: #50E3C2;
        color: white;
        border-color: #50E3C2;
        box-shadow: 0 4px 12px rgba(80, 227, 194, 0.3);
      }

      .content-card {
        background: #1e293b;
        border-radius: 16px;
        padding: 40px;
        border: 2px solid #334155;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }

      .recording-container {
        text-align: center;
        padding: 40px 20px;
      }

      .mic-button {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #50E3C2 0%, #4A90E2 100%);
        color: white;
        font-size: 4rem;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 8px 24px rgba(80, 227, 194, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 32px;
      }

      .mic-button:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 32px rgba(80, 227, 194, 0.5);
      }

      .mic-button.recording {
        background: linear-gradient(135deg, #F5A623 0%, #E74C3C 100%);
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 8px 24px rgba(245, 166, 35, 0.4);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(245, 166, 35, 0.6);
        }
      }

      .recording-status {
        font-size: 1.5rem;
        color: #f1f5f9;
        margin-bottom: 16px;
        font-weight: 600;
      }

      .recording-duration {
        font-size: 2rem;
        color: #50E3C2;
        font-weight: 700;
        margin-bottom: 24px;
        font-family: 'Courier New', monospace;
      }

      .transcript-box {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 24px;
        margin: 24px 0;
        min-height: 150px;
        max-height: 300px;
        overflow-y: auto;
      }

      .transcript-text {
        color: #f1f5f9;
        font-size: 1.125rem;
        line-height: 1.8;
        white-space: pre-wrap;
      }

      .transcript-text.interim {
        color: #94a3b8;
        font-style: italic;
      }

      .emotion-display {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin: 24px 0;
      }

      .emotion-card {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s;
      }

      .emotion-card:hover {
        border-color: #50E3C2;
        transform: translateY(-4px);
      }

      .emotion-icon {
        font-size: 3rem;
        margin-bottom: 12px;
      }

      .emotion-label {
        font-size: 1.125rem;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 8px;
        text-transform: capitalize;
      }

      .emotion-confidence {
        font-size: 0.9375rem;
        color: #94a3b8;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
        margin: 24px 0;
      }

      .feature-item {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
      }

      .feature-label {
        font-size: 0.875rem;
        color: #94a3b8;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .feature-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #50E3C2;
      }

      .controls {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        margin: 24px 0;
      }

      .btn {
        padding: 14px 28px;
        border: none;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .btn-primary {
        background: #50E3C2;
        color: white;
        box-shadow: 0 4px 14px rgba(80, 227, 194, 0.35);
      }

      .btn-primary:hover {
        background: #3DCFB0;
        transform: translateY(-2px);
      }

      .btn-danger {
        background: #E74C3C;
        color: white;
        box-shadow: 0 4px 14px rgba(231, 76, 60, 0.35);
      }

      .btn-danger:hover {
        background: #C0392B;
        transform: translateY(-2px);
      }

      .btn-secondary {
        background: #334155;
        color: #f1f5f9;
        border: 2px solid #475569;
      }

      .btn-secondary:hover {
        background: #475569;
        transform: translateY(-2px);
      }

      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .alert {
        padding: 16px 20px;
        border-radius: 10px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
      }

      .alert-error {
        background: #FFF3E0;
        border: 2px solid #F5A623;
        color: #8B5A00;
      }

      .alert-info {
        background: #E3F2FD;
        border: 2px solid #4A90E2;
        color: #0D47A1;
      }

      .recordings-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .recording-item {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s;
      }

      .recording-item:hover {
        border-color: #50E3C2;
        box-shadow: 0 4px 12px rgba(80, 227, 194, 0.2);
      }

      .recording-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .recording-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #f1f5f9;
      }

      .recording-date {
        font-size: 0.875rem;
        color: #94a3b8;
      }

      .recording-emotion {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .emotion-happy {
        background: #50E3C2;
        color: white;
      }

      .emotion-sad {
        background: #4A90E2;
        color: white;
      }

      .emotion-stressed {
        background: #F5A623;
        color: white;
      }

      .emotion-calm {
        background: #9B59B6;
        color: white;
      }

      .emotion-neutral {
        background: #95A5A6;
        color: white;
      }

      .recording-transcript {
        color: #cbd5e1;
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 16px;
        max-height: 100px;
        overflow-y: auto;
      }

      .recording-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .analysis-section {
        margin-top: 32px;
        padding-top: 32px;
        border-top: 2px solid #334155;
      }

      .analysis-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #f1f5f9;
        margin-bottom: 20px;
      }

      .analysis-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .analysis-item {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 10px;
        padding: 16px;
      }

      .analysis-label {
        font-size: 0.875rem;
        color: #94a3b8;
        margin-bottom: 8px;
      }

      .analysis-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: #50E3C2;
      }

      .sentiment-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-left: 8px;
      }

      .sentiment-positive {
        background: #50E3C2;
        color: white;
      }

      .sentiment-concerning {
        background: #F5A623;
        color: white;
      }

      .sentiment-neutral {
        background: #95A5A6;
        color: white;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #cbd5e1;
      }

      .empty-state-icon {
        font-size: 4rem;
        color: #334155;
        margin-bottom: 16px;
      }

      .empty-state-text {
        font-size: 1.125rem;
        margin-bottom: 24px;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('voice-recognition-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      voiceRecognitionService.cleanup();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = () => {
    const saved = localStorage.getItem('voiceRecordings');
    if (saved) {
      setRecordings(JSON.parse(saved));
    }
  };

  const saveRecordings = (newRecordings) => {
    localStorage.setItem('voiceRecordings', JSON.stringify(newRecordings));
    setRecordings(newRecordings);
  };

  const startRecording = async () => {
    try {
      setError('');
      await voiceRecognitionService.startRecording();
      setIsRecording(true);
      setRecordingDuration(0);
      setTranscript('');
      setCurrentEmotion(null);
      setSpeechAnalysis(null);

      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      // Start speech recognition
      voiceRecognitionService.startSpeechRecognition(
        (result) => {
          setTranscript(result.transcript);
          if (result.isFinal) {
            const analysis = voiceRecognitionService.analyzeSpeechPatterns(result.transcript);
            setSpeechAnalysis(analysis);
          }
        },
        (error) => {
          console.error('Speech recognition error:', error);
        }
      );

      // Start emotion detection
      analyzeEmotion();
    } catch (err) {
      setError('Failed to start recording. Please check microphone permissions.');
      console.error(err);
    }
  };

  const analyzeEmotion = () => {
    const analyze = () => {
      const features = voiceRecognitionService.analyzeAudioFeatures();
      if (features) {
        setAudioFeatures(features);
        const emotionResult = voiceRecognitionService.detectEmotion(features);
        setCurrentEmotion(emotionResult);
      }
      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    analyze();
  };

  const stopRecording = async () => {
    try {
      const result = await voiceRecognitionService.stopRecording();
      voiceRecognitionService.stopSpeechRecognition();
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }

      setIsRecording(false);

      if (result && transcript) {
        await saveRecording(result, transcript);
      }
    } catch (err) {
      setError('Failed to stop recording.');
      console.error(err);
    }
  };

  const saveRecording = async (audioData, text) => {
    const audioBase64 = await voiceRecognitionService.audioToBase64(audioData.audioBlob);
    const duration = await voiceRecognitionService.getAudioDuration(audioData.audioBlob);

    const newRecording = {
      id: Date.now(),
      audioData: audioBase64,
      transcript: text,
      emotion: currentEmotion?.emotion || 'neutral',
      emotionConfidence: currentEmotion?.confidence || 0,
      features: audioFeatures,
      analysis: speechAnalysis,
      duration: Math.round(duration),
      createdAt: new Date().toISOString(),
    };

    const updatedRecordings = [newRecording, ...recordings];
    saveRecordings(updatedRecordings);
    
    alert('Recording saved successfully!');
  };

  const deleteRecording = (id) => {
    if (confirm('Are you sure you want to delete this recording?')) {
      const updatedRecordings = recordings.filter(rec => rec.id !== id);
      saveRecordings(updatedRecordings);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      stressed: '😰',
      calm: '😌',
      neutral: '😐',
    };
    return emojis[emotion] || '😐';
  };

  return (
    <div className="voice-recognition-page">
      <h1>🎙️ Voice Recognition & Emotion Detection</h1>
      <p className="subtitle">
        Analyze voice patterns and detect emotions for elderly care monitoring
      </p>

      <div className="tabs">
        <button
          className={activeTab === 'record' ? 'active' : ''}
          onClick={() => setActiveTab('record')}
        >
          <FiMic /> Record & Analyze
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          <FiActivity /> Recording History
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="content-card">
        {activeTab === 'record' && (
          <div>
            <div className="recording-container">
              <button
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <FiMicOff /> : <FiMic />}
              </button>

              <div className="recording-status">
                {isRecording ? 'Recording...' : 'Click to Start Recording'}
              </div>

              {isRecording && (
                <div className="recording-duration">
                  {formatDuration(recordingDuration)}
                </div>
              )}
            </div>

            {transcript && (
              <div className="transcript-box">
                <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>
                  <FiMessageCircle style={{ display: 'inline', marginRight: '8px' }} />
                  Transcript
                </h3>
                <div className="transcript-text">{transcript}</div>
              </div>
            )}

            {currentEmotion && (
              <div>
                <h3 style={{ color: '#f1f5f9', marginBottom: '20px', marginTop: '32px' }}>
                  Detected Emotion
                </h3>
                <div className="emotion-display">
                  <div className="emotion-card">
                    <div className="emotion-icon">
                      {getEmotionEmoji(currentEmotion.emotion)}
                    </div>
                    <div className="emotion-label">{currentEmotion.emotion}</div>
                    <div className="emotion-confidence">
                      {currentEmotion.confidence}% Confidence
                    </div>
                  </div>
                </div>
              </div>
            )}

            {audioFeatures && (
              <div>
                <h3 style={{ color: '#f1f5f9', marginBottom: '20px', marginTop: '32px' }}>
                  Audio Features
                </h3>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-label">Volume</div>
                    <div className="feature-value">{Math.round(audioFeatures.volume)}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-label">Pitch</div>
                    <div className="feature-value">{Math.round(audioFeatures.pitch)} Hz</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-label">Energy</div>
                    <div className="feature-value">{Math.round(audioFeatures.energy)}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-label">Spectral</div>
                    <div className="feature-value">{Math.round(audioFeatures.spectralCentroid)}</div>
                  </div>
                </div>
              </div>
            )}

            {speechAnalysis && (
              <div className="analysis-section">
                <h3 className="analysis-title">Speech Analysis</h3>
                <div className="analysis-grid">
                  <div className="analysis-item">
                    <div className="analysis-label">Word Count</div>
                    <div className="analysis-value">{speechAnalysis.wordCount}</div>
                  </div>
                  <div className="analysis-item">
                    <div className="analysis-label">Unique Words</div>
                    <div className="analysis-value">{speechAnalysis.uniqueWords}</div>
                  </div>
                  <div className="analysis-item">
                    <div className="analysis-label">Vocabulary</div>
                    <div className="analysis-value">{speechAnalysis.vocabulary}%</div>
                  </div>
                  <div className="analysis-item">
                    <div className="analysis-label">Sentiment</div>
                    <div className="analysis-value">
                      <span className={`sentiment-badge sentiment-${speechAnalysis.sentiment}`}>
                        {speechAnalysis.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>
              Recording History ({recordings.length})
            </h2>

            {recordings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FiMic />
                </div>
                <div className="empty-state-text">
                  No recordings yet. Start recording to analyze voice and emotions.
                </div>
              </div>
            ) : (
              <div className="recordings-list">
                {recordings.map((recording) => (
                  <div key={recording.id} className="recording-item">
                    <div className="recording-header">
                      <div>
                        <div className="recording-title">
                          {getEmotionEmoji(recording.emotion)} Recording
                        </div>
                        <div className="recording-date">
                          {new Date(recording.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className={`recording-emotion emotion-${recording.emotion}`}>
                          {recording.emotion} ({recording.emotionConfidence}%)
                        </span>
                      </div>
                    </div>

                    <div className="recording-transcript">
                      "{recording.transcript}"
                    </div>

                    {recording.analysis && (
                      <div style={{ marginBottom: '16px', fontSize: '0.875rem', color: '#94a3b8' }}>
                        Words: {recording.analysis.wordCount} | 
                        Sentiment: <span className={`sentiment-badge sentiment-${recording.analysis.sentiment}`}>
                          {recording.analysis.sentiment}
                        </span>
                      </div>
                    )}

                    <div className="recording-actions">
                      <audio controls src={recording.audioData} style={{ maxWidth: '100%' }} />
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteRecording(recording.id)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecognition;
