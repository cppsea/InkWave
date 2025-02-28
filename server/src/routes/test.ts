import express, { Request, Response } from "express";
import * as testController from "../controllers/test";

const router = express.Router();

/**
 * Retrieves all notes
 * GET /api/test/notes
 */
router.get("/notes", testController.getNotes);

/**
 * Retrieves all users
 * GET /api/test/users
 */
router.get("/users", testController.getUsers);

/**
 * Creates a note for a user
 * POST /api/test/create
 */
router.post("/create", testController.createNote);

export default router;
