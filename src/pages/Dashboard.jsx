import TaskList from "../components/daily-tasks/TaskList";
import MedicationTracker from "../components/daily-tasks/MedicationTracker";
import RoutinePlanner from "../components/daily-tasks/RoutinePlanner";

export default function Dashboard() {
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
