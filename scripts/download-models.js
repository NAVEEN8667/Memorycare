// scripts/download-models.js
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODELS_DIR = path.join(__dirname, '..', 'public', 'models');
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const models = [
  // Tiny Face Detector
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  
  // Face Landmark 68
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  
  // Face Recognition
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  'face_recognition_model-weights_manifest.json',
  
  // Face Expression
  'face_expression_model-shard1',
  'face_expression_model-weights_manifest.json',
  
  // SSD MobileNet V1
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
  'ssd_mobilenetv1_model-weights_manifest.json',
];

// Create models directory if it doesn't exist
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  console.log('✓ Created models directory');
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(destination, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

async function downloadModels() {
  console.log('🚀 Starting model download...\n');
  
  let downloaded = 0;
  let failed = 0;
  
  for (const model of models) {
    const url = `${BASE_URL}/${model}`;
    const destination = path.join(MODELS_DIR, model);
    
    // Skip if file already exists
    if (fs.existsSync(destination)) {
      console.log(`⏭️  Skipping ${model} (already exists)`);
      downloaded++;
      continue;
    }
    
    try {
      console.log(`⬇️  Downloading ${model}...`);
      await downloadFile(url, destination);
      console.log(`✓ Downloaded ${model}`);
      downloaded++;
    } catch (error) {
      console.error(`✗ Failed to download ${model}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✓ Downloaded: ${downloaded}/${models.length}`);
  console.log(`   ✗ Failed: ${failed}/${models.length}`);
  
  if (failed === 0) {
    console.log('\n✅ All models downloaded successfully!');
  } else {
    console.log('\n⚠️  Some models failed to download. Please try again or download manually.');
  }
}

downloadModels().catch(console.error);
