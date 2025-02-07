import { z } from "zod";

// Define the GitHub URL regex pattern to validate the GitHub repository URL format
const githubUrlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+(?:\.git)?$/;

// Create a Zod schema to validate the GitHub URL
export const GitHubUrlSchema = z.string().regex(githubUrlRegex, {
  message: "Invalid GitHub repository URL format.",
});

// Define the OwnerAndRepo schema
export const OwnerAndRepoSchema = z.object({
  RepoOwner: z.string().min(1),
  Repo: z.string().min(1),
});

// Define CustomReturn schema that accepts a generic type T
export const CustomReturnSchema = <T>() =>
  z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      data: z.any() as z.ZodType<T>,
      error: z.undefined(),
    }),
    z.object({
      success: z.literal(false),
      data: z.undefined(),
      error: z.unknown(),
    }),
  ]);
