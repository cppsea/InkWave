import { Request, Response } from "express";
import Note, { NoteInterface } from "../models/NoteSchema.ts";

const login = async (req: Request, res: Response) => {
  res.send("POST request /api/auth/login");
  // ** TO DO ** //
};

const register = async (req: Request, res: Response) => {
  res.send("POST request /api/auth/register");
  // ** TO DO ** //
};

const forgotPassword = async (req: Request, res: Response) => {
  res.send("POST request /api/auth/forgot-password");
  // ** TO DO ** //
};

export { login, register, forgotPassword };
