import mongoose, { Schema, Document } from "mongoose";

export interface SummaryInterface extends Document {
    _id : mongoose.Types.ObjectId,
    pdf : mongoose.Types.Buffer,
}

const SummarySchema : Schema<SummaryInterface> = new Schema({
    _id: Schema.Types.ObjectId,
    pdf: Schema.Types.Buffer,
})

const Summary = mongoose.model<SummaryInterface>("Summary", SummarySchema);
export default Summary;