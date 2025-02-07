import { Request, Response } from "express";

// Controller to generate AI-Readme.md
export const GenerateReadme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { githubUrl } = req.body;

    res.json({});
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
