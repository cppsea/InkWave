import mongoose, { Schema, Document } from "mongoose";

export interface SummaryInterface extends Document {
  _id: mongoose.Types.ObjectId;
  md: mongoose.Types.Buffer;
}

const SummarySchema: Schema = new Schema<SummaryInterface>({
  _id: Schema.Types.ObjectId,
  md: Schema.Types.Buffer,
});

const Summary = mongoose.model<SummaryInterface>("Summary", SummarySchema);
export default Summary;
