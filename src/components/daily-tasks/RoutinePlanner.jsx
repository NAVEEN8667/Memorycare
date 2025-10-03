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

const RoutinePlanner = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'routine-planner-styles';
    styleElement.textContent = `
      .routine-planner {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .routine-planner h2 {
        color: #1f2937;
        margin-bottom: 8px;
      }

      .subtitle {
        color: #6b7280;
        margin-bottom: 24px;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: #6b7280;
      }

      .spinner {
        animation: spin 1s linear infinite;
        font-size: 2rem;
        margin-bottom: 12px;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .error-message {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        color: #991b1b;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .error-actions {
        display: flex;
        gap: 8px;
      }

      .dismiss-btn, .test-btn {
        background: transparent;
        border: none;
        color: #991b1b;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s;
      }

      .dismiss-btn:hover, .test-btn:hover {
        background: rgba(0,0,0,0.1);
      }

      .routine-form {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-group label {
        display: block;
        color: #374151;
        font-weight: 500;
        margin-bottom: 6px;
      }

      .form-group input[type="time"],
      .form-group input[type="text"] {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;
      }

      .form-group input:focus {
        outline: none;
        border-color: #4F46E5;
      }

      .checkbox-group label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .checkbox-group input[type="checkbox"] {
        margin-right: 8px;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .form-actions {
        display: flex;
        gap: 12px;
        margin-top: 20px;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
      }

      .btn-primary {
        background: #4F46E5;
        color: white;
      }

      .btn-primary:hover {
        background: #4338ca;
      }

      .btn-secondary {
        background: #e5e7eb;
        color: #374151;
      }

      .btn-secondary:hover {
        background: #d1d5db;
      }

      .routine-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .empty-state {
        text-align: center;
        padding: 40px;
        color: #6b7280;
      }

      .empty-state p {
        margin-bottom: 16px;
      }

      .routine-item {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.2s;
      }

      .routine-item:hover {
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }

      .routine-item.completed {
        opacity: 0.6;
        background: #f9fafb;
      }

      .routine-item.important {
        border-left: 4px solid #ef4444;
      }

      .routine-time {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #4F46E5;
        font-weight: 600;
        min-width: 100px;
      }

      .routine-activity {
        flex: 1;
        color: #1f2937;
      }

      .routine-item.completed .routine-activity {
        text-decoration: line-through;
      }

      .routine-actions {
        display: flex;
        gap: 8px;
      }

      .status-btn, .edit-btn, .delete-btn {
        background: transparent;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .status-btn {
        color: #6b7280;
      }

      .status-btn.completed {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }

      .status-btn:hover {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }

      .edit-btn {
        color: #4F46E5;
      }

      .edit-btn:hover {
        background: #4F46E5;
        border-color: #4F46E5;
        color: white;
      }

      .delete-btn {
        color: #ef4444;
      }

      .delete-btn:hover {
        background: #ef4444;
        border-color: #ef4444;
        color: white;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('routine-planner-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState({
    time: "",
    activity: "",
    important: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  // Fetch routines from backend
  const fetchRoutines = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching routines from backend...");

      const response = await fetch(`${API_BASE_URL}/api/routines`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Routines response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${contentType}`);
      }

      const data = await response.json();
      console.log("Routines data:", data);
      setRoutines(data);
    } catch (err) {
      console.error("Failed to fetch routines:", err);
      setError(
        "Could not load routines. Please make sure the backend server is running on port 5000."
      );
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
      console.log("Saving routine:", newRoutine);

      const url = editingId
        ? `${API_BASE_URL}/api/routines/${editingId}`
        : `${API_BASE_URL}/api/routines`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newRoutine),
      });

      console.log("Save routine response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Save routine error response:", errorText);
        throw new Error(`Failed to save routine: ${response.status}`);
      }

      const savedRoutine = await response.json();
      console.log("Saved routine:", savedRoutine);

      if (editingId) {
        setRoutines(
          routines.map((routine) =>
            routine._id === editingId ? savedRoutine : routine
          )
        );
      } else {
        setRoutines([...routines, savedRoutine]);
      }

      setNewRoutine({ time: "", activity: "", important: false });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving routine:", err);
      setError(
        err.message ||
          "Failed to save routine. Please check if the backend is running."
      );
    }
  };

  // Toggle routine completion
  const toggleComplete = async (id) => {
    try {
      setError("");
      const response = await fetch(
        `${API_BASE_URL}/api/routines/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update routine: ${response.status}`);
      }

      const updatedRoutine = await response.json();
      setRoutines(
        routines.map((routine) =>
          routine._id === id ? updatedRoutine : routine
        )
      );
    } catch (err) {
      console.error("Error toggling routine:", err);
      setError("Failed to update routine status.");
    }
  };

  // Delete routine
  const deleteRoutine = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/routines/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete routine: ${response.status}`);
      }

      setRoutines(routines.filter((routine) => routine._id !== id));
    } catch (err) {
      console.error("Error deleting routine:", err);
      setError("Failed to delete routine. Please try again.");
    }
  };

  // Start editing routine
  const startEditing = (routine) => {
    setEditingId(routine._id);
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

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/test`);
      const data = await response.json();
      setError("Backend connection successful! " + data.message);
    } catch (err) {
      setError(
        "Backend connection failed. Make sure the server is running on port 5000."
      );
    }
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
      <p className="subtitle">
        Create a structured daily routine to help maintain consistency
      </p>

      {error && (
        <div className="error-message" role="status" aria-live="polite">
          <span>{error}</span>
          <div className="error-actions">
            <button onClick={() => setError("")} className="dismiss-btn" aria-label="Dismiss message">
              <FiX />
            </button>
            {error.includes("backend") && (
              <button onClick={testBackendConnection} className="test-btn" aria-label="Test backend connection">
                Test Connection
              </button>
            )}
          </div>
        </div>
      )}

      <div className="routine-form">
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={newRoutine.time}
            onChange={(e) =>
              setNewRoutine({ ...newRoutine, time: e.target.value })
            }
            required
            aria-label="Routine time"
          />
        </div>

        <div className="form-group">
          <label>Activity:</label>
          <input
            type="text"
            value={newRoutine.activity}
            onChange={(e) =>
              setNewRoutine({ ...newRoutine, activity: e.target.value })
            }
            placeholder="e.g., Take medication, Walk, Lunch"
            required
            aria-label="Routine activity"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={newRoutine.important}
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, important: e.target.checked })
              }
              aria-label="Mark as important"
            />
            Important (highlight)
          </label>
        </div>

        <div className="form-actions">
          {editingId ? (
            <>
              <button onClick={saveRoutine} className="btn btn-primary" aria-label="Update routine">
                <FiCheck /> Update
              </button>
              <button onClick={cancelEditing} className="btn btn-secondary" aria-label="Cancel editing">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={saveRoutine} className="btn btn-primary" aria-label="Add activity">
              <FiPlus /> Add Activity
            </button>
          )}
        </div>
      </div>

      <div className="routine-list">
        {routines.length === 0 ? (
          <div className="empty-state">
            <p>No routines added yet. Add your first activity above.</p>
            <button onClick={fetchRoutines} className="btn btn-primary">
              <FiLoader /> Refresh
            </button>
          </div>
        ) : (
          routines
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((routine) => (
              <div
                key={routine._id}
                className={`routine-item ${
                  routine.completed ? "completed" : ""
                } ${routine.important ? "important" : ""}`}
              >
                <div className="routine-time">
                  <FiClock /> {routine.time}
                </div>

                <div className="routine-activity">{routine.activity}</div>

                <div className="routine-actions">
                  <button
                    onClick={() => toggleComplete(routine._id)}
                    className={`status-btn ${
                      routine.completed ? "completed" : ""
                    }`}
                    aria-label={
                      routine.completed ? "Mark incomplete" : "Mark complete"
                    }
                  >
                    <FiCheck />
                  </button>

                  <button
                    onClick={() => startEditing(routine)}
                    className="edit-btn"
                    aria-label="Edit routine"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => deleteRoutine(routine._id)}
                    className="delete-btn"
                    aria-label="Delete routine"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default RoutinePlanner;
