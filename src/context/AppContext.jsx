import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

const initialState = {
  user: {
    name: "John",
    age: 72,
    emergencyContact: "Sarah Johnson",
    emergencyPhone: "(555) 123-4567",
  },
  tasks: [
    {
      id: "1",
      title: "Take Morning Medication",
      description: "Blood pressure medication with breakfast",
      time: "8:00 AM",
      completed: false,
      category: "medication",
      priority: "high",
      reminder: true,
    },
    {
      id: "2",
      title: "Light Exercise",
      description: "15 minutes of walking or stretching",
      time: "10:00 AM",
      completed: false,
      category: "exercise",
      priority: "medium",
      reminder: true,
    },
    {
      id: "3",
      title: "Call Sarah",
      description: "Weekly check-in with daughter",
      time: "2:00 PM",
      completed: false,
      category: "social",
      priority: "medium",
      reminder: false,
    },
    {
      id: "4",
      title: "Evening Medication",
      description: "Take evening pills with dinner",
      time: "6:00 PM",
      completed: false,
      category: "medication",
      priority: "high",
      reminder: true,
    },
  ],
  medications: [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "8:00 AM",
      instructions: "Take with food",
      nextDue: new Date().toISOString(),
      taken: false,
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "8:00 AM, 6:00 PM",
      instructions: "Take with meals",
      nextDue: new Date().toISOString(),
      taken: false,
    },
  ],
  contacts: [
    {
      id: "1",
      name: "Sarah Johnson",
      relationship: "Daughter",
      phone: "(555) 123-4567",
      email: "sarah@email.com",
      address: "123 Oak Street",
      isEmergency: true,
      photo: null,
    },
    {
      id: "2",
      name: "Dr. Smith",
      relationship: "Primary Doctor",
      phone: "(555) 987-6543",
      email: "dr.smith@clinic.com",
      address: "Medical Center",
      isEmergency: false,
      photo: null,
    },
    {
      id: "3",
      name: "Emergency Services",
      relationship: "Emergency",
      phone: "911",
      email: null,
      address: null,
      isEmergency: true,
      photo: null,
    },
    {
      id: "4",
      name: "Mike Johnson",
      relationship: "Son",
      phone: "(555) 456-7890",
      email: "mike@email.com",
      address: "456 Pine Avenue",
      isEmergency: true,
      photo: null,
    },
  ],
  memories: [
    {
      id: "1",
      type: "important",
      title: "My Address",
      content: "123 Maple Street, Springfield, IL 62701",
      date: "2024-01-15",
      category: "personal",
      tags: ["address", "home"],
    },
    {
      id: "2",
      type: "note",
      title: "Favorite Recipe",
      content:
        "Mom's apple pie recipe - always use Granny Smith apples, 2 cups flour, 1 cup sugar",
      date: "2024-01-10",
      category: "recipe",
      tags: ["cooking", "family"],
    },
    {
      id: "3",
      type: "photo",
      title: "Family Vacation 2023",
      content: "Beach trip with Sarah and Mike - had a wonderful time",
      date: "2023-07-15",
      category: "family",
      tags: ["vacation", "family", "beach"],
      imageUrl:
        "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg",
    },
  ],
  appointments: [
    {
      id: "1",
      title: "Doctor Appointment",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Medical Center",
      doctor: "Dr. Smith",
      type: "checkup",
    },
    {
      id: "2",
      title: "Physical Therapy",
      date: "2024-01-22",
      time: "2:00 PM",
      location: "Therapy Center",
      doctor: "Physical Therapist",
      type: "therapy",
    },
  ],
  exercises: [
    {
      id: "1",
      name: "Word Association",
      description: "Connect related words to improve memory",
      difficulty: "easy",
      category: "memory",
      completed: false,
      score: 0,
    },
    {
      id: "2",
      name: "Number Sequence",
      description: "Remember and repeat number patterns",
      difficulty: "medium",
      category: "cognitive",
      completed: false,
      score: 0,
    },
  ],
  settings: {
    fontSize: "large",
    highContrast: false,
    voiceReminders: true,
    emergencyMode: false,
    caregiverAccess: true,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: uuidv4() }],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "MARK_MEDICATION_TAKEN":
      return {
        ...state,
        medications: state.medications.map((med) =>
          med.id === action.payload
            ? { ...med, taken: true, lastTaken: new Date().toISOString() }
            : med
        ),
      };

    case "ADD_MEMORY":
      return {
        ...state,
        memories: [...state.memories, { ...action.payload, id: uuidv4() }],
      };

    case "DELETE_MEMORY":
      return {
        ...state,
        memories: state.memories.filter(
          (memory) => memory.id !== action.payload
        ),
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload, id: uuidv4() }],
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? { ...contact, ...action.payload.updates }
            : contact
        ),
      };

    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [
          ...state.appointments,
          { ...action.payload, id: uuidv4() },
        ],
      };

    case "UPDATE_EXERCISE_SCORE":
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.id
            ? { ...exercise, score: action.payload.score, completed: true }
            : exercise
        ),
      };

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("alzheimer-care-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // You could dispatch actions to restore state here
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("alzheimer-care-data", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
