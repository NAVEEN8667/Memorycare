import { useState, useEffect } from "react";
import PhotoGallery from "../components/memory-aids/PhotoGallery";
import ReminderList from "../components/memory-aids/ReminderList";
import VoiceNotes from "../components/memory-aids/VoiceNotes"; 

const MemoryAids = () => {
  const [activeTab, setActiveTab] = useState("photos");

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'memory-aids-styles';
    styleElement.textContent = `
      .memory-aids-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px;
        background: #F7F7F7;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .memory-aids-page h1 {
        color: #333333;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 32px;
        text-align: center;
      }

      .tabs {
        display: flex;
        gap: 12px;
        margin-bottom: 32px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .tabs button {
        padding: 14px 32px;
        border: 2px solid #E0E0E0;
        background: #FFFFFF;
        color: #666666;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .tabs button:hover {
        border-color: #50E3C2;
        color: #50E3C2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(80, 227, 194, 0.2);
      }

      .tabs button.active {
        background: #50E3C2;
        color: white;
        border-color: #50E3C2;
        box-shadow: 0 4px 12px rgba(80, 227, 194, 0.3);
      }

      .tab-content {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('memory-aids-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

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
