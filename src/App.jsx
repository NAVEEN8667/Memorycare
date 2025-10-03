import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Layout & Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DailyTasks from "./pages/DailyTasks";
import MemoryAids from "./pages/MemoryAids";
import CognitiveExercises from "./pages/CognitiveExercises";
import ChatBot from "./pages/ChatBot";
import Profile from "./pages/Profile";
import FaceRecognition from "./pages/FaceRecognition";
import VoiceRecognition from "./pages/VoiceRecognition";
import AICompanion from "./pages/AICompanion";
import AIFeatures from "./pages/AIFeatures";

// Context
import { AppProvider } from "./context/AppContext";

// Styles
import './App.css';

function App() {
  // Make routes public for now to avoid auth-related navigation issues
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppProvider>
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <Home 
                  isAuthenticated={isAuthenticated} 
                  setIsAuthenticated={setIsAuthenticated} 
                />
              } 
            />

            {/* App Routes (public for now) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily-tasks" element={<DailyTasks />} />
            <Route path="/memory-aids" element={<MemoryAids />} />
            <Route path="/ai-features" element={<AIFeatures />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
            <Route path="/voice-recognition" element={<VoiceRecognition />} />
            <Route path="/exercises" element={<CognitiveExercises />} />
            <Route path="/companion" element={<AICompanion />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/profile" element={<Profile />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
