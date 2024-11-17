const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  objectID: { type: Schema.Types.ObjectId, auto: true },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to UserSchema (ObjectId)
  name: { type: String, required: true },
  image: { type: Schema.Types.ObjectId, ref: "Image" }, // Reference to ImageSchema (ObjectId)
  pdf: { type: Schema.Types.ObjectId, ref: "Summary" }, // Reference to SummarySchema (ObjectId)
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
