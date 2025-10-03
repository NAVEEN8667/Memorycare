# Face Recognition Models

This directory contains the pre-trained models required for face recognition.

## Required Models

The following models need to be downloaded from the face-api.js repository:

1. **tiny_face_detector_model** - Lightweight face detection
2. **face_landmark_68_model** - Facial landmark detection
3. **face_recognition_model** - Face recognition and descriptor extraction
4. **face_expression_model** - Facial expression recognition
5. **ssd_mobilenetv1_model** - Alternative face detection (more accurate)

## Download Instructions

### Option 1: Manual Download

Download the models from the official face-api.js repository:
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

Copy all model files to this directory (`public/models/`).

### Option 2: Using npm script

Run the following command from the project root:

```bash
npm run download-models
```

## Model Files Structure

After downloading, your directory should look like this:

```
public/models/
├── tiny_face_detector_model-shard1
├── tiny_face_detector_model-weights_manifest.json
├── face_landmark_68_model-shard1
├── face_landmark_68_model-weights_manifest.json
├── face_recognition_model-shard1
├── face_recognition_model-shard2
├── face_recognition_model-weights_manifest.json
├── face_expression_model-shard1
├── face_expression_model-weights_manifest.json
├── ssd_mobilenetv1_model-shard1
├── ssd_mobilenetv1_model-shard2
└── ssd_mobilenetv1_model-weights_manifest.json
```

## Model Sizes

- tiny_face_detector: ~200KB
- face_landmark_68: ~350KB
- face_recognition: ~6.2MB
- face_expression: ~310KB
- ssd_mobilenetv1: ~5.8MB

Total: ~13MB

## Notes

- Models are loaded once when the face recognition page is first accessed
- Models are cached in the browser for faster subsequent loads
- Ensure you have a stable internet connection for the initial load
