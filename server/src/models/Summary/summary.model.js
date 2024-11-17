const mongoose = require("mongoose");
const { Schema } = mongoose;

const SummarySchema = new Schema({
  objectID: { type: Schema.Types.ObjectId, auto: true },
  pdf: { type: Buffer, required: true }, // Store binary data
});

module.exports = mongoose.model("Summary", SummarySchema);
