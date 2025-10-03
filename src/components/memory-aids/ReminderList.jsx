import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
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

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("reminders")
        .select("*")
        .order("time", { ascending: true });

      if (error) throw error;
      setReminders(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Add new reminder
  const addReminder = async () => {
    if (!newReminder.trim() || !newTime) {
      setError("Please enter reminder text and time.");
      return;
    }
    try {
      setError("");
      const { data, error } = await supabase
        .from("reminders")
        .insert([{ text: newReminder.trim(), time: newTime }])
        .select();

      if (error) throw error;
      setReminders([data[0], ...reminders]);
      setNewReminder("");
      setNewTime("");
    } catch (err) {
      console.error(err);
      setError("Failed to add reminder.");
    }
  };

  // Toggle reminder active status
  const toggleReminder = async (id, currentStatus) => {
    try {
      setError("");
      const { data, error } = await supabase
        .from("reminders")
        .update({ active: !currentStatus })
        .eq("id", id)
        .select();

      if (error) throw error;
      setReminders(reminders.map((r) => (r.id === id ? data[0] : r)));
    } catch (err) {
      console.error(err);
      setError("Failed to update reminder.");
    }
  };

  // Delete reminder
  const deleteReminder = async (id) => {
    try {
      setError("");
      const { error } = await supabase.from("reminders").delete().eq("id", id);
      if (error) throw error;
      setReminders(reminders.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete reminder.");
    }
  };

  if (loading) return <p>Loading reminders...</p>;

  return (
    <div className="reminder-list">
      <h2>Reminders (Elderly Care)</h2>
      <p>Set simple time-based alerts for daily needs</p>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError("")}>
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
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={addReminder}>
          <FiPlus /> Add
        </button>
      </div>

      <ul className="reminders">
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            className={reminder.active ? "active" : "inactive"}
          >
            <div className="reminder-info">
              <FiBell />
              <div>
                <span className="reminder-time">{reminder.time}</span>
                <span className="reminder-text">{reminder.text}</span>
              </div>
            </div>
            <div className="reminder-actions">
              <button
                onClick={() => toggleReminder(reminder.id, reminder.active)}
              >
                {reminder.active ? "Disable" : "Enable"}
              </button>
              <button onClick={() => deleteReminder(reminder.id)}>
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
