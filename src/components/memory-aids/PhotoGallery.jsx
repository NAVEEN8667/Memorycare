import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiX, FiUser } from "react-icons/fi";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'photo-gallery-styles';
    styleElement.textContent = `
      .photo-gallery {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .photo-gallery h2 {
        color: #333333;
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .photo-gallery p {
        color: #666666;
        font-size: 1.0625rem;
        margin-bottom: 24px;
      }

      .error-message {
        background: #FFF3E0;
        border: 2px solid #F5A623;
        color: #8B5A00;
        padding: 14px 18px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(245, 166, 35, 0.15);
      }

      .dismiss-btn {
        background: transparent;
        border: none;
        color: #8B5A00;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .dismiss-btn:hover {
        background: rgba(245, 166, 35, 0.2);
      }

      .upload-section {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 32px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .upload-controls {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
      }

      .upload-btn {
        background: #50E3C2;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(80, 227, 194, 0.3);
      }

      .upload-btn:hover {
        background: #3DCFB0;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(80, 227, 194, 0.4);
      }

      .upload-btn input {
        display: none;
      }

      .upload-controls input[type="text"] {
        flex: 1;
        padding: 12px 14px;
        border: 2px solid #E0E0E0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: 'Segoe UI', Arial, sans-serif;
        color: #333333;
        transition: all 0.2s;
      }

      .upload-controls input[type="text"]:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
      }

      .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .btn-primary {
        background: #4A90E2;
        color: white;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
      }

      .btn-primary:hover {
        background: #3A7BC8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
      }

      .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }

      .photo-card {
        background: #FFFFFF;
        border: 2px solid #E0E0E0;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .photo-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(74, 144, 226, 0.15);
        border-color: #4A90E2;
      }

      .photo-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .photo-info {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .photo-name {
        color: #333333;
        font-weight: 600;
        font-size: 1rem;
      }

      .delete-btn {
        background: transparent;
        border: 2px solid #E0E0E0;
        color: #F5A623;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .delete-btn:hover {
        background: #F5A623;
        border-color: #F5A623;
        color: white;
        transform: scale(1.1);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('photo-gallery-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Fetch photos on component mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setError("");
        const res = await axios.get("http://localhost:5000/api/photos");
        setPhotos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Could not load photos. Please check if the server is running.");
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPhoto({
          url: event.target.result,
          name: tagName || "Untitled",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = async () => {
    if (newPhoto) {
      try {
        setError("");
        const res = await axios.post("http://localhost:5000/api/photos", {
          name: newPhoto.name,
          imageData: newPhoto.url,
        });

        setPhotos([res.data, ...photos]); // update gallery with new photo
        setNewPhoto(null);
        setTagName("");
      } catch (err) {
        console.error("Error saving photo to DB:", err);
        setError("Failed to save photo. Please try again.");
      }
    }
  };

  const deletePhoto = async (id) => {
    try {
      setError("");
      await axios.delete(`http://localhost:5000/api/photos/${id}`);
      setPhotos((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      console.error("Error deleting photo:", err);
      setError("Failed to delete photo. Please try again.");
    }
  };

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery (Elderly Care)</h2>
      <p>Add photos of important people and places with large, readable labels</p>

      {error && (
        <div className="error-message" role="status" aria-live="polite">
          <span>{error}</span>
          <button className="dismiss-btn" onClick={() => setError("")} aria-label="Dismiss message">
            <FiX />
          </button>
        </div>
      )}

      <div className="upload-section">
        <div className="upload-controls">
          <label className="upload-btn" aria-label="Select a photo to upload">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            <FiPlus /> Select Photo
          </label>
          <input
            type="text"
            placeholder="Tag name (e.g., My Daughter)"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            aria-label="Name for the photo"
          />
          {newPhoto && (
            <button onClick={addPhoto} className="btn btn-primary" aria-label="Add photo">
              Add Photo
            </button>
          )}
        </div>

        {newPhoto && (
          <div className="photo-preview">
            <img src={newPhoto.url} alt="Selected photo preview" />
            <span>{newPhoto.name}</span>
          </div>
        )}
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo._id || photo.id} className="photo-card">
            <div className="photo-actions">
              <button className="delete-btn" aria-label="Delete photo" onClick={() => deletePhoto(photo._id || photo.id)}>
                <FiX />
              </button>
            </div>
            <div className="photo-container">
              <img src={photo.imageData} alt={photo.name || "Photo"} />
            </div>
            <div className="photo-tag">
              <FiUser /> {photo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
