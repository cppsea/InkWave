import mongoose, { Schema, Document } from "mongoose";

export interface SummaryInterface extends Document {
    _id : mongoose.Types.ObjectId,
    pdf : mongoose.Types.Buffer,
}

const SummarySchema : Schema = new Schema({
    _id: Schema.Types.ObjectId,
    image: Schema.Types.Buffer,
})

const Summary = mongoose.model("Summary", SummarySchema);
export default Summary;