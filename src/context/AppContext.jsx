import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Elderly care global state
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState('neutral'); // 'calm' | 'neutral' | 'stressed'
  const [stressLevel, setStressLevel] = useState(0); // 0-100
  const [caregiverAlerts, setCaregiverAlerts] = useState([]);
  const [lastInteraction, setLastInteraction] = useState(null);

  // Example: populate user if token exists
  useEffect(() => {
    const token = localStorage.getItem('elderlyCareToken');
    if (!token) return;
    (async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (e) {
        // token invalid
        localStorage.removeItem('elderlyCareToken');
      }
    })();
  }, []);

  const addCaregiverAlert = (message, type = 'info') => {
    const alert = { id: Date.now().toString(), message, type, ts: new Date().toISOString() };
    setCaregiverAlerts((prev) => [alert, ...prev].slice(0, 50));
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      mood,
      setMood,
      stressLevel,
      setStressLevel,
      caregiverAlerts,
      addCaregiverAlert,
      lastInteraction,
      setLastInteraction,
    }),
    [user, mood, stressLevel, caregiverAlerts, lastInteraction]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
