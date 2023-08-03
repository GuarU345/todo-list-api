import express from "express";
import { connectMongoose } from "./mongo.js";

connectMongoose();
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello hello");
});

app.listen(3000, () => {
  console.log(`server listen on port ${PORT}`);
});
