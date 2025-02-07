import { OwnerAndRepoSchema } from "../types/schema";
import { CustomReturn, GitHubUrl, OwnerAndRepo } from "../types/types";

// Extracting owner and repo from the provided URL
export const GetOwnerAndRepo = (url: string): OwnerAndRepo => {
  const urlParts = url.split("/");
  const RepoOwner = urlParts[urlParts.length - 2];
  const Repo = urlParts[urlParts.length - 1].replace(/\.git$/, "");
  return { RepoOwner, Repo };
};

// Validating and constructing the final URL
export const GetRefinedUrl = (url: string): CustomReturn<GitHubUrl> => {
  const OwnerAndRepo = GetOwnerAndRepo(url);
  const validatedData = OwnerAndRepoSchema.safeParse(OwnerAndRepo);
  if (validatedData.success) {
    return {
      success: true,
      data: `https://github.com/${validatedData.data.RepoOwner}/${validatedData.data.Repo}`,
    };
  } else {
    return { success: false, error: validatedData.error.errors };
  }
};
