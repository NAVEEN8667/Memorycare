import { useEffect } from "react";
import TaskList from "../components/daily-tasks/TaskList";
import MedicationTracker from "../components/daily-tasks/MedicationTracker";
import RoutinePlanner from "../components/daily-tasks/RoutinePlanner";

export default function Dashboard() {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'dashboard-styles';
    styleElement.textContent = `
      .dashboard-page {
        max-width: 1400px;
        margin: 0 auto;
        padding: 40px;
        background: #F7F7F7;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .dashboard-page h1 {
        color: #333333;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 12px;
      }

      .subtitle {
        color: #666666;
        font-size: 1.125rem;
        margin-bottom: 40px;
      }

      .dash-section {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        margin-bottom: 32px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .dash-section h2 {
        color: #333333;
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #4A90E2;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('dashboard-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="subtitle">Overview of today's tasks and medications</p>

      <section className="dash-section">
        <h2>Tasks</h2>
        <TaskList />
      </section>

      <section className="dash-section">
        <h2>Medications</h2>
        <MedicationTracker />
      </section>

      <section className="dash-section">
        <h2>Routine</h2>
        <RoutinePlanner />
      </section>
    </div>
  );
}
