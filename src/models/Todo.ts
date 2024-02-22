import mongoose from "mongoose";

const { model, Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: String,
    completed: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export const Todo = model("Todo", todoSchema);
