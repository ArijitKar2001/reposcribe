import express from "express";
import { GenerateReadme } from "../controllers/readme.controllers";

const readmeRouter = express.Router();

readmeRouter.post("/generate-ai-readme", GenerateReadme);

export default readmeRouter;
