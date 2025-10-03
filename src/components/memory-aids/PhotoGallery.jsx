import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { FiPlus, FiX, FiUser, FiLoader } from "react-icons/fi";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Add photo to Supabase Storage + DB
  const addPhoto = async () => {
    if (!newPhoto) return;
    try {
      setError("");
      setLoading(true);

      // Upload file to storage
      const fileName = `${Date.now()}_${newPhoto.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("photos")
        .upload(fileName, newPhoto);

      if (storageError) throw storageError;

      // Get public URL
      const { publicURL, error: urlError } = supabase.storage
        .from("photos")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      // Insert metadata in DB
      const { data: dbData, error: dbError } = await supabase
        .from("photos")
        .insert([{ name: tagName || "Untitled", image_url: publicURL }])
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
  const deletePhoto = async (id, filePath) => {
    try {
      setError("");
      setLoading(true);

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("photos")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from DB
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
          <button onClick={() => setError("")}>
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
        <button onClick={addPhoto} disabled={!newPhoto || loading}>
          {loading ? <FiLoader /> : <FiPlus />} Add Photo
        </button>
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.image_url} alt={photo.name} />
            <div className="photo-tag">
              <FiUser /> {photo.name}
            </div>
            <button onClick={() => deletePhoto(photo.id, photo.image_url)}>
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
