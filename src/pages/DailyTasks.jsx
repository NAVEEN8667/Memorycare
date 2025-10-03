import { useState, useEffect } from "react";
import TaskList from "../components/daily-tasks/TaskList";
import MedicationTracker from "../components/daily-tasks/MedicationTracker";
import RoutinePlanner from "../components/daily-tasks/RoutinePlanner";

const DailyTasks = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'daily-tasks-styles';
    styleElement.textContent = `
      .daily-tasks-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px;
        background: #F7F7F7;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .daily-tasks-page h1 {
        color: #333333;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 32px;
        text-align: center;
      }

      .tabs {
        display: flex;
        gap: 12px;
        margin-bottom: 32px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .tabs button {
        padding: 14px 32px;
        border: 2px solid #E0E0E0;
        background: #FFFFFF;
        color: #666666;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
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

      .tab-content {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('daily-tasks-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="daily-tasks-page">
      <h1>Daily Tasks Support</h1>

      <div className="tabs">
        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          Task List
        </button>
        <button
          className={activeTab === "medication" ? "active" : ""}
          onClick={() => setActiveTab("medication")}
        >
          Medication
        </button>
        <button
          className={activeTab === "routine" ? "active" : ""}
          onClick={() => setActiveTab("routine")}
        >
          Routine
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "tasks" && <TaskList />}
        {activeTab === "medication" && <MedicationTracker />}
        {activeTab === "routine" && <RoutinePlanner />}
      </div>
    </div>
  );
};

export default DailyTasks;
