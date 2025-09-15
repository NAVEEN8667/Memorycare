const express = require("express");
const router = express.Router();
const VoiceNote = require("../models/VoiceNote");

// @route   GET /api/voicenotes
// @desc    Get all voice notes
router.get("/voicenotes", async (req, res) => {
  try {
    const notes = await VoiceNote.find().sort({ date: -1 }); // Newest first
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/voicenotes
// @desc    Save a new voice note
router.post("/voicenotes", async (req, res) => {
  const { name, audioData, date } = req.body;

  try {
    const newNote = new VoiceNote({
      name,
      audioData,
      date,
    });

    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/voicenotes/:id
// @desc    Delete a voice note
router.delete("/voicenotes/:id", async (req, res) => {
  try {
    const note = await VoiceNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    await note.deleteOne();

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
