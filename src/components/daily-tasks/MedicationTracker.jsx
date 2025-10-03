import { useState, useEffect } from "react";
import {
  FiPlus,
  FiCheck,
  FiClock,
  FiTrash2,
  FiLoader,
  FiEdit,
  FiX,
} from "react-icons/fi";

const MedicationTracker = () => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editMed, setEditMed] = useState({
    name: "",
    dosage: "",
    time: "",
    taken: false,
  });

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'medication-tracker-styles';
    styleElement.textContent = `
      .medication-tracker {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
      }

      .medication-tracker h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .medication-tracker p {
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

      .medication-form {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        padding: 28px;
        margin-bottom: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .form-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        color: #333333;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 1rem;
      }

      .form-group input {
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .form-group input:focus {
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

      .medication-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .medication-item {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        padding: 18px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .medication-item:hover {
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.15);
        transform: translateX(4px);
        border-color: #4A90E2;
      }

      .medication-item.taken {
        opacity: 0.6;
        background: #F7F7F7;
      }

      .medication-info {
        flex: 1;
      }

      .medication-name {
        color: #333333;
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .medication-details {
        color: #666666;
        font-size: 0.9375rem;
        display: flex;
        gap: 16px;
      }

      .medication-time {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #4A90E2;
        font-weight: 600;
      }

      .medication-actions {
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

      .status-btn.taken {
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
      const existingStyle = document.getElementById('medication-tracker-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Fetch medications from backend
  const fetchMedications = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching medications from backend...");

      const response = await fetch(`${API_BASE_URL}/api/medications`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Response status:", response.status);

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
      console.log("Medications data:", data);
      setMedications(data);
    } catch (err) {
      console.error("Failed to fetch medications:", err);
      setError(
        "Could not load medications. Please make sure the backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const addMedication = async () => {
    if (!newMed.name || !newMed.dosage || !newMed.time) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      console.log("Adding medication:", newMed);

      const response = await fetch(`${API_BASE_URL}/api/medications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newMed),
      });

      console.log("Add response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Add error response:", errorText);
        throw new Error(`Failed to add medication: ${response.status}`);
      }

      const savedMedication = await response.json();
      console.log("Saved medication:", savedMedication);

      setMedications([...medications, savedMedication]);
      setNewMed({ name: "", dosage: "", time: "" });
    } catch (err) {
      console.error("Error adding medication:", err);
      setError(
        err.message ||
          "Failed to add medication. Please check if the backend is running."
      );
    }
  };

  const toggleTaken = async (id) => {
    try {
      setError("");
      const response = await fetch(
        `${API_BASE_URL}/api/medications/${id}/toggle`,
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
        throw new Error(`Failed to update medication: ${response.status}`);
      }

      const updatedMedication = await response.json();
      setMedications(
        medications.map((med) => (med._id === id ? updatedMedication : med))
      );
    } catch (err) {
      console.error("Error toggling medication:", err);
      setError("Failed to update medication status.");
    }
  };

  const deleteMedication = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/medications/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete medication: ${response.status}`);
      }

      setMedications(medications.filter((med) => med._id !== id));
    } catch (err) {
      console.error("Error deleting medication:", err);
      setError("Failed to delete medication. Please try again.");
    }
  };

  const startEdit = (med) => {
    setEditingId(med._id);
    setEditMed({
      name: med.name,
      dosage: med.dosage,
      time: med.time,
      taken: med.taken,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMed({ name: "", dosage: "", time: "", taken: false });
  };

  const saveEdit = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/medications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editMed),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update medication: ${response.status}`);
      }

      const updatedMedication = await response.json();
      setMedications(
        medications.map((med) => (med._id === id ? updatedMedication : med))
      );
      setEditingId(null);
      setEditMed({ name: "", dosage: "", time: "", taken: false });
    } catch (err) {
      console.error("Error updating medication:", err);
      setError("Failed to update medication. Please try again.");
    }
  };

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
      <div className="medication-tracker">
        <div className="loading-container">
          <FiLoader className="spinner" />
          <p>Loading medications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="medication-tracker">
      <h2>Medication Tracker (Elderly Care)</h2>
      <p>Simple, clear tracker for daily medicines and dosages</p>

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

      <div className="add-medication">
        <input
          type="text"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          placeholder="Medication name"
          className="med-input"
          aria-label="Medication name"
        />
        <input
          type="text"
          value={newMed.dosage}
          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
          placeholder="Dosage"
          className="med-input"
          aria-label="Dosage"
        />
        <input
          type="time"
          value={newMed.time}
          onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
          className="med-input"
          aria-label="Time to take medication"
        />
        <button onClick={addMedication} className="btn btn-primary" aria-label="Add medication">
          <FiPlus /> Add
        </button>
      </div>

      <div className="medication-list">
        {medications.length === 0 ? (
          <div className="empty-state">
            <p>No medications added yet.</p>
            <button onClick={fetchMedications} className="btn btn-primary" aria-label="Refresh medications">
              <FiLoader /> Refresh
            </button>
          </div>
        ) : (
          medications
            .slice()
            .sort((a, b) => String(a.time).localeCompare(String(b.time)))
            .map((med) => (
            <div
              key={med._id}
              className={`medication-card ${med.taken ? "taken" : ""}`}
            >
              {editingId === med._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editMed.name}
                    onChange={(e) =>
                      setEditMed({ ...editMed, name: e.target.value })
                    }
                    placeholder="Medication name"
                    className="edit-input"
                    aria-label="Edit medication name"
                  />
                  <input
                    type="text"
                    value={editMed.dosage}
                    onChange={(e) =>
                      setEditMed({ ...editMed, dosage: e.target.value })
                    }
                    placeholder="Dosage"
                    className="edit-input"
                    aria-label="Edit dosage"
                  />
                  <input
                    type="time"
                    value={editMed.time}
                    onChange={(e) =>
                      setEditMed({ ...editMed, time: e.target.value })
                    }
                    className="edit-input"
                    aria-label="Edit time"
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => saveEdit(med._id)}
                      className="btn btn-primary"
                      aria-label="Save changes"
                    >
                      Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary" aria-label="Cancel editing">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="med-info">
                    <h3>{med.name}</h3>
                    <p>{med.dosage}</p>
                    <div className="med-time">
                      <FiClock /> {med.time}
                    </div>
                    <div className="med-status">
                      Status:{" "}
                      {med.taken ? (
                        <span className="status-taken">Taken</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="med-actions">
                    <button
                      onClick={() => toggleTaken(med._id)}
                      className={`status-btn ${med.taken ? "taken" : ""}`}
                      aria-label={med.taken ? "Mark as not taken" : "Mark as taken"}
                    >
                      <FiCheck /> {med.taken ? "Taken" : "Mark Taken"}
                    </button>
                    <div className="action-buttons">
                      <button
                        onClick={() => startEdit(med)}
                        className="edit-btn"
                        aria-label="Edit medication"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteMedication(med._id)}
                        className="delete-btn"
                        aria-label="Delete medication"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MedicationTracker;
