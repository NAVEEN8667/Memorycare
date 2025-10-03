// src/services/faceRecognitionService.js
import * as faceapi from 'face-api.js';

class FaceRecognitionService {
  constructor() {
    this.isModelLoaded = false;
    this.labeledDescriptors = [];
    this.faceMatcher = null;
  }

  // Load face-api.js models
  async loadModels() {
    if (this.isModelLoaded) return;

    try {
      const MODEL_URL = '/models';
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);

      this.isModelLoaded = true;
      console.log('Face recognition models loaded successfully');
      return true;
    } catch (error) {
      console.error('Error loading face recognition models:', error);
      throw new Error('Failed to load face recognition models');
    }
  }

  // Detect faces in an image
  async detectFaces(imageElement, options = {}) {
    if (!this.isModelLoaded) {
      await this.loadModels();
    }

    const defaultOptions = {
      withLandmarks: true,
      withDescriptors: true,
      withExpressions: true,
    };

    const detectionOptions = { ...defaultOptions, ...options };

    try {
      const detections = await faceapi
        .detectAllFaces(imageElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions();

      return detections;
    } catch (error) {
      console.error('Error detecting faces:', error);
      return [];
    }
  }

  // Detect single face (optimized for recognition)
  async detectSingleFace(imageElement) {
    if (!this.isModelLoaded) {
      await this.loadModels();
    }

    try {
      const detection = await faceapi
        .detectSingleFace(imageElement, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();

      return detection;
    } catch (error) {
      console.error('Error detecting single face:', error);
      return null;
    }
  }

  // Create labeled face descriptor from images
  async createLabeledDescriptor(label, images) {
    const descriptions = [];

    for (const img of images) {
      const detection = await this.detectSingleFace(img);
      if (detection) {
        descriptions.push(detection.descriptor);
      }
    }

    if (descriptions.length === 0) {
      throw new Error(`No face detected for ${label}`);
    }

    return new faceapi.LabeledFaceDescriptors(label, descriptions);
  }

  // Load face database and create face matcher
  async loadFaceDatabase(faceDatabase) {
    try {
      this.labeledDescriptors = [];

      for (const person of faceDatabase) {
        const { name, images } = person;
        const labeledDescriptor = await this.createLabeledDescriptor(name, images);
        this.labeledDescriptors.push(labeledDescriptor);
      }

      // Create face matcher with threshold (lower = more strict)
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors, 0.6);
      
      console.log(`Face database loaded with ${this.labeledDescriptors.length} people`);
      return true;
    } catch (error) {
      console.error('Error loading face database:', error);
      throw error;
    }
  }

  // Recognize face from detection
  recognizeFace(faceDescriptor) {
    if (!this.faceMatcher) {
      throw new Error('Face database not loaded. Call loadFaceDatabase first.');
    }

    const bestMatch = this.faceMatcher.findBestMatch(faceDescriptor);
    
    return {
      label: bestMatch.label,
      distance: bestMatch.distance,
      confidence: Math.round((1 - bestMatch.distance) * 100),
      isMatch: bestMatch.label !== 'unknown',
    };
  }

  // Recognize faces in real-time from video
  async recognizeFacesInVideo(videoElement, canvas, onDetection) {
    if (!this.isModelLoaded) {
      await this.loadModels();
    }

    const displaySize = {
      width: videoElement.videoWidth,
      height: videoElement.videoHeight,
    };

    faceapi.matchDimensions(canvas, displaySize);

    const detect = async () => {
      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear canvas
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw detections
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      // Recognize faces if matcher is available
      if (this.faceMatcher && detections.length > 0) {
        const results = detections.map((detection) => {
          const recognition = this.recognizeFace(detection.descriptor);
          return {
            ...recognition,
            box: detection.detection.box,
            expressions: detection.expressions,
          };
        });

        // Draw recognition labels
        results.forEach((result) => {
          const { label, confidence, box } = result;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: `${label} (${confidence}%)`,
          });
          drawBox.draw(canvas);
        });

        if (onDetection) {
          onDetection(results);
        }
      }
    };

    // Return interval ID for cleanup
    return setInterval(detect, 100);
  }

  // Extract face descriptor from image for storage
  async extractFaceDescriptor(imageElement) {
    const detection = await this.detectSingleFace(imageElement);
    if (!detection) {
      throw new Error('No face detected in image');
    }
    return Array.from(detection.descriptor);
  }

  // Compare two face descriptors
  compareFaces(descriptor1, descriptor2) {
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    const similarity = Math.round((1 - distance) * 100);
    return {
      distance,
      similarity,
      isMatch: distance < 0.6, // Threshold for match
    };
  }

  // Get face age and gender estimation
  async getAgeAndGender(imageElement) {
    if (!this.isModelLoaded) {
      await this.loadModels();
    }

    try {
      const detection = await faceapi
        .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withAgeAndGender();

      if (detection) {
        return {
          age: Math.round(detection.age),
          gender: detection.gender,
          genderProbability: detection.genderProbability,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting age and gender:', error);
      return null;
    }
  }

  // Cleanup
  dispose() {
    this.labeledDescriptors = [];
    this.faceMatcher = null;
  }
}

// Export singleton instance
export const faceRecognitionService = new FaceRecognitionService();
export default faceRecognitionService;
