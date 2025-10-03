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

  // Fetch tasks
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
