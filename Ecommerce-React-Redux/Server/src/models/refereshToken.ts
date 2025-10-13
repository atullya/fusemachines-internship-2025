import mongoose from "mongoose";
const refereshTokenSchema=new mongoose.Schema(
    {
    token: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
refereshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const RefereshToken = mongoose.model("RefereshToken", refereshTokenSchema);