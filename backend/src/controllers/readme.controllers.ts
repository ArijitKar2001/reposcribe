import { Request, Response } from "express";
import { GetProjectData } from "../tools/get-details.js";
import { GetRepoDetails } from "../utils/urls.js";
import { ExtractFeature, GenerateReadmeAI } from "../tools/generate-file.js";

// Controller to generate AI-Readme.md
export const GenerateReadme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { githublink } = req.body;
    const resGitDetails = GetRepoDetails(githublink);
    // console.log(resGitDetails.data);

    if (!resGitDetails.success) {
      throw new Error(`${resGitDetails.error}`);
    }

    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API_KEY || ""}`,
    };

    const project = await GetProjectData(resGitDetails.data, headers);
    // const featuredProject = await ExtractFeature(project);
    // console.log(featuredProject);

    const readmeFile = await GenerateReadmeAI(project);

    res.status(200).json({ success: true, data: readmeFile });
  } catch (error: unknown) {
    res.json({
      success: false,
      error: error,
    });
  }
};
