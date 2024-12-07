// index.ts
import express from "express";

import notesRouter from "./routes/notes.ts";
import usersRouter from "./routes/users.ts";

const app = express();

app.use(express.json());

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

export default app;
