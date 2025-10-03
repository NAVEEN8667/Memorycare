import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Layout & Pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DailyTasks from "./pages/DailyTasks";
import MemoryAids from "./pages/MemoryAids";
import CognitiveExercises from "./pages/CognitiveExercises";
import ChatBot from "./pages/ChatBot";
import Profile from "./pages/Profile";

// Context
import { AppProvider } from "./context/AppContext";

// Styles
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('elderlyCareToken');
        if (token) {
          const response = await axios.get("http://localhost:5000/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.valid) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('elderlyCareToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <div className="loading">Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  if (isLoading) {
    return <div className="app-loading">Loading Elderly Care Assistant...</div>;
  }

  return (
    <AppProvider>
      <Router>
        <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
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

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/daily-tasks" 
              element={
                <ProtectedRoute>
                  <DailyTasks />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/memory-aids" 
              element={
                <ProtectedRoute>
                  <MemoryAids />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/exercises" 
              element={
                <ProtectedRoute>
                  <CognitiveExercises />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/companion" 
              element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
