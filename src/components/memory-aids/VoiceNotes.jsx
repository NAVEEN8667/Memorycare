import { useState, useRef, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import {
  FiMic,
  FiStopCircle,
  FiPlay,
  FiTrash2,
  FiSave,
  FiLoader,
  FiPause,
  FiX,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";



// Helper: convert blob to base64
const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const VoiceNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(null);
  const [noteName, setNoteName] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [error, setError] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [uploading, setUploading] = useState(false);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioRef = useRef(null);
  const recordingTimer = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'voice-notes-styles';
    styleElement.textContent = `
      .voice-notes {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .voice-notes h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .voice-notes p {
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

      .recording-section {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        padding: 28px;
        margin-bottom: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .recording-controls {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }

      .recording-controls input {
        flex: 1;
        min-width: 200px;
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .recording-controls input:focus {
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

      .btn-record {
        background: #F5A623;
        color: white;
        box-shadow: 0 4px 12px rgba(245, 166, 35, 0.3);
      }

      .btn-record:hover {
        background: #E09515;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(245, 166, 35, 0.4);
      }

      .btn-record.recording {
        background: #EF4444;
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .btn-save {
        background: #4A90E2;
        color: white;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .btn-save:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }

      .recording-time {
        color: #F5A623;
        font-weight: 600;
        font-size: 1.125rem;
      }

      .notes-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .note-item {
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

      .note-item:hover {
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.15);
        transform: translateX(4px);
        border-color: #4A90E2;
      }

      .note-info {
        flex: 1;
      }

      .note-name {
        color: #333333;
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .note-date {
        color: #666666;
        font-size: 0.875rem;
      }

      .note-actions {
        display: flex;
        gap: 8px;
      }

      .play-btn, .delete-btn {
        background: transparent;
        border: 2px solid #E0E0E0;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .play-btn {
        color: #50E3C2;
      }

      .play-btn:hover {
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
      const existingStyle = document.getElementById('voice-notes-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Fetch voice notes from backend
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error: supaError } = await supabase
        .from("voice_notes")
        .select("*")
        .order("date", { ascending: false });

      if (supaError) throw supaError;
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch voice notes:", err);
      setError(
        "Could not load voice notes. Check your network or Supabase setup."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Clean up audio resources
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (recordingTimer.current) clearInterval(recordingTimer.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioURL]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      setError("");
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error("Your browser doesn't support audio recording.");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(audioBlob));
        clearInterval(recordingTimer.current);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimer.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access error:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Microphone access denied. Please allow it."
          : "Could not access microphone."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const discardRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioURL("");
    setNoteName("");
    stopRecording();
    setRecordingTime(0);
  };

  // Save recording to Supabase
  const saveRecording = async () => {
    if (!audioURL || !noteName.trim()) return;

    try {
      setError("");
      setUploading(true);

      const response = await fetch(audioURL);
      const blob = await response.blob();
      const base64Audio = await blobToBase64(blob);
      const base64Data = base64Audio.split(",")[1];

      const { data, error: supaError } = await supabase
        .from("voice_notes")
        .insert([
          {
            name: noteName.trim(),
            audio_data: base64Data,
            date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (supaError) throw supaError;

      setNotes((prev) => [data, ...prev]);
      discardRecording();
    } catch (err) {
      console.error("Error saving recording:", err);
      setError("Failed to save voice note. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const playNote = async (note) => {
    if (isPlaying === note.id || isPlaying === note._id) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    try {
      setIsPlaying(note.id || note._id);
      const audioSrc = `data:audio/webm;base64,${note.audio_data}`;
      audioRef.current = new Audio(audioSrc);

      audioRef.current.onended = () => setIsPlaying(null);
      audioRef.current.onerror = () => {
        setError("Failed to play audio. File may be corrupted.");
        setIsPlaying(null);
      };

      await audioRef.current.play();
    } catch (err) {
      console.error("Playback error:", err);
      setError("Unable to play this audio.");
      setIsPlaying(null);
    }
  };

  const deleteNote = async (id) => {
    try {
      setError("");
      const { error: supaError } = await supabase
        .from("voice_notes")
        .delete()
        .eq("id", id);

      if (supaError) throw supaError;

      setNotes((prev) =>
        prev.filter((note) => note.id !== id && note._id !== id)
      );
      if (isPlaying === id) {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(null);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete voice note.");
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div className="voice-notes">
      <div className="voice-notes-header">
        <h2>Voice Notes (Elderly Care)</h2>
        <p className="subtitle">Record simple reminders in your own voice</p>
      </div>

      {error && (
        <div className="error-message" role="status" aria-live="polite">
          <FiAlertCircle />
          <span>{error}</span>
          <div className="error-actions">
            <button onClick={() => setError("")} className="dismiss-btn">
              <FiX />
            </button>
            {error.includes("load") && (
              <button onClick={fetchNotes} className="retry-btn">
                <FiRefreshCw /> Retry
              </button>
            )}
          </div>
        </div>
      )}

      <div className="recording-section">
        {!isRecording && !audioURL ? (
          <button onClick={startRecording} className="btn btn-primary">
            <FiMic /> Start Recording
          </button>
        ) : isRecording ? (
          <div className="recording-status">
            <button onClick={stopRecording} className="btn btn-secondary">
              <FiStopCircle /> Stop Recording
            </button>
            <span>{formatTime(recordingTime)}</span>
          </div>
        ) : (
          audioURL && (
            <div className="recording-preview">
              <audio src={audioURL} controls />
              <input
                type="text"
                placeholder="Name this recording"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
              />
              <button
                onClick={saveRecording}
                disabled={!noteName.trim() || uploading}
              >
                {uploading ? <FiLoader /> : <FiSave />} Save
              </button>
              <button onClick={discardRecording} disabled={uploading}>
                Discard
              </button>
            </div>
          )
        )}
      </div>

      <div className="saved-notes">
        <h3>Saved Voice Notes</h3>
        <button onClick={fetchNotes}>Refresh</button>

        {loading ? (
          <div>
            <FiLoader /> Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <p>No voice notes yet.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id || note._id}>
                <span>{note.name}</span>
                <button onClick={() => playNote(note)}>
                  {isPlaying === (note.id || note._id) ? (
                    <FiPause />
                  ) : (
                    <FiPlay />
                  )}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(note.id || note._id)}
                >
                  <FiTrash2 />
                </button>
                {showDeleteConfirm === (note.id || note._id) && (
                  <div>
                    <p>Delete this note?</p>
                    <button onClick={() => deleteNote(note.id || note._id)}>
                      Yes
                    </button>
                    <button onClick={() => setShowDeleteConfirm(null)}>
                      No
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VoiceNotes;
