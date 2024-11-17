const express = require("express");
const noteController = require("../controllers/note.controller");

const router = express.Router();

// Route to generate note summary from image
router.post("/summary", noteController.generateSummary);

// Route to save edits of a generated summary
router.post("/save", noteController.saveNote);

// Route to retrieve all generated notes for the user
router.get("/dashboard", noteController.getNotes);

// Route to retrieve a specific note by ID
router.get("/dashboard/:id", noteController.getNoteById);

module.exports = router;
