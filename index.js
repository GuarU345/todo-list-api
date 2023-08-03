import express from "express";
import cors from "cors";
import { connectMongoose } from "./mongo.js";
import router from "./routes/routes.js";
import morgan from "morgan";
import { config } from "dotenv";

config({
  path: "./.env",
});

connectMongoose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("", router);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
