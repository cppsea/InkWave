import express, { Request, Response } from "express";

const router = express.Router();

/**
 * Retrieves all notes for a user
 * @route GET /api/notes/:userID
 */
router.get("/:userID", async (req: Request, res: Response) => {
  res.send("GET request to the homepage");
  // ** TO DO ** //
});

/**
 * Retrieves a specific note for a user
 * @route GET /api/notes/:userID/:noteID
 */
router.get("/:userID/:noteID", async (req: Request, res: Response) => {
  res.send("GET request to the homepage");
  // ** TO DO ** //
});

/**
 * Receive an image and sends it to the ML models
 * @route POST /api/notes/summary
 */
router.post("/summary", async (req: Request, res: Response) => {
  res.send("POST request to the homepage");
  // ** TO DO ** //
});

/**
 * Handles saving a note to the database (editing purposes)
 * @route PUT /api/notes/save/:id
 */
router.put("/save/:noteID", async (req: Request, res: Response) => {
  res.send("PUT request to the homepage");
  // ** TO DO ** //
});

/**
 * Handles deleting a note from the database
 * @route DELETE /api/notes/delete/:id
 */
router.delete("/delete/:noteID", async (req: Request, res: Response) => {
  res.send("DELETE request to the homepage");
  // ** TO DO ** //
});

export default router;
