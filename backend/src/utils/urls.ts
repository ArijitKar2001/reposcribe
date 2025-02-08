import { GitHubUrlSchema } from "../types/schema.js";
import { CustomReturn, GithubRepo } from "../types/types.js";

// Validate url and returned owner and repo and refined url from the provided URL
export const GetRepoDetails = (url: string): CustomReturn<GithubRepo> => {
  const githubUrl = GitHubUrlSchema.safeParse(url);
  if (githubUrl.success) {
    const urlParts = url.split("/");
    const RepoOwner = urlParts[urlParts.length - 2];
    const Repo = urlParts[urlParts.length - 1].replace(/\.git$/, "");
    const finalGithubUrl = `https://github.com/${RepoOwner}/${Repo}`;
    return {
      success: true,
      data: {
        githubUser: RepoOwner,
        githubRepo: Repo,
        githubUrl: finalGithubUrl,
      },
    };
  } else {
    return { success: false, error: "Invalid Github URL" };
  }
};
