import { useState } from "react";
import PhotoGallery from "../components/memory-aids/PhotoGallery";
import ReminderList from "../components/memory-aids/ReminderList";
import VoiceNotes from "../components/memory-aids/VoiceNotes"; 

const MemoryAids = () => {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <div className="memory-aids-page">
      <h1>Memory Aids</h1>

      <div className="tabs">
        <button
          className={activeTab === "photos" ? "active" : ""}
          onClick={() => setActiveTab("photos")}
        >
          Photo Gallery
        </button>
        <button
          className={activeTab === "reminders" ? "active" : ""}
          onClick={() => setActiveTab("reminders")}
        >
          Reminders
        </button>
        <button
          className={activeTab === "voice" ? "active" : ""}
          onClick={() => setActiveTab("voice")}
        >
          Voice Notes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "photos" && <PhotoGallery />}
        {activeTab === "reminders" && <ReminderList />}
        {activeTab === "voice" && <VoiceNotes />}
      </div>
    </div>
  );
};

export default MemoryAids;
