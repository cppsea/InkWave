// server.ts
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@inkwave.6yrch.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=inkwave`;
const port: string | number = process.env.PORT || 1400;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection to DB Cluster failed.", err);
  });
