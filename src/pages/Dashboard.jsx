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
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 40px;
        background: #0f172a;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      @media (max-width: 768px) {
        .dashboard-page {
          padding: 32px 24px;
        }
      }

      .dashboard-page h1 {
        color: #f1f5f9;
        font-size: 2.75rem;
        font-weight: 700;
        margin-bottom: 16px;
        letter-spacing: -1px;
      }

      @media (max-width: 768px) {
        .dashboard-page h1 {
          font-size: 2.25rem;
        }
      }

      .subtitle {
        color: #cbd5e1;
        font-size: 1.1875rem;
        margin-bottom: 48px;
        line-height: 1.6;
      }

      .dash-section {
        background: #1e293b;
        border-radius: 16px;
        padding: 40px;
        margin-bottom: 36px;
        border: 2px solid #334155;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }

      @media (max-width: 768px) {
        .dash-section {
          padding: 28px;
          border-radius: 12px;
        }
      }

      .dash-section h2 {
        color: #f1f5f9;
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 28px;
        padding-bottom: 16px;
        border-bottom: 4px solid #4A90E2;
        letter-spacing: -0.5px;
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
