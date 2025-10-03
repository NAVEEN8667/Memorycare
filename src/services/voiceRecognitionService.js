// src/services/voiceRecognitionService.js

class VoiceRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioContext = null;
    this.analyser = null;
  }

  // Initialize Web Speech API
  initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported in this browser');
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    
    return this.recognition;
  }

  // Start speech recognition
  async startSpeechRecognition(onResult, onError) {
    if (!this.recognition) {
      this.initializeSpeechRecognition();
    }

    this.recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const transcript = results
        .map(result => result[0].transcript)
        .join(' ');
      
      const isFinal = results[results.length - 1].isFinal;
      const confidence = results[results.length - 1][0].confidence;

      if (onResult) {
        onResult({
          transcript,
          isFinal,
          confidence: Math.round(confidence * 100),
        });
      }
    };

    this.recognition.onerror = (event) => {
      if (onError) {
        onError(event.error);
      }
    };

    this.recognition.start();
    this.isListening = true;
  }

  // Stop speech recognition
  stopSpeechRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Start audio recording
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      
      // Initialize audio analysis
      this.initializeAudioAnalysis(stream);
      
      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  // Stop audio recording
  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Stop all tracks
        if (this.mediaRecorder.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        resolve({ audioBlob, audioUrl });
      };

      this.mediaRecorder.stop();
    });
  }

  // Initialize audio analysis for emotion detection
  initializeAudioAnalysis(stream) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = this.audioContext.createMediaStreamSource(stream);
    this.analyser = this.audioContext.createAnalyser();
    
    this.analyser.fftSize = 2048;
    source.connect(this.analyser);
  }

  // Analyze audio features for emotion detection
  analyzeAudioFeatures() {
    if (!this.analyser) return null;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // Calculate audio features
    const features = {
      volume: this.calculateVolume(dataArray),
      pitch: this.calculatePitch(dataArray),
      energy: this.calculateEnergy(dataArray),
      spectralCentroid: this.calculateSpectralCentroid(dataArray),
    };

    return features;
  }

  // Calculate volume (amplitude)
  calculateVolume(dataArray) {
    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    return sum / dataArray.length;
  }

  // Estimate pitch
  calculatePitch(dataArray) {
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i];
        maxIndex = i;
      }
    }
    
    const sampleRate = this.audioContext?.sampleRate || 44100;
    const pitch = (maxIndex * sampleRate) / (2 * dataArray.length);
    return pitch;
  }

  // Calculate energy
  calculateEnergy(dataArray) {
    const sum = dataArray.reduce((acc, val) => acc + (val * val), 0);
    return Math.sqrt(sum / dataArray.length);
  }

  // Calculate spectral centroid
  calculateSpectralCentroid(dataArray) {
    let weightedSum = 0;
    let sum = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      weightedSum += i * dataArray[i];
      sum += dataArray[i];
    }
    
    return sum > 0 ? weightedSum / sum : 0;
  }

  // Detect emotion from audio features
  detectEmotion(features) {
    if (!features) return { emotion: 'neutral', confidence: 0 };

    const { volume, pitch, energy, spectralCentroid } = features;

    // Simple rule-based emotion detection
    // In production, use ML models for better accuracy
    
    let emotion = 'neutral';
    let confidence = 50;

    // High energy + high pitch = excited/happy
    if (energy > 100 && pitch > 200) {
      emotion = 'happy';
      confidence = 75;
    }
    // Low energy + low pitch = sad/tired
    else if (energy < 50 && pitch < 150) {
      emotion = 'sad';
      confidence = 70;
    }
    // High volume + high energy = angry/stressed
    else if (volume > 120 && energy > 120) {
      emotion = 'stressed';
      confidence = 65;
    }
    // Low volume = calm/peaceful
    else if (volume < 60) {
      emotion = 'calm';
      confidence = 60;
    }
    // Medium values = neutral
    else {
      emotion = 'neutral';
      confidence = 55;
    }

    return { emotion, confidence, features };
  }

  // Analyze speech patterns for elderly care
  analyzeSpeechPatterns(transcript) {
    const words = transcript.toLowerCase().split(/\s+/);
    const wordCount = words.length;
    const uniqueWords = new Set(words).size;
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount;

    // Detect concerning patterns
    const concerningWords = ['pain', 'hurt', 'help', 'confused', 'lost', 'scared', 'alone'];
    const positiveWords = ['good', 'happy', 'fine', 'well', 'great', 'wonderful'];
    
    const concernCount = words.filter(word => concerningWords.includes(word)).length;
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;

    // Calculate sentiment
    let sentiment = 'neutral';
    if (positiveCount > concernCount) {
      sentiment = 'positive';
    } else if (concernCount > positiveCount) {
      sentiment = 'concerning';
    }

    return {
      wordCount,
      uniqueWords,
      avgWordLength: avgWordLength.toFixed(2),
      vocabulary: (uniqueWords / wordCount * 100).toFixed(1),
      sentiment,
      concernCount,
      positiveCount,
      clarity: wordCount > 0 ? 'good' : 'poor',
    };
  }

  // Convert audio blob to base64 for storage
  async audioToBase64(audioBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(audioBlob);
    });
  }

  // Get audio duration
  async getAudioDuration(audioBlob) {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(audioBlob);
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
      };
    });
  }

  // Cleanup
  cleanup() {
    this.stopSpeechRecognition();
    
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.audioChunks = [];
  }
}

// Export singleton instance
export const voiceRecognitionService = new VoiceRecognitionService();
export default voiceRecognitionService;
