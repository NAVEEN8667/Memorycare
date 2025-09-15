// src/pages/Profile.jsx
import { useState } from "react";
import "./profile.css";
// Assuming you have a CSS file for styling

const Profile = () => {
  // Sample user data - in a real app, this would come from your backend or auth context
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    age: 72,
    caregiver: "Jane Doe (daughter)",
    emergencyContact: "555-123-4567",
    profilePicture: "/assets/default-profile.jpg", // Default image path
    preferences: {
      darkMode: false,
      fontSize: "medium",
      remindersEnabled: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in user.preferences) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log("Saved:", user);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-header">
        <div className="profile-picture-container">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          {isEditing && (
            <div className="image-upload">
              <label htmlFor="profile-image-upload" className="upload-button">
                Change Photo
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="profile-input"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="profile-details">
        <h3>Personal Information</h3>

        <div className="detail-row">
          <span className="detail-label">Age:</span>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <span>{user.age}</span>
          )}
        </div>

        <div className="detail-row">
          <span className="detail-label">Caregiver:</span>
          {isEditing ? (
            <input
              type="text"
              name="caregiver"
              value={user.caregiver}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <span>{user.caregiver}</span>
          )}
        </div>

        <div className="detail-row">
          <span className="detail-label">Emergency Contact:</span>
          {isEditing ? (
            <input
              type="tel"
              name="emergencyContact"
              value={user.emergencyContact}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <span>{user.emergencyContact}</span>
          )}
        </div>
      </div>

      <div className="profile-preferences">
        <h3>Preferences</h3>

        <div className="preference-item">
          <label>
            {isEditing ? (
              <input
                type="checkbox"
                name="darkMode"
                checked={user.preferences.darkMode}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="checkbox"
                checked={user.preferences.darkMode}
                readOnly
                disabled
              />
            )}
            <span>Dark Mode</span>
          </label>
        </div>

        <div className="preference-item">
          <span className="preference-label">Font Size:</span>
          {isEditing ? (
            <select
              name="fontSize"
              value={user.preferences.fontSize}
              onChange={handleInputChange}
              className="profile-select"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          ) : (
            <span>{user.preferences.fontSize}</span>
          )}
        </div>

        <div className="preference-item">
          <label>
            {isEditing ? (
              <input
                type="checkbox"
                name="remindersEnabled"
                checked={user.preferences.remindersEnabled}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="checkbox"
                checked={user.preferences.remindersEnabled}
                readOnly
                disabled
              />
            )}
            <span>Enable Reminders</span>
          </label>
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button">
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
