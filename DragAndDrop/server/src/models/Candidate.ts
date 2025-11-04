import { Schema, model, InferSchemaType } from "mongoose";

export const STAGES = [
  "preliminary",
  "technical",
  "additional",
  "client",
  "selection",
] as const;
export type Stage = (typeof STAGES)[number];

const candidateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    roleTitle: { type: String, required: true, trim: true },
    stage: { type: String, enum: STAGES, default: "preliminary", index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

candidateSchema.index({ stage: 1, order: 1 });

export type Candidate = InferSchemaType<typeof candidateSchema>;
export default model("Candidate", candidateSchema);
