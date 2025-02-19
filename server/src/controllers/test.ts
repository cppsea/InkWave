import { Request, Response } from "express";
import Note from "../models/NoteSchema.ts";
import User from "../models/UserSchema.ts";

/**
 * Retrieves all notes
 * GET /api/test/notes
 */
const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ lastUpdated: -1 });

    // Check if there's any notes
    if (notes.length === 0) {
      res.status(404).send({
        status: "error",
        message: "No notes found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      data: notes,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
    return;
  }
};

/**
 * Retrieves all users
 * GET /api/test/users
 */
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    // Check if there's any users
    if (users.length === 0) {
      res.status(404).send({
        status: "error",
        message: "No users found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
    return;
  }
};

/**
 * Creates a note for a user
 * POST /api/test/create
 */
const createNote = async (req: Request, res: Response) => {
  try {
    const { userID, name, image, md } = req.body;

    // Validate required fields
    if (!userID || !name || !md) {
      res.status(400).send({
        status: "error",
        message: "Missing userID, note name, or markdown content",
      });
      return;
    }

    // Check if user exists
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    // Create note
    const note = await Note.create({
      userID,
      name,
      image: image || null,
      md,
      lastUpdated: new Date(),
    });

    res.status(200).send({
      status: "success",
      data: note,
    });
  } catch (err: any) {
    res.status(500).send({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};

export { getNotes, getUsers, createNote };
