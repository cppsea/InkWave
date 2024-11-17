const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  objectID: { type: Schema.Types.ObjectId, auto: true },
  image: { type: Buffer, required: true }, // Store binary data
});

module.exports = mongoose.model("Image", ImageSchema);
