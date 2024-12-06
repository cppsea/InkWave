import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import env from "dotenv";
import noteRoutes from "./routes/noteRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

env.config();
const MONGODB_URI : string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@inkwave.6yrch.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=inkwave`;
const app : Express = express();
const port : string = process.env.PORT || "1400";

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
