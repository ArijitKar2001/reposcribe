import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import readmeRouter from "./routes/readme.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", readmeRouter);
console.log("index");

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
