import { z } from "zod";
import {
  CustomReturnSchema,
  FileDescriptionsSchema,
  GithubRepoSchema,
  GitHubUrlSchema,
  HeadersSchema,
} from "./schema.js";

// Github Url
export type GitHubUrl = z.infer<typeof GitHubUrlSchema>;

// Github Repository details
export type GithubRepo = z.infer<typeof GithubRepoSchema>;

// Custom return
export type CustomReturn<T> = z.infer<ReturnType<typeof CustomReturnSchema<T>>>;

// File Descriptions
export type FileDescriptions = z.infer<typeof FileDescriptionsSchema>;

// Headers
export type Headers = z.infer<typeof HeadersSchema>;
