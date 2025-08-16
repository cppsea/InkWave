import mongoose, { Schema, Document } from "mongoose";

export interface ImageInterface extends Document {
    _id : mongoose.Types.ObjectId,
    image : mongoose.Types.Buffer,
}

const ImageSchema : Schema<ImageInterface> = new Schema<ImageInterface>({
    _id: Schema.Types.ObjectId,
    image: Schema.Types.Buffer,
});

const Image = mongoose.model<ImageInterface>("Image", ImageSchema);
export default Image;