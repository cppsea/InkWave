const express = require("express");
const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO_DB;

const app = express();

app.use(express.json()); // Middleware for parsing JSON requests

// Mount user routes
app.use("/api/user", userRoutes);

// Mount note routes
app.use("/api/notes", noteRoutes);

// ** TO DO: Start the server here (below) **
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // if db connection is successful, then start the server
    app.listen(process.env.PORT || 3000);
    console.log(`Server is running on http://localhost:3000`);
  })
  .catch((err) => {
    console.log("Connection to DB Cluster failed.");
    console.log(err);
  });
