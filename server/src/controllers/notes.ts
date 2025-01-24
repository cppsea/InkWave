import { Request, Response } from "express";
import Note, { NoteInterface } from "../models/NoteSchema.ts";

const getAllNotes = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    const notes = await Note.find({ userID }).populate("image").populate("md");
    res.status(200).send({ message: "Notes retrieved successfully", notes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving notes" });
  }
};

const getNote = async (req: Request, res: Response) => {
  try {
    const { userID, noteID } = req.params;
    const note = await Note.findOne({ _id: noteID, userID })
      .populate("image")
      .populate("md");
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }
    res.status(200).send({ message: "Note retrieved successfully", note });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving note" });
  }
};

const getSummary = async (req: Request, res: Response) => {
  res.send("POST request /api/notes/summary");
  // ** TO DO ** //
};

const saveNote = async (req: Request, res: Response) => {
  try {
    const { noteID } = req.params;
    const { name, image, md } = req.body;

    const note = await Note.findById(noteID);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    // Update note data
    note.name = name || note.name;
    note.image = image || note.image;
    note.md = md || note.md;
    note.lastUpdated = new Date();

    const updatedNote = await note.save();
    res
      .status(200)
      .send({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating note" });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteID } = req.params;
    const deletedNote = await Note.findByIdAndDelete(noteID);
    if (!deletedNote) {
      return res.status(404).send({ message: "Note not found" });
    }
    res
      .status(200)
      .send({ message: "Note deleted successfully", note: deletedNote });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting note" });
  }
};

export { getAllNotes, getNote, getSummary, saveNote, deleteNote };
