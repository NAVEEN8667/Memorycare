import { useEffect } from "react";

const CognitiveExercises = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'cognitive-exercises-styles';
    styleElement.textContent = `
      .cognitive-exercises-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px;
        background: #F7F7F7;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .cognitive-exercises-page h1 {
        color: #333333;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;
      }

      .cognitive-exercises-page p {
        color: #666666;
        font-size: 1.125rem;
        text-align: center;
        margin-bottom: 40px;
      }

      .exercises-content {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 40px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        text-align: center;
      }

      .coming-soon {
        color: #666666;
        font-size: 1.125rem;
        margin-bottom: 24px;
      }

      .exercise-placeholder {
        background: linear-gradient(135deg, #4A90E2, #50E3C2);
        color: white;
        padding: 60px 40px;
        border-radius: 12px;
        margin-bottom: 24px;
      }

      .exercise-placeholder h2 {
        color: white;
        font-size: 2rem;
        margin-bottom: 16px;
      }

      .exercise-placeholder p {
        color: rgba(255, 255, 255, 0.95);
        font-size: 1.125rem;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('cognitive-exercises-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="cognitive-exercises-page">
      <h1>Cognitive Exercises</h1>
      <p>Brain training activities to keep your mind sharp</p>

      <div className="exercises-content">
        <div className="exercise-placeholder">
          <h2>🧠 Brain Training Coming Soon</h2>
          <p>We're developing engaging cognitive exercises designed specifically for elderly care.</p>
        </div>
        <p className="coming-soon">
          Check back soon for memory games, word puzzles, and other brain-stimulating activities!
        </p>
      </div>
    </div>
  );
};

export default CognitiveExercises;
