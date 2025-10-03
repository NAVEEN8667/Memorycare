import { useState, useEffect } from "react";
import {
  FiPlus,
  FiCheck,
  FiTrash2,
  FiEdit,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { supabase } from "../../supabaseClient";

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
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks from Supabase.");
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
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ text: newTask.trim() }])
        .select();
      if (error) throw error;
      setTasks([...tasks, data[0]]);
      setNewTask("");
    } catch (err) {
      console.error(err);
      setError("Failed to add task.");
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed: !completed })
        .eq("id", id)
        .select();
      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === id ? data[0] : t)));
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
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
      const { data, error } = await supabase
        .from("tasks")
        .update({ text: editText.trim() })
        .eq("id", id)
        .select();
      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === id ? data[0] : t)));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
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

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <FiX />
          </button>
        </div>
      )}

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>
          <FiPlus /> Add Task
        </button>
      </div>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit(task.id)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => toggleTask(task.id, task.completed)}>
                    <FiCheck />
                  </button>
                  <span>{task.text}</span>
                  <button onClick={() => startEdit(task)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    <FiTrash2 />
                  </button>
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
