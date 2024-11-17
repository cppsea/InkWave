const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
  deletionDate: { type: Date, default: null },
  lastUpdated: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true }, // Store hashed passwords
});

module.exports = mongoose.model("User", UserSchema);
