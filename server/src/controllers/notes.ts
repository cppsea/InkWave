import { Request, Response } from "express";
import Note, { NoteInterface } from "../models/NoteSchema.ts";
import User from "../models/UserSchema.ts";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Retrieves all notes for a user
 * GET /api/notes/:userID
 */
const getAllNotes = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    // Ensure userID is defined
    if (!userID) {
      res.status(400).send({
        status: "error",
        message: "Missing userID",
      });
      return;
    }

    // Check if user exists
    const user = await User.findById(userID);
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const notes = await Note.find({ userID }).sort({ lastUpdated: -1 });

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
 * Retrieves the most recent note for a user
 * GET /api/notes/recent/:userID
 */
const getRecentNote = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    // Ensure userID is defined
    if (!userID) {
      res.status(400).send({
        status: "error",
        message: "Missing userID",
      });
      return;
    }

    // Check if user exists
    const user = await User.findById(userID);
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const note = await Note.findOne({ userID }).sort({ lastUpdated: -1 });

    // Check if note exists
    if (!note) {
      res.status(404).send({
        status: "error",
        message: "No note found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      data: note,
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
 * Retrieves a specific note for a user
 * GET /api/notes/:userID/:noteID
 */
const getNote = async (req: Request, res: Response) => {
  const { userID, noteID } = req.params;
  try {
    // Ensure userID and noteID are defined
    if (!userID || !noteID) {
      res.status(400).send({
        status: "error",
        message: "Missing userID or noteID",
      });
      return;
    }

    // Check if user exists
    const user = await User.findById(userID);
    if (!user) {
      res.status(400).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const note = await Note.find({ userID, _id: noteID });

    // Check if note exists
    if (note.length === 0) {
      res.status(404).send({
        status: "error",
        message: "No note found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      data: note,
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
 * Helper function for getSummary
 * Runs a python subprocess that calls a python script
 * Path: file path of the script to run
 * Args: args passed to python function parameters (e.g., file path of the image)
 * Callback: returns the file path of the output file, expected in the same directory as models.py
 */
const runPython = (path : string, args : string, callback : any) => {
  const pythonProcess = spawn("python", [path].concat(args));
  let data = "";
  
  pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
  });
  pythonProcess.stderr.on("data", (err) => {
      console.error(`stderr: ${err}`);
  });
  pythonProcess.on("close", (code) => {
      if (code != 0) {
          console.log(`${code}`);
      }
      else {
          callback(String(data).replace(/(\r\n|\r|\n)/gm, ""));
      }
  })
}

/**
 * Receive an image and sends it to the ML models
 * Assuming no errors occur, this will automatically save the document into the database.
 * POST /api/notes/summary
 */
const getSummary = async (req: Request, res: Response) => {
  // TODO: update file paths to reflect location of models.py
  try {
    runPython("../../../ml_models/run_cv_llm.py", "./Test Images/digital.png", (result : string) => {
      const txtFile = fs.readFileSync(path.join(__dirname, result), { encoding: 'utf-8' });
      console.log(txtFile);
    })
  }
  catch (err : any) {
    console.error(err);
  }
  res.send("POST request /api/notes/summary");
};

/**
 * Handles saving a note to the database (editing purposes)
 * PATCH /api/notes/save/:noteID
 *
 * @body {string} name - Name of the note
 * @body {ObjectId} image - Original image/photo
 * @body {ObjectId} md - Markdown file of the summary
 */
const saveNote = async (req: Request, res: Response) => {
  const { noteID } = req.params;

  try {
    // Ensure noteID is defined
    if (!noteID) {
      res.status(400).send({
        status: "error",
        message: "Missing noteID",
      });
      return;
    }

    // Find the note and update the necessary fields
    const updatedNote = await Note.findByIdAndUpdate(
      noteID,
      { ...req.body, lastUpdated: new Date() },
      {
        new: true,
      }
    );

    // If no note was found, return an error
    if (!updatedNote) {
      res.status(404).send({
        status: "error",
        message: "Note not found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      data: updatedNote,
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
 * Handles deleting a note from the database
 * DELETE /api/notes/delete/:noteID
 */
const deleteNote = async (req: Request, res: Response) => {
  const { noteID } = req.params;

  try {
    // Ensure noteID is defined
    if (!noteID) {
      res.status(400).send({
        status: "error",
        message: "Missing noteID",
      });
      return;
    }

    // Find the note and delete it
    const deletedNote = await Note.findByIdAndDelete(noteID);

    // If the note isn't found
    if (!deletedNote) {
      res.status(404).send({
        status: "error",
        message: "Note not found",
      });
      return;
    }

    // Good to go
    res.status(200).send({
      status: "success",
      message: "Note successfully deleted",
      data: deletedNote,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
    return;
  }
};

export {
  getAllNotes,
  getNote,
  getRecentNote,
  getSummary,
  saveNote,
  deleteNote,
};
