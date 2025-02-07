import { Request, Response } from "express";
import { GetProjectData } from "../tools/generate-readme";

// Controller to generate AI-Readme.md
export const GenerateReadme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { githubUrl } = req.body;
    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
    };
    const project = await GetProjectData(githubUrl, headers);

    res.json({ project });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
};
