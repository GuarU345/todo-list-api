import mongoose from "mongoose";

const { model, Schema } = mongoose;

const tokenSchema = new Schema(
  {
    jwtSecretKey: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

tokenSchema.set("timestamps", true);

export const Token = model("Token", tokenSchema);
