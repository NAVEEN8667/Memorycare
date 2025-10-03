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

  // Fetch notes from Supabase
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
