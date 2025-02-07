import { GitHubUrlSchema } from "../types/schema";
import { CustomReturn, GithubRepo } from "../types/types";

// Validate url and returned owner and repo and refined url from the provided URL
export const GetOwnerAndRepo = (url: string): CustomReturn<GithubRepo> => {
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

// Validating and constructing the final URL
// export const GetRefinedUrl = (url: string): CustomReturn<GitHubUrl> => {
//   const resOwnerAndRepo = GetOwnerAndRepo(url);
//   if (resOwnerAndRepo.success) {
//     return {
//       success: true,
//       data: `https://github.com/${resOwnerAndRepo.data.RepoOwner}/${resOwnerAndRepo.data.Repo}`,
//     };
//   } else {
//     return { success: false, error: resOwnerAndRepo.error };
//   }
// };
