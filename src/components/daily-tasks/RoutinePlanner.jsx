import { useState, useEffect } from "react";
import {
  FiPlus,
  FiClock,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiLoader,
  FiX,
} from "react-icons/fi";
import { supabase } from "../../supabaseClient";

const RoutinePlanner = () => {
  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState({
    time: "",
    activity: "",
    important: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch routines
  const fetchRoutines = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("routines")
        .select("*")
        .order("time", { ascending: true });

      if (error) throw error;
      setRoutines(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch routines from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  // Add or update routine
  const saveRoutine = async () => {
    if (!newRoutine.time || !newRoutine.activity) {
      setError("Please fill in both time and activity");
      return;
    }

    try {
      setError("");
      let data, error;

      if (editingId) {
        ({ data, error } = await supabase
          .from("routines")
          .update(newRoutine)
          .eq("id", editingId)
          .select());
      } else {
        ({ data, error } = await supabase
          .from("routines")
          .insert([newRoutine])
          .select());
      }

      if (error) throw error;

      if (editingId) {
        setRoutines(routines.map((r) => (r.id === editingId ? data[0] : r)));
      } else {
        setRoutines([...routines, data[0]]);
      }

      setNewRoutine({ time: "", activity: "", important: false });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to save routine.");
    }
  };

  // Toggle completion
  const toggleComplete = async (id, currentStatus) => {
    try {
      const { data, error } = await supabase
        .from("routines")
        .update({ completed: !currentStatus })
        .eq("id", id)
        .select();

      if (error) throw error;
      setRoutines(routines.map((r) => (r.id === id ? data[0] : r)));
    } catch (err) {
      console.error(err);
      setError("Failed to update routine status.");
    }
  };

  // Delete routine
  const deleteRoutine = async (id) => {
    try {
      const { error } = await supabase.from("routines").delete().eq("id", id);
      if (error) throw error;
      setRoutines(routines.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete routine.");
    }
  };

  // Start editing
  const startEditing = (routine) => {
    setEditingId(routine.id);
    setNewRoutine({
      time: routine.time,
      activity: routine.activity,
      important: routine.important,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setNewRoutine({ time: "", activity: "", important: false });
  };

  if (loading) {
    return (
      <div className="routine-planner">
        <div className="loading-container">
          <FiLoader className="spinner" />
          <p>Loading routines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="routine-planner">
      <h2>Daily Routine Planner (Elderly Care)</h2>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <FiX />
          </button>
        </div>
      )}

      <div className="routine-form">
        <input
          type="time"
          value={newRoutine.time}
          onChange={(e) =>
            setNewRoutine({ ...newRoutine, time: e.target.value })
          }
        />
        <input
          type="text"
          value={newRoutine.activity}
          onChange={(e) =>
            setNewRoutine({ ...newRoutine, activity: e.target.value })
          }
          placeholder="Activity"
        />
        <label>
          <input
            type="checkbox"
            checked={newRoutine.important}
            onChange={(e) =>
              setNewRoutine({ ...newRoutine, important: e.target.checked })
            }
          />
          Important
        </label>
        <button onClick={saveRoutine}>
          {editingId ? <FiCheck /> : <FiPlus />} {editingId ? "Update" : "Add"}
        </button>
        {editingId && <button onClick={cancelEditing}>Cancel</button>}
      </div>

      <div className="routine-list">
        {routines.length === 0 ? (
          <p>No routines yet.</p>
        ) : (
          routines.map((r) => (
            <div
              key={r.id}
              className={`routine-item ${r.completed ? "completed" : ""} ${
                r.important ? "important" : ""
              }`}
            >
              <div className="routine-time">
                <FiClock /> {r.time}
              </div>
              <div className="routine-activity">{r.activity}</div>
              <div className="routine-actions">
                <button onClick={() => toggleComplete(r.id, r.completed)}>
                  <FiCheck />
                </button>
                <button onClick={() => startEditing(r)}>
                  <FiEdit2 />
                </button>
                <button onClick={() => deleteRoutine(r.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoutinePlanner;
