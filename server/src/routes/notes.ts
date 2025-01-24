import express, { Request, Response } from "express";
import * as notesController from "../controllers/notes";

const router = express.Router();

/**
 * Retrieves all notes for a user
 * GET /api/notes/:userID
 */
router.get("/:userID", notesController.getAllNotes);

/**
 * Retrieves a specific note for a user
 * GET /api/notes/:userID/:noteID
 */
router.get("/:userID/:noteID", notesController.getNote);

/**
 * Receive an image and sends it to the ML models
 * Assuming no errors occur, this will automatically save the document into the database.
 * POST /api/notes/summary
 */
router.post("/summary", notesController.getSummary);

/**
 * Handles saving a note to the database (editing purposes)
 * PATCH /api/notes/save/:noteID
 *
 * @body {string} name - Name of the note
 * @body {ObjectId} image - Original image/photo
 * @body {ObjectId} md - Markdown file of the summary
 */
router.patch("/save/:noteID", notesController.saveNote);

/**
 * Handles deleting a note from the database
 * DELETE /api/notes/delete/:noteID
 */
router.delete("/delete/:noteID", notesController.deleteNote);

export default router;
