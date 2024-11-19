import mongoose, { Schema, Document } from "mongoose";

export interface ImageInterface extends Document {
    _id : mongoose.Types.ObjectId,
    image : mongoose.Types.Buffer,
}

const ImageSchema : Schema = new Schema({
    _id: Schema.Types.ObjectId,
    image: Schema.Types.Buffer,
});

const Image = mongoose.model("Image", ImageSchema);
export default Image;