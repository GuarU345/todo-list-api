import express from "express";
import cors from "cors";
import { router } from "./routes/routes";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
