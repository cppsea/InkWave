import express, { Request, Response } from "express";

const router = express.Router();

/**
 * Handles user login and authentication
 * @route POST /api/auth/login
 */
router.post("/login", async (req: Request, res: Response) => {
  res.send("POST request to the homepage");
  // ** TO DO ** //
});

/**
 * Handles user registration
 * @route POST /api/auth/register
 */
router.post("/register", async (req: Request, res: Response) => {
  res.send("POST request to the homepage");
  // ** TO DO ** //
});

/**
 * Handles forgot password
 * @route POST /api/auth/forgot-password
 */
router.post("/forgot", async (req: Request, res: Response) => {
  res.send("POST request to the homepage");
  // ** TO DO ** //
});

export default router;
