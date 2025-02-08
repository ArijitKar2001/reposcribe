import { Request, Response } from "express";
import { GetProjectData } from "../tools/generate-readme.js";
import { GetRepoDetails } from "../utils/urls.js";

// Controller to generate AI-Readme.md
export const GenerateReadme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { githublink } = req.body;
    console.log("git link : ", githublink);
    const resGitDetails = GetRepoDetails(githublink);
    if (!resGitDetails.success) {
      throw new Error(`${resGitDetails.error}`);
    }

    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API_KEY || ""}`,
    };
    console.log(headers);

    console.log("controller");

    const project = await GetProjectData(resGitDetails.data, headers);
    console.log("proj");

    res.status(200).json({ project });
  } catch (error: unknown) {
    res.json({
      success: false,
      error: error,
    });
  }
};
