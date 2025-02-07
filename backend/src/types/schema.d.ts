import { z } from "zod";

// Define the GitHub URL regex pattern to validate the GitHub repository URL format
const githubUrlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+(?:\.git)?$/;

// Create a Zod schema to validate the GitHub URL
export const GitHubUrlSchema = z.string().regex(githubUrlRegex, {
  message: "Invalid GitHub repository URL format.",
});

// Define the schema for GithubRepo
const GithubRepoSchema = z.object({
  githubUser: z.string(),
  githubRepo: z.string(),
  githubUrl: z.string().url(), // Ensuring the URL is valid
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

// Define the file holding object
export const fileDescriptionsSchema = z.record(z.string());

// Define the schema for the headers
export const headersSchema = z.object({
  Authorization: z.string().optional(), // Make it optional since the API key may not be defined
});
