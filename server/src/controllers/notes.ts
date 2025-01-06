import { Request, Response } from "express";
import Note, { NoteInterface } from "../models/NoteSchema.ts";

const getAllNotes = async (req: Request, res: Response) => {
  res.send("GET request /api/notes/:userID");
  // ** TO DO ** //
};

const getNote = async (req: Request, res: Response) => {
  res.send("GET request /api/notes/:userID/:noteID");
  // ** TO DO ** //
};

const getSummary = async (req: Request, res: Response) => {
  res.send("POST request /api/notes/summary");
  // ** TO DO ** //
};

const saveNote = async (req: Request, res: Response) => {
  res.send("PUT request /api/notes/save/:noteID");
  // ** TO DO ** //
};

const deleteNote = async (req: Request, res: Response) => {
  res.send("DELETE request /api/notes/delete/:noteID");
  // ** TO DO ** //
};

export { getAllNotes, getNote, getSummary, saveNote, deleteNote };
