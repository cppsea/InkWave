// index.ts
import express from "express";

import notesRouter from "./routes/noteRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", notesRouter);
app.use("/api/notes", userRouter);

export default app;
