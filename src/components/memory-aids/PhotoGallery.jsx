import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { FiPlus, FiX, FiUser, FiLoader } from "react-icons/fi";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.id = "photo-gallery-styles";
    styleElement.textContent = `
      .photo-gallery { max-width: 1100px; margin: 0 auto; padding: 24px; font-family: 'Segoe UI', Arial, sans-serif; }
      .photo-gallery h2 { color: #333; font-size: 2rem; font-weight: 600; margin-bottom: 8px; }
      .error-message { background: #FFF3E0; border: 2px solid #F5A623; color: #8B5A00; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(245, 166, 35, 0.15); }
      .dismiss-btn { background: transparent; border: none; color: #8B5A00; cursor: pointer; padding: 6px; border-radius: 6px; transition: all 0.2s; }
      .dismiss-btn:hover { background: rgba(245, 166, 35, 0.2); }
      .upload-section { background: #FFF; border: 2px solid #E0E0E0; border-radius: 12px; padding: 24px; margin-bottom: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
      .upload-section input[type="text"] { flex: 1; padding: 12px 14px; border: 2px solid #E0E0E0; border-radius: 8px; font-size: 1rem; font-family: 'Segoe UI', Arial, sans-serif; color: #333; transition: all 0.2s; }
      .upload-section input[type="text"]:focus { outline: none; border-color: #4A90E2; box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1); }
      .upload-btn { background: #50E3C2; color: #fff; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 4px 12px rgba(80, 227, 194, 0.3); }
      .upload-btn:hover { background: #3DCFB0; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(80,227,194,0.4); }
      .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
      .photo-card { background: #FFF; border: 2px solid #E0E0E0; border-radius: 12px; overflow: hidden; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
      .photo-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(74,144,226,0.15); border-color: #4A90E2; }
      .photo-card img { width: 100%; height: 200px; object-fit: cover; }
      .photo-tag { padding: 16px; display: flex; align-items: center; gap: 8px; color: #333; font-weight: 600; }
      .delete-btn { background: transparent; border: 2px solid #E0E0E0; color: #F5A623; padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
      .delete-btn:hover { background: #F5A623; border-color: #F5A623; color: white; transform: scale(1.1); }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      .loading-icon { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById("photo-gallery-styles");
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  // Fetch photos
  const fetchPhotos = async () => {
    try {
      setError("");
      setLoading(true);
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPhotos(data);
    } catch (err) {
      console.error(err);
      setError("Could not load photos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Handle file selection
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewPhoto(file);
  };

  // Add photo
  const addPhoto = async () => {
    if (!newPhoto) return;
    try {
      setError("");
      setLoading(true);

      const fileName = `${Date.now()}_${newPhoto.name}`;

      // Upload file
      const { data: storageData, error: storageError } = await supabase.storage
        .from("photos")
        .upload(fileName, newPhoto);

      if (storageError) throw storageError;

      // Get public URL
      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("photos").getPublicUrl(fileName);

      if (urlError || !publicUrl) throw new Error("Failed to get public URL");

      // Insert into DB
      const { data: dbData, error: dbError } = await supabase
        .from("photos")
        .insert([{ name: tagName || "Untitled", image_url: publicUrl }])
        .select();

      if (dbError) throw dbError;

      setPhotos([dbData[0], ...photos]);
      setNewPhoto(null);
      setTagName("");
    } catch (err) {
      console.error(err);
      setError("Failed to add photo.");
    } finally {
      setLoading(false);
    }
  };

  // Delete photo
  const deletePhoto = async (id, fileUrl) => {
    try {
      setError("");
      setLoading(true);

      // Extract file path from URL
      const url = new URL(fileUrl);
      const filePath = url.pathname.split("/").pop();

      const { error: storageError } = await supabase.storage
        .from("photos")
        .remove([filePath]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("photos")
        .delete()
        .eq("id", id);
      if (dbError) throw dbError;

      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery (Elderly Care)</h2>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button className="dismiss-btn" onClick={() => setError("")}>
            <FiX />
          </button>
        </div>
      )}

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        <input
          type="text"
          placeholder="Tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button
          className="upload-btn"
          onClick={addPhoto}
          disabled={!newPhoto || loading}
        >
          {loading ? <FiLoader className="loading-icon" /> : <FiPlus />} Add
          Photo
        </button>
      </div>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.image_url} alt={photo.name} />
            <div className="photo-tag">
              <FiUser /> {photo.name}
            </div>
            <button
              className="delete-btn"
              onClick={() => deletePhoto(photo.id, photo.image_url)}
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
