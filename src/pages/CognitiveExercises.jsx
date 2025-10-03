import { useState } from "react";
 // Assuming you have a CSS file for styling

const CognitiveExercises = () => {
  const [activeTab, setActiveTab] = useState("memory");

  return (
    <div className="cognitive-exercises-page">
      <center>
        <h1>Cognitive Exercises</h1>
      </center>
      <br></br>

      <div className="tabs">
        <button
          className={activeTab === "memory" ? "active" : ""}
          onClick={() => setActiveTab("memory")}
        >
          Memory Game
        </button>
        <button
          className={activeTab === "word" ? "active" : ""}
          onClick={() => setActiveTab("word")}
        >
          Word Recall
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "memory" && <MemoryGame />}
        {activeTab === "word" && <WordRecall />}
      </div>
    </div>
  );
};

export default CognitiveExercises;
