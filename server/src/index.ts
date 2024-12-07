// index.ts
import express from "express";

import notesRouter from "./routes/notes.ts";
import usersRouter from "./routes/users.ts";

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", notesRouter);
app.use("/api/notes", usersRouter);

export default app;
