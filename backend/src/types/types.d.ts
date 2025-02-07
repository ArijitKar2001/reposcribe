import { z } from "zod";
import {
  CustomReturnSchema,
  fileDescriptionsSchema,
  GithubRepoSchema,
  GitHubUrlSchema,
  OwnerAndRepoSchema,
} from "./schema";

// Github Url
export type GitHubUrl = z.infer<typeof GitHubUrlSchema>;

// Github Repository details
type GithubRepo = z.infer<typeof GithubRepoSchema>;

// Custom return
export type CustomReturn<T> = z.infer<ReturnType<typeof CustomReturnSchema<T>>>;

// File Descriptions
export type FileDescriptions = z.infer<typeof fileDescriptionsSchema>;

// Headers
export type Headers = z.infer<typeof headersSchema>;
