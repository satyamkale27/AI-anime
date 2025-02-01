import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
