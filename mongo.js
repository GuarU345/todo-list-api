import mongoose from "mongoose";
const connectionString =
  "mongodb+srv://admin:admin123@miprimercluster.ityon.mongodb.net/ecommerce?retryWrites=true&w=majority";

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
