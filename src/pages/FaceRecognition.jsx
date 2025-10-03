// src/pages/FaceRecognition.jsx
import { useState, useEffect, useRef } from 'react';
import { FiCamera, FiUser, FiUserPlus, FiUsers, FiAlertCircle } from 'react-icons/fi';
import faceRecognitionService from '../services/faceRecognitionService';

const FaceRecognition = () => {
  const [activeTab, setActiveTab] = useState('recognize');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recognitionResults, setRecognitionResults] = useState([]);
  const [savedFaces, setSavedFaces] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonRelation, setNewPersonRelation] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'face-recognition-styles';
    styleElement.textContent = `
      .face-recognition-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 40px;
        background: #0f172a;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      @media (max-width: 768px) {
        .face-recognition-page {
          padding: 32px 24px;
        }
      }

      .face-recognition-page h1 {
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
        border-color: #4A90E2;
        color: #4A90E2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
      }

      .tabs button.active {
        background: #4A90E2;
        color: white;
        border-color: #4A90E2;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .content-card {
        background: #1e293b;
        border-radius: 16px;
        padding: 40px;
        border: 2px solid #334155;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }

      .video-container {
        position: relative;
        width: 100%;
        max-width: 640px;
        margin: 0 auto 24px;
        border-radius: 12px;
        overflow: hidden;
        background: #0f172a;
      }

      .video-container video {
        width: 100%;
        height: auto;
        display: block;
      }

      .video-container canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .controls {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 24px;
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
        background: #4A90E2;
        color: white;
        box-shadow: 0 4px 14px rgba(74, 144, 226, 0.35);
      }

      .btn-primary:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
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

      .btn-success {
        background: #50E3C2;
        color: white;
        box-shadow: 0 4px 14px rgba(80, 227, 194, 0.35);
      }

      .btn-success:hover {
        background: #3DCFB0;
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

      .alert-success {
        background: #E8F5E9;
        border: 2px solid #50E3C2;
        color: #1B5E20;
      }

      .alert-info {
        background: #E3F2FD;
        border: 2px solid #4A90E2;
        color: #0D47A1;
      }

      .results-container {
        margin-top: 32px;
      }

      .result-card {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        transition: all 0.3s;
      }

      .result-card:hover {
        border-color: #4A90E2;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
      }

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .result-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: #f1f5f9;
      }

      .confidence-badge {
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .confidence-high {
        background: #50E3C2;
        color: white;
      }

      .confidence-medium {
        background: #4A90E2;
        color: white;
      }

      .confidence-low {
        background: #F5A623;
        color: white;
      }

      .result-details {
        color: #cbd5e1;
        font-size: 1rem;
        line-height: 1.6;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        color: #f1f5f9;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 1rem;
      }

      .form-group input {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid #334155;
        border-radius: 10px;
        font-size: 1.0625rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #f1f5f9;
        background: #0f172a;
        transition: all 0.2s;
      }

      .form-group input:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .saved-faces-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 24px;
      }

      .face-card {
        background: #0f172a;
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        transition: all 0.3s;
      }

      .face-card:hover {
        border-color: #4A90E2;
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.2);
      }

      .face-card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .face-card-name {
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 4px;
      }

      .face-card-relation {
        font-size: 0.875rem;
        color: #94a3b8;
      }

      .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
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
      const existingStyle = document.getElementById('face-recognition-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      stopCamera();
    };
  }, []);

  // Load models on mount
  useEffect(() => {
    loadModels();
    loadSavedFaces();
  }, []);

  const loadModels = async () => {
    setIsLoading(true);
    setError('');
    try {
      await faceRecognitionService.loadModels();
      setIsModelLoaded(true);
    } catch (err) {
      setError('Failed to load face recognition models. Please refresh the page.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedFaces = () => {
    const saved = localStorage.getItem('savedFaces');
    if (saved) {
      setSavedFaces(JSON.parse(saved));
    }
  };

  const saveFacesToStorage = (faces) => {
    localStorage.setItem('savedFaces', JSON.stringify(faces));
    setSavedFaces(faces);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Failed to access camera. Please check permissions.');
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startRecognition = async () => {
    if (!isModelLoaded) {
      setError('Models are still loading. Please wait.');
      return;
    }

    await startCamera();
    
    // Load face database
    if (savedFaces.length > 0) {
      try {
        const faceDatabase = await Promise.all(
          savedFaces.map(async (face) => {
            const img = new Image();
            img.src = face.imageData;
            await new Promise(resolve => img.onload = resolve);
            return { name: face.name, images: [img] };
          })
        );
        
        await faceRecognitionService.loadFaceDatabase(faceDatabase);
      } catch (err) {
        console.error('Error loading face database:', err);
      }
    }

    // Start real-time recognition
    if (videoRef.current && canvasRef.current) {
      intervalRef.current = await faceRecognitionService.recognizeFacesInVideo(
        videoRef.current,
        canvasRef.current,
        (results) => {
          setRecognitionResults(results);
        }
      );
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !photoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    photoRef.current.src = imageData;
    photoRef.current.style.display = 'block';
    
    return imageData;
  };

  const saveNewFace = async () => {
    if (!newPersonName.trim()) {
      setError('Please enter a name');
      return;
    }

    const imageData = capturePhoto();
    if (!imageData) {
      setError('Please capture a photo first');
      return;
    }

    const newFace = {
      id: Date.now(),
      name: newPersonName,
      relation: newPersonRelation,
      imageData,
      createdAt: new Date().toISOString(),
    };

    const updatedFaces = [...savedFaces, newFace];
    saveFacesToStorage(updatedFaces);
    
    setNewPersonName('');
    setNewPersonRelation('');
    photoRef.current.style.display = 'none';
    setError('');
    alert(`${newPersonName} has been added successfully!`);
  };

  const deleteFace = (id) => {
    if (confirm('Are you sure you want to delete this person?')) {
      const updatedFaces = savedFaces.filter(face => face.id !== id);
      saveFacesToStorage(updatedFaces);
    }
  };

  return (
    <div className="face-recognition-page">
      <h1>🤖 AI Face Recognition</h1>
      <p className="subtitle">
        Recognize family members and caregivers using advanced AI technology
      </p>

      <div className="tabs">
        <button
          className={activeTab === 'recognize' ? 'active' : ''}
          onClick={() => {
            setActiveTab('recognize');
            stopCamera();
          }}
        >
          <FiCamera /> Recognize Faces
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => {
            setActiveTab('add');
            stopCamera();
          }}
        >
          <FiUserPlus /> Add New Person
        </button>
        <button
          className={activeTab === 'manage' ? 'active' : ''}
          onClick={() => {
            setActiveTab('manage');
            stopCamera();
          }}
        >
          <FiUsers /> Manage People
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <FiAlertCircle size={20} />
          {error}
        </div>
      )}

      {isLoading && (
        <div className="alert alert-info">
          <div className="loading-spinner"></div>
          Loading AI models...
        </div>
      )}

      <div className="content-card">
        {activeTab === 'recognize' && (
          <div>
            <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>Real-Time Face Recognition</h2>
            
            <div className="video-container">
              <video ref={videoRef} autoPlay muted playsInline />
              <canvas ref={canvasRef} />
            </div>

            <div className="controls">
              <button 
                className="btn btn-primary" 
                onClick={startRecognition}
                disabled={!isModelLoaded || isLoading}
              >
                <FiCamera /> Start Recognition
              </button>
              <button className="btn btn-secondary" onClick={stopCamera}>
                Stop Camera
              </button>
            </div>

            {recognitionResults.length > 0 && (
              <div className="results-container">
                <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Detected Faces:</h3>
                {recognitionResults.map((result, index) => (
                  <div key={index} className="result-card">
                    <div className="result-header">
                      <div className="result-name">
                        <FiUser style={{ display: 'inline', marginRight: '8px' }} />
                        {result.label}
                      </div>
                      <div className={`confidence-badge confidence-${
                        result.confidence > 70 ? 'high' : result.confidence > 50 ? 'medium' : 'low'
                      }`}>
                        {result.confidence}% Match
                      </div>
                    </div>
                    <div className="result-details">
                      Expression: {Object.entries(result.expressions || {})
                        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>Add New Person</h2>
            
            <div className="video-container">
              <video ref={videoRef} autoPlay muted playsInline />
              <img ref={photoRef} style={{ display: 'none', width: '100%' }} alt="Captured" />
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={startCamera}>
                <FiCamera /> Start Camera
              </button>
              <button className="btn btn-success" onClick={capturePhoto}>
                Capture Photo
              </button>
            </div>

            <div className="form-group">
              <label>Person's Name *</label>
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="e.g., John Smith"
              />
            </div>

            <div className="form-group">
              <label>Relationship</label>
              <input
                type="text"
                value={newPersonRelation}
                onChange={(e) => setNewPersonRelation(e.target.value)}
                placeholder="e.g., Son, Daughter, Caregiver"
              />
            </div>

            <button className="btn btn-success" onClick={saveNewFace}>
              <FiUserPlus /> Save Person
            </button>
          </div>
        )}

        {activeTab === 'manage' && (
          <div>
            <h2 style={{ color: '#f1f5f9', marginBottom: '24px' }}>
              Saved People ({savedFaces.length})
            </h2>
            
            {savedFaces.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FiUsers />
                </div>
                <div className="empty-state-text">
                  No people saved yet. Add someone using the "Add New Person" tab.
                </div>
              </div>
            ) : (
              <div className="saved-faces-grid">
                {savedFaces.map((face) => (
                  <div key={face.id} className="face-card">
                    <img src={face.imageData} alt={face.name} />
                    <div className="face-card-name">{face.name}</div>
                    <div className="face-card-relation">{face.relation || 'No relation'}</div>
                    <button
                      className="btn btn-secondary"
                      style={{ marginTop: '12px', width: '100%', fontSize: '0.875rem', padding: '8px' }}
                      onClick={() => deleteFace(face.id)}
                    >
                      Delete
                    </button>
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

export default FaceRecognition;
