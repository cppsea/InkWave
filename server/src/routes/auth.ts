import express, { Request, Response } from "express";
import * as authController from "../controllers/auth.ts";

const router = express.Router();

/**
 * Handles user login and authentication
 * @route POST /api/auth/login
 */
router.post("/login", authController.login);

/**
 * Handles user registration
 * @route POST /api/auth/register
 */
router.post("/register", authController.register);

/**
 * Handles forgot password
 * @route POST /api/auth/forgot-password
 */
router.post("/forgot-password", authController.forgotPassword);

export default router;
