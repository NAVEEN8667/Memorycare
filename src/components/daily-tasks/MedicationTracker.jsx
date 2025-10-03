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
import { supabase } from "../../supabaseClient";

const MedicationTracker = () => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editMed, setEditMed] = useState({
    name: "",
    dosage: "",
    time: "",
    taken: false,
  });

  // Fetch medications from Supabase
  const fetchMedications = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("medications")
        .select("*")
        .order("time", { ascending: true });

      if (error) throw error;
      setMedications(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medications from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  // Add medication
  const addMedication = async () => {
    if (!newMed.name || !newMed.dosage || !newMed.time) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      const { data, error } = await supabase
        .from("medications")
        .insert([newMed])
        .select();

      if (error) throw error;
      setMedications([...medications, data[0]]);
      setNewMed({ name: "", dosage: "", time: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add medication.");
    }
  };

  // Toggle taken status
  const toggleTaken = async (id, currentStatus) => {
    try {
      const { data, error } = await supabase
        .from("medications")
        .update({ taken: !currentStatus })
        .eq("id", id)
        .select();

      if (error) throw error;
      setMedications(medications.map((med) => (med.id === id ? data[0] : med)));
    } catch (err) {
      console.error(err);
      setError("Failed to update medication status.");
    }
  };

  // Delete medication
  const deleteMedication = async (id) => {
    try {
      const { error } = await supabase
        .from("medications")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setMedications(medications.filter((med) => med.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete medication.");
    }
  };

  // Start editing
  const startEdit = (med) => {
    setEditingId(med.id);
    setEditMed({ ...med });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditMed({ name: "", dosage: "", time: "", taken: false });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const { data, error } = await supabase
        .from("medications")
        .update(editMed)
        .eq("id", id)
        .select();

      if (error) throw error;
      setMedications(medications.map((med) => (med.id === id ? data[0] : med)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      setError("Failed to update medication.");
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
          <button
            onClick={() => setError("")}
            className="dismiss-btn"
            aria-label="Dismiss message"
          >
            <FiX />
          </button>
        </div>
      )}

      <div className="add-medication">
        <input
          type="text"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          placeholder="Medication name"
        />
        <input
          type="text"
          value={newMed.dosage}
          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
          placeholder="Dosage"
        />
        <input
          type="time"
          value={newMed.time}
          onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
        />
        <button onClick={addMedication}>
          <FiPlus /> Add
        </button>
      </div>

      <div className="medication-list">
        {medications.length === 0 ? (
          <p>No medications added yet.</p>
        ) : (
          medications.map((med) => (
            <div
              key={med.id}
              className={`medication-card ${med.taken ? "taken" : ""}`}
            >
              {editingId === med.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editMed.name}
                    onChange={(e) =>
                      setEditMed({ ...editMed, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editMed.dosage}
                    onChange={(e) =>
                      setEditMed({ ...editMed, dosage: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    value={editMed.time}
                    onChange={(e) =>
                      setEditMed({ ...editMed, time: e.target.value })
                    }
                  />
                  <button onClick={() => saveEdit(med.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{med.name}</h3>
                  <p>{med.dosage}</p>
                  <p>
                    <FiClock /> {med.time}
                  </p>
                  <p>Status: {med.taken ? "Taken" : "Pending"}</p>
                  <button onClick={() => toggleTaken(med.id, med.taken)}>
                    <FiCheck /> {med.taken ? "Taken" : "Mark Taken"}
                  </button>
                  <button onClick={() => startEdit(med)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => deleteMedication(med.id)}>
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

export default MedicationTracker;
