import { useState, useEffect } from "react";
import "./wordrecall.css";

const WordRecall = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [gameStage, setGameStage] = useState("input"); // 'input', 'memorize', 'recall'
  const [recallWords, setRecallWords] = useState([]);
  const [score, setScore] = useState(0);

  const addWord = () => {
    if (currentWord.trim()) {
      setWords([...words, currentWord.trim()]);
      setCurrentWord("");
    }
  };

  const startGame = () => {
    if (words.length > 0) {
      setGameStage("memorize");
      setTimeout(() => {
        setGameStage("recall");
        setRecallWords([]);
      }, words.length * 2000); // 2 seconds per word
    }
  };

  const checkRecall = () => {
    const correct = words.filter((word) =>
      recallWords.includes(word.toLowerCase())
    ).length;
    setScore(Math.round((correct / words.length) * 100));
    setGameStage("results");
  };

  const restartGame = () => {
    setWords([]);
    setRecallWords([]);
    setGameStage("input");
    setScore(0);
  };

  return (
    <div className="word-recall">
      <h2>Word Recall Exercise</h2>
      <p>Test your memory by recalling words after seeing them</p>

      {gameStage === "input" && (
        <div className="input-stage">
          <div className="word-input">
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              placeholder="Enter a word to remember"
              onKeyPress={(e) => e.key === "Enter" && addWord()}
            />
            <button onClick={addWord} className="btn btn-primary">
              Add Word
            </button>
          </div>

          {words.length > 0 && (
            <>
              <div className="word-list">
                <h3>Words to Remember:</h3>
                <ul>
                  {words.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              </div>
              <button onClick={startGame} className="btn btn-primary start-btn">
                Start Exercise
              </button>
            </>
          )}
        </div>
      )}

      {gameStage === "memorize" && (
        <div className="memorize-stage">
          <h3>Memorize these words:</h3>
          <div className="word-display">
            {words.map((word, index) => (
              <div key={index} className="word-card">
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameStage === "recall" && (
        <div className="recall-stage">
          <h3>Enter the words you remember:</h3>
          <div className="recall-input">
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              placeholder="Type a word you remember"
              onKeyPress={(e) => {
                if (e.key === "Enter" && currentWord.trim()) {
                  setRecallWords([
                    ...recallWords,
                    currentWord.trim().toLowerCase(),
                  ]);
                  setCurrentWord("");
                }
              }}
            />
            <button
              onClick={() => {
                if (currentWord.trim()) {
                  setRecallWords([
                    ...recallWords,
                    currentWord.trim().toLowerCase(),
                  ]);
                  setCurrentWord("");
                }
              }}
              className="btn btn-primary"
            >
              Add Word
            </button>
          </div>

          <div className="recalled-words">
            <h4>Your recalled words:</h4>
            {recallWords.length > 0 ? (
              <ul>
                {recallWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            ) : (
              <p>No words recalled yet</p>
            )}
          </div>

          <button onClick={checkRecall} className="btn btn-primary">
            Check Answers
          </button>
        </div>
      )}

      {gameStage === "results" && (
        <div className="results-stage">
          <h3>Your Score: {score}%</h3>
          <div className="results-comparison">
            <div>
              <h4>Original Words:</h4>
              <ul>
                {words.map((word, index) => (
                  <li
                    key={index}
                    className={
                      recallWords.includes(word.toLowerCase())
                        ? "correct"
                        : "missed"
                    }
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Your Recalled Words:</h4>
              <ul>
                {recallWords.map((word, index) => (
                  <li
                    key={index}
                    className={
                      words.map((w) => w.toLowerCase()).includes(word)
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={restartGame} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WordRecall;
