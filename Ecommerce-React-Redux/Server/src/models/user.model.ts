import mongoose, { Document, Schema } from "mongoose";
import argon2 from "argon2";
import { APIError } from "../middleware/errorHandler";

// 1️⃣ Define TypeScript interface for your User document
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2️⃣ Create schema based on interface
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// 3️⃣ Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (user.isModified("password")) {
    try {
      user.password = await argon2.hash(user.password);
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next(); // always call next()
  }
});

// 4️⃣ Compare password during login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    throw new APIError("Password compare failed", 400);
  }
};

// 5️⃣ Index for quick text searches on name
userSchema.index({ name: "text" });

// 6️⃣ Model setup
export const User = mongoose.model<IUser>("User", userSchema);
