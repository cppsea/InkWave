import express, { Request, Response } from "express";

const router = express.Router();
const notesController = require("../controllers/notes.ts");

/**
 * Retrieves all notes for a user
 * @route GET /api/notes/:userID
 */
router.get("/:userID", notesController.getAllNotes);

/**
 * Retrieves a specific note for a user
 * @route GET /api/notes/:userID/:noteID
 */
router.get("/:userID/:noteID", notesController.getNote);

/**
 * Receive an image and sends it to the ML models
 * @route POST /api/notes/summary
 */
router.post("/summary", notesController.getSummary);

/**
 * Handles saving a note to the database (editing purposes)
 * @route PUT /api/notes/save/:id
 */
router.put("/save/:noteID", notesController.saveNote);

/**
 * Handles deleting a note from the database
 * @route DELETE /api/notes/delete/:id
 */
router.delete("/delete/:noteID", notesController.deleteNote);

export default router;
