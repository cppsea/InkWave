import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    uuid : mongoose.Types.UUID;
    creationDate : Date;
    deletionDate : Date | null;
    lastUpdated : Date;
    email : string;
    password : string;
}

const UserSchema : Schema = new Schema<UserInterface>({
    uuid : {
        type: Schema.Types.UUID,
        unique: true,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    },
    deletionDate: {
        type: Date,
        default: null,
    },
    lastUpdated: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
});

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;