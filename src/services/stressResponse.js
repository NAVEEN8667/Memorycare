// Map stress level/mood to simple, actionable suggestions
export function getCalmingSuggestions({ mood = 'neutral', level = 0 } = {}) {
  if (mood === 'stressed' || level >= 60) {
    return [
      'Open Calm Mode and do 3 breathing cycles',
      'Sip some water',
      'Take a short seated stretch',
      'Call a family member or caregiver',
    ];
  }
  if (mood === 'calm' || level <= 20) {
    return [
      'Keep a steady routine',
      'Try a light memory game',
      'Take a short walk if safe',
    ];
  }
  return [
    'Take a deep breath',
    'Review today\'s routine',
    'Listen to a favorite song',
  ];
}
