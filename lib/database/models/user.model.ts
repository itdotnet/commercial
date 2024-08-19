import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String},
    photo: { type: String, required: true },

});

const User = model('User', UserSchema);

export default User;