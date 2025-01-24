import mongoose, { Schema, Document } from "mongoose";
import { ImageInterface } from "./ImageSchema";
import { SummaryInterface } from "./SummarySchema";

export interface NoteInterface extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: mongoose.Types.ObjectId | ImageInterface;
  md: mongoose.Types.ObjectId | SummaryInterface;
  lastUpdated: Date;
}

const NoteSchema: Schema = new Schema<NoteInterface>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    default: new Date(Date.now()).toString(),
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  md: {
    type: Schema.Types.ObjectId,
    ref: "Summary",
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Note = mongoose.model<NoteInterface>("Note", NoteSchema);
export default Note;
