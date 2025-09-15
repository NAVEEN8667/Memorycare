import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiX, FiUser } from "react-icons/fi";
import "./photogallery.css";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tagName, setTagName] = useState("");

  // Fetch photos on component mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/photos");
        setPhotos(res.data); // assuming response is an array of photos
      } catch (err) {
        console.error("Error fetching photos:", err);
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
        const res = await axios.post("http://localhost:5000/api/photos", {
          name: newPhoto.name,
          imageData: newPhoto.url,
        });

        setPhotos([res.data, ...photos]); // update gallery with new photo
        setNewPhoto(null);
        setTagName("");
      } catch (err) {
        console.error("Error saving photo to DB:", err);
      }
    }
  };

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery</h2>
      <p>Add photos of important people and places with names</p>

      <div className="upload-section">
        <div className="upload-controls">
          <label className="upload-btn">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            <FiPlus /> Select Photo
          </label>
          <input
            type="text"
            placeholder="Tag name (e.g., My Daughter)"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          {newPhoto && (
            <button onClick={addPhoto} className="btn btn-primary">
              Add Photo
            </button>
          )}
        </div>

        {newPhoto && (
          <div className="photo-preview">
            <img src={newPhoto.url} alt="Preview" />
            <span>{newPhoto.name}</span>
          </div>
        )}
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo._id || photo.id} className="photo-card">
            <div className="photo-actions">
              <button className="delete-btn">
                <FiX />
              </button>
            </div>
            <div className="photo-container">
              <img src={photo.imageData} alt={photo.name} />
            </div>
            <div className="photo-tag">
              <FiUser /> {photo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
