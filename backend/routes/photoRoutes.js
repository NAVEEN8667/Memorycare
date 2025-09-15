const Photo = require("./models/Photo"); // at the top with other imports

app.post("/api/photos", async (req, res) => {
  try {
    const { name, imageData } = req.body;

    if (!name || !imageData) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const newPhoto = new Photo({ name, imageData });
    const saved = await newPhoto.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving photo:", err);
    res.status(500).json({ message: "Failed to save photo" });
  }
});
