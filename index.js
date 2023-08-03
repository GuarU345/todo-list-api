import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("hello hello");
});

app.listen(3000, () => {
  console.log(`server listen on port ${PORT}`);
});
