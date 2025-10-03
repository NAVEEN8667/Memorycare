import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { FiPlus, FiBell, FiTrash2, FiX } from "react-icons/fi";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
