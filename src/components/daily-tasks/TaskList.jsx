import { useState, useEffect } from "react";
import {
  FiPlus,
  FiCheck,
  FiTrash2,
  FiEdit,
  FiX,
  FiLoader,
} from "react-icons/fi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'task-list-styles';
    styleElement.textContent = `
      .task-list {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
      }

      .task-list h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .task-list p {
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

      .error-actions {
        display: flex;
        gap: 8px;
      }

      .dismiss-btn, .test-btn {
        background: transparent;
        border: none;
        color: #8B5A00;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.2s;
      }

      .dismiss-btn:hover, .test-btn:hover {
        background: rgba(245, 166, 35, 0.2);
      }

      .task-input-container {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
      }

      .task-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .task-input:focus {
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

      .task-item {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .task-item:hover {
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.15);
        transform: translateX(4px);
        border-color: #4A90E2;
      }

      .task-item.completed {
        opacity: 0.6;
        background: #F7F7F7;
      }

      .task-text {
        flex: 1;
        color: #333333;
        font-size: 1rem;
      }

      .task-item.completed .task-text {
        text-decoration: line-through;
        color: #666666;
      }

      .edit-input {
        flex: 1;
        padding: 10px 12px;
        border: 2px solid #4A90E2;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
      }

      .edit-input:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .task-actions {
        display: flex;
        gap: 8px;
      }

      .status-btn, .edit-btn, .delete-btn {
        background: transparent;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      .status-btn {
        color: #666666;
      }

      .status-btn.completed {
        background: #50E3C2;
        border-color: #50E3C2;
        color: white;
      }

      .status-btn:hover {
        background: #50E3C2;
        border-color: #50E3C2;
        color: white;
        transform: scale(1.1);
      }

      .edit-btn {
        color: #4A90E2;
      }

      .edit-btn:hover {
        background: #4A90E2;
        border-color: #4A90E2;
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
      const existingStyle = document.getElementById('task-list-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching tasks from backend...");

      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Tasks response status:", response.status);

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
      console.log("Tasks data:", data);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(
        "Could not load tasks. Please make sure the backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!newTask.trim()) {
      setError("Please enter a task");
      return;
    }

    try {
      setError("");
      console.log("Adding task:", newTask);

      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text: newTask.trim() }),
      });

      console.log("Add task response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Add task error response:", errorText);
        throw new Error(`Failed to add task: ${response.status}`);
      }

      const savedTask = await response.json();
      console.log("Saved task:", savedTask);

      setTasks([...tasks, savedTask]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
      setError(
        err.message ||
          "Failed to add task. Please check if the backend is running."
      );
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update task: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (err) {
      console.error("Error toggling task:", err);
      setError("Failed to update task status.");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete task: ${response.status}`);
      }

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  // Start editing task
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Save edited task
  const saveEdit = async (id) => {
    if (!editText.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text: editText.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update task: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
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
      <div className="task-list">
        <div className="loading-container">
          <FiLoader className="spinner" />
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Daily Task Manager (Elderly Care)</h2>
      <p>Simple to-do list for daily activities</p>

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

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          aria-label="New task"
        />
        <button onClick={addTask} className="btn btn-primary" aria-label="Add task">
          <FiPlus /> Add Task
        </button>
      </div>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add your first task above!</p>
            <button onClick={fetchTasks} className="btn btn-primary">
              <FiLoader /> Refresh
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              {editingId === task._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    onKeyPress={(e) => e.key === "Enter" && saveEdit(task._id)}
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => saveEdit(task._id)}
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-content">
                    <button
                      onClick={() => toggleTask(task._id)}
                      className={`status-btn ${
                        task.completed ? "completed" : ""
                      }`}
                      aria-label={task.completed ? "Mark as not done" : "Mark as done"}
                    >
                      <FiCheck />
                    </button>
                    <span className="task-text">{task.text}</span>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => startEdit(task)}
                      className="edit-btn"
                      aria-label="Edit task"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="delete-btn"
                      aria-label="Delete task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
