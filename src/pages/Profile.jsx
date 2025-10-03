// src/pages/Profile.jsx
import { useState, useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'profile-styles';
    styleElement.textContent = `
      .profile-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px;
        background: #F7F7F7;
        min-height: 100vh;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .profile-container h1 {
        color: #333333;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 32px;
        text-align: center;
      }

      .profile-header {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        margin-bottom: 24px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        gap: 32px;
      }

      .profile-picture-container {
        position: relative;
      }

      .profile-picture {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #4A90E2;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .image-upload {
        margin-top: 12px;
      }

      .upload-button {
        background: #4A90E2;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: inline-block;
      }

      .upload-button:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
      }

      .profile-info {
        flex: 1;
      }

      .profile-info h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .profile-info p {
        color: #666666;
        font-size: 1.0625rem;
      }

      .profile-input {
        width: 100%;
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        margin-bottom: 12px;
        transition: all 0.2s;
      }

      .profile-input:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .profile-details, .profile-preferences {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        margin-bottom: 24px;
        border: 2px solid #E0E0E0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .profile-details h3, .profile-preferences h3 {
        color: #333333;
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #50E3C2;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #E0E0E0;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-label {
        color: #666666;
        font-weight: 600;
        font-size: 1rem;
      }

      .detail-row span:last-child {
        color: #333333;
        font-size: 1rem;
      }

      .preference-item {
        padding: 16px 0;
        border-bottom: 1px solid #E0E0E0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .preference-item:last-child {
        border-bottom: none;
      }

      .preference-item label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        color: #333333;
        font-weight: 600;
        font-size: 1rem;
      }

      .preference-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: #4A90E2;
      }

      .preference-label {
        color: #666666;
        font-weight: 600;
        font-size: 1rem;
      }

      .profile-select {
        padding: 10px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        cursor: pointer;
        transition: all 0.2s;
      }

      .profile-select:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .profile-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-top: 32px;
      }

      .save-button, .edit-button {
        background: #4A90E2;
        color: white;
        padding: 14px 32px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .save-button:hover, .edit-button:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }

      .cancel-button {
        background: #F7F7F7;
        color: #333333;
        padding: 14px 32px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .cancel-button:hover {
        background: #E0E0E0;
        transform: translateY(-2px);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('profile-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

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
