// index.ts
import express from "express";
const cors = require("cors");

import authRouter from "./routes/auth.ts";
import notesRouter from "./routes/notes.ts";
import usersRouter from "./routes/users.ts";
import testRouter from "./routes/test.ts";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/test", testRouter);

export default app;
