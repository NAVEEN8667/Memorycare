import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiBell, FiTrash2, FiX } from "react-icons/fi";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'reminder-list-styles';
    styleElement.textContent = `
      .reminder-list {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .reminder-list h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .reminder-list p {
        color: #666666;
        font-size: 1.0625rem;
        margin-bottom: 24px;
      }

      .error-message {
        background: #FFF3E0;
        border: 2px solid #F5A623;
        color: #8B5A00;
        padding: 14px 18px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(245, 166, 35, 0.15);
      }

      .dismiss-btn {
        background: transparent;
        border: none;
        color: #8B5A00;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .dismiss-btn:hover {
        background: rgba(245, 166, 35, 0.2);
      }

      .add-reminder {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .add-reminder input {
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .add-reminder input[type="text"] {
        flex: 1;
        min-width: 200px;
      }

      .add-reminder input:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .btn-primary {
        background: #4A90E2;
        color: white;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .btn-primary:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }

      .reminder-item {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        padding: 18px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .reminder-item:hover {
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.15);
        transform: translateX(4px);
        border-color: #4A90E2;
      }

      .reminder-item.inactive {
        opacity: 0.5;
        background: #F7F7F7;
      }

      .reminder-icon {
        color: #50E3C2;
        font-size: 1.5rem;
      }

      .reminder-info {
        flex: 1;
      }

      .reminder-text {
        color: #333333;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .reminder-time {
        color: #4A90E2;
        font-size: 0.9375rem;
        font-weight: 600;
      }

      .reminder-actions {
        display: flex;
        gap: 8px;
      }

      .toggle-btn, .delete-btn {
        background: transparent;
        border: 2px solid #E0E0E0;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .toggle-btn {
        color: #50E3C2;
      }

      .toggle-btn:hover {
        background: #50E3C2;
        border-color: #50E3C2;
        color: white;
        transform: scale(1.1);
      }

      .delete-btn {
        color: #F5A623;
      }

      .delete-btn:hover {
        background: #F5A623;
        border-color: #F5A623;
        color: white;
        transform: scale(1.1);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('reminder-list-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

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
