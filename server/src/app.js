const express = require("express");
const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(express.json()); // Middleware for parsing JSON requests

// Mount user routes
app.use("/api/user", userRoutes);

// Mount note routes
app.use("/api/notes", noteRoutes);

// ** TO DO: Start the server here (below) **
