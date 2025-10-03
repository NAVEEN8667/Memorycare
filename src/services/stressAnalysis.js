// Simple stress analysis heuristic
// Accepts interaction logs and returns { level: 0-100, mood: 'calm'|'neutral'|'stressed' }
export function analyzeStress({ recentInteractions = [], heartRate = null } = {}) {
  let score = 0;

  // Interaction-based scoring
  recentInteractions.forEach((it) => {
    if (!it) return;
    if (/help|confused|anxious|panic|scared/i.test(it.text || '')) score += 15;
    if (it.type === 'error') score += 10;
    if (it.type === 'alert') score += 8;
  });

  // Heart rate heuristic
  if (typeof heartRate === 'number') {
    if (heartRate > 100) score += 20;
    else if (heartRate > 90) score += 10;
  }

  score = Math.max(0, Math.min(100, score));

  let mood = 'neutral';
  if (score >= 60) mood = 'stressed';
  else if (score <= 20) mood = 'calm';

  return { level: score, mood };
}
