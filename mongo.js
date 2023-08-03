import mongoose from "mongoose";
import { config } from "dotenv";
config({
  path: "./.env",
});
const connectionString = process.env.MONGO_DB_URI;

export const connectMongoose = () => {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
