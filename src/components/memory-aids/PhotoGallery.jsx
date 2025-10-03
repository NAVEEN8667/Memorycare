import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiX, FiUser } from "react-icons/fi";
import "./photogallery.css";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

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
