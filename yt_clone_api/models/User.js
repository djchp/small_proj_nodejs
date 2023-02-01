import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String
    },
    img: {
      type: String,
    },
    subs: {
      type: Number,
      required: true,
      default: 0,
    },
    subscribedCh: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema)