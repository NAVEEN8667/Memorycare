import { useState, useRef, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import {
  FiMic,
  FiStopCircle,
  FiPlay,
  FiPause,
  FiTrash2,
  FiSave,
  FiLoader,
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

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.id = "voice-notes-styles";
    styleElement.textContent = `
      .voice-notes { max-width: 900px; margin: 0 auto; padding: 24px; font-family: 'Segoe UI', Arial, sans-serif; }
      .voice-notes h2 { color: #333; font-size: 2rem; font-weight: 600; margin-bottom: 8px; }
      .voice-notes p { color: #666; font-size: 1.0625rem; margin-bottom: 24px; }
      .error-message { background: #FFF3E0; border: 2px solid #F5A623; color: #8B5A00; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(245,166,35,0.15); }
      .btn { padding: 12px 24px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
      .btn-record { background: #F5A623; color: #fff; }
      .btn-record.recording { background: #EF4444; animation: pulse 1.5s infinite; }
      .btn-save { background: #4A90E2; color: #fff; }
      .recording-time { color: #F5A623; font-weight: 600; font-size: 1.125rem; }
      .notes-list { display: flex; flex-direction: column; gap: 12px; }
      .note-item { background: #FFF; border: 2px solid #E0E0E0; border-radius: 8px; padding: 18px; display: flex; align-items: center; gap: 16px; transition: all 0.3s; }
      .note-item:hover { box-shadow: 0 6px 16px rgba(74,144,226,0.15); transform: translateX(4px); border-color: #4A90E2; }
      .note-info { flex: 1; }
      .note-name { color: #333; font-size: 1.125rem; font-weight: 600; margin-bottom: 4px; }
      .note-date { color: #666; font-size: 0.875rem; }
      .note-actions { display: flex; gap: 8px; }
      .play-btn { color: #50E3C2; background: transparent; border: 2px solid #E0E0E0; border-radius: 8px; padding: 8px; }
      .play-btn:hover { background: #50E3C2; color: #fff; transform: scale(1.1); }
      .delete-btn { color: #F5A623; background: transparent; border: 2px solid #E0E0E0; border-radius: 8px; padding: 8px; }
      .delete-btn:hover { background: #F5A623; color: #fff; transform: scale(1.1); }
      @keyframes pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }
    `;
    document.head.appendChild(styleElement);
    return () => {
      const existingStyle = document.getElementById("voice-notes-styles");
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  // Fetch notes
  useEffect(() => {
    const loadNotes = async () => {
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
        console.error(err);
        setError("Failed to load voice notes.");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  // Cleanup audio and timers
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

  const startRecording = async () => {
    try {
      setError("");
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
      recordingTimer.current = setInterval(
        () => setRecordingTime((prev) => prev + 1),
        1000
      );
    } catch (err) {
      console.error(err);
      setError("Microphone access denied or not supported.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const discardRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioURL("");
    setNoteName("");
    stopRecording();
    setRecordingTime(0);
  };

  const saveRecording = async () => {
    if (!audioURL || !noteName.trim()) return;
    try {
      setUploading(true);
      const blob = await (await fetch(audioURL)).blob();
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
      console.error(err);
      setError("Failed to save voice note.");
    } finally {
      setUploading(false);
    }
  };

  const playNote = (note) => {
    if (isPlaying === note.id) {
      audioRef.current?.pause();
      setIsPlaying(null);
      return;
    }

    audioRef.current?.pause();
    setIsPlaying(note.id);
    audioRef.current = new Audio(`data:audio/webm;base64,${note.audio_data}`);
    audioRef.current.onended = () => setIsPlaying(null);
    audioRef.current.onerror = () => {
      setError("Failed to play audio.");
      setIsPlaying(null);
    };
    audioRef.current.play().catch((err) => {
      console.error(err);
      setError("Unable to play this audio.");
      setIsPlaying(null);
    });
  };

  const deleteNote = async (id) => {
    try {
      setError("");
      const { error: supaError } = await supabase
        .from("voice_notes")
        .delete()
        .eq("id", id);
      if (supaError) throw supaError;

      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (isPlaying === id) {
        audioRef.current?.pause();
        setIsPlaying(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete voice note.");
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div className="voice-notes">
      <h2>Voice Notes (Elderly Care)</h2>
      <p>Record simple reminders in your own voice</p>

      {error && (
        <div className="error-message">
          <FiAlertCircle />
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <FiX />
          </button>
          <button onClick={() => fetchNotes()}>
            <FiRefreshCw /> Retry
          </button>
        </div>
      )}

      <div className="recording-section">
        {!isRecording && !audioURL ? (
          <button onClick={startRecording} className="btn btn-record">
            <FiMic /> Start Recording
          </button>
        ) : isRecording ? (
          <div>
            <button
              className="btn btn-record recording"
              onClick={stopRecording}
            >
              <FiStopCircle /> Stop Recording
            </button>
            <span className="recording-time">{formatTime(recordingTime)}</span>
          </div>
        ) : (
          <div>
            <audio src={audioURL} controls />
            <input
              type="text"
              placeholder="Name this recording"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
            />
            <button
              className="btn btn-save"
              onClick={saveRecording}
              disabled={!noteName.trim() || uploading}
            >
              {uploading ? <FiLoader /> : <FiSave />} Save
            </button>
            <button className="btn btn-record" onClick={discardRecording}>
              Discard
            </button>
          </div>
        )}
      </div>

      <h3>Saved Voice Notes</h3>
      {loading ? (
        <div>
          <FiLoader /> Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <p>No voice notes yet.</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="note-info">
                <div className="note-name">{note.name}</div>
                <div className="note-date">
                  {new Date(note.date).toLocaleString()}
                </div>
              </div>
              <div className="note-actions">
                <button className="play-btn" onClick={() => playNote(note)}>
                  {isPlaying === note.id ? <FiPause /> : <FiPlay />}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setShowDeleteConfirm(note.id)}
                >
                  <FiTrash2 />
                </button>
                {showDeleteConfirm === note.id && (
                  <div>
                    <p>Delete this note?</p>
                    <button onClick={() => deleteNote(note.id)}>Yes</button>
                    <button onClick={() => setShowDeleteConfirm(null)}>
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceNotes;
