const {
  generateSummaryFromImage,
  saveNoteToDatabase,
  getAllNotes,
  getNoteById,
} = require("../models/Notes/note.service");

exports.generateSummary = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }
    const summary = await generateSummaryFromImage(image);
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveNote = async (req, res) => {
  try {
    const noteData = req.body;
    if (!noteData || !noteData.title || !noteData.content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    await saveNoteToDatabase(noteData);
    res.status(201).json({ message: "Note saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming user ID is available in the request object
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const notes = await getAllNotes(userId);
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id: noteId } = req.params;
    if (!noteId) {
      return res.status(400).json({ error: "Note ID is required" });
    }
    const note = await getNoteById(noteId);
    if (note) {
      res.status(200).json({ note });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
