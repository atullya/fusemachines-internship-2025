import mongoose from "mongoose";

const SubTodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: true } // let mongoose assign an _id to each subTodo
);

const TODOSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [SubTodoSchema], // embed subtasks directly
  },
  { timestamps: true }
);

TODOSchema.index({ title: 1 })
const Todo = mongoose.model("Todo", TODOSchema);

export default Todo;
