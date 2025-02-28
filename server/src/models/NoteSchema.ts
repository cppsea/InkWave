import mongoose, { Schema, Document } from "mongoose";
import { UserInterface } from "./UserSchema";
import { ImageInterface } from "./ImageSchema";
import { SummaryInterface } from "./SummarySchema";

export interface NoteInterface extends Document {
  userID: mongoose.Types.ObjectId | UserInterface;
  name: string;
  image: mongoose.Types.ObjectId | ImageInterface;
  md: string;
  lastUpdated: Date;
}

const NoteSchema: Schema = new Schema<NoteInterface>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    default: new Date(Date.now()).toString(),
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  md: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Note = mongoose.model<NoteInterface>("Note", NoteSchema);
export default Note;
