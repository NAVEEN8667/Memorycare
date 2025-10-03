import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiBell, FiTrash2, FiX } from "react-icons/fi";
import "./reminderlist.css";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setError("");
        const res = await axios.get("http://localhost:5000/api/reminders");
        setReminders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setError("Could not load reminders. Please make sure the server is running.");
      }
    };

    fetchReminders();
  }, []);

  const addReminder = async () => {
    if (!newReminder.trim() || !newTime) {
      setError("Please enter reminder text and time.");
      return;
    }
    try {
      setError("");
      const res = await axios.post("http://localhost:5000/api/reminders", {
        text: newReminder.trim(),
        time: newTime,
      });
      setReminders([res.data, ...reminders]);
      setNewReminder("");
      setNewTime("");
    } catch (err) {
      console.error("Error adding reminder:", err);
      setError("Failed to add reminder. Please try again.");
    }
  };

  const toggleReminder = async (id, currentStatus) => {
    try {
      setError("");
      const res = await axios.patch(
        `http://localhost:5000/api/reminders/${id}`,
        {
          active: !currentStatus,
        }
      );
      setReminders(
        reminders.map((reminder) => (reminder._id === id ? res.data : reminder))
      );
    } catch (err) {
      console.error("Error toggling reminder:", err);
      setError("Failed to update reminder. Please try again.");
    }
  };

  const deleteReminder = async (id) => {
    try {
      setError("");
      await axios.delete(`http://localhost:5000/api/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder._id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
      setError("Failed to delete reminder. Please try again.");
    }
  };

  return (
    <div className="reminder-list">
      <h2>Reminders (Elderly Care)</h2>
      <p>Set simple time-based alerts for daily needs</p>

      {error && (
        <div className="error-message" role="status" aria-live="polite">
          <span>{error}</span>
          <button className="dismiss-btn" onClick={() => setError("")} aria-label="Dismiss message">
            <FiX />
          </button>
        </div>
      )}

      <div className="add-reminder">
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Reminder text..."
          aria-label="Reminder text"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          aria-label="Reminder time"
        />
        <button onClick={addReminder} className="btn btn-primary" aria-label="Add reminder">
          <FiPlus /> Add
        </button>
      </div>

      <ul className="reminders">
        {reminders
          .slice()
          .sort((a, b) => String(a.time).localeCompare(String(b.time)))
          .map((reminder) => (
          <li
            key={reminder._id}
            className={reminder.active ? "active" : "inactive"}
          >
            <div className="reminder-info">
              <FiBell className="bell-icon" />
              <div>
                <span className="reminder-time">{reminder.time}</span>
                <span className="reminder-text">{reminder.text}</span>
              </div>
            </div>
            <div className="reminder-actions">
              <button
                onClick={() => toggleReminder(reminder._id, reminder.active)}
                className="toggle-btn"
                aria-label={reminder.active ? "Disable reminder" : "Enable reminder"}
              >
                {reminder.active ? "Disable" : "Enable"}
              </button>
              <button
                onClick={() => deleteReminder(reminder._id)}
                className="delete-btn"
                aria-label="Delete reminder"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReminderList;
