import { z } from "zod";
import {
  CustomReturnSchema,
  GitHubUrlSchema,
  OwnerAndRepoSchema,
} from "./schema";

// Github Url
export type GitHubUrl = z.infer<typeof GitHubUrlSchema>;

// Owner and Repo
export type OwnerAndRepo = z.infer<typeof OwnerAndRepoSchema>;

// Custom return
export type CustomReturn<T> = z.infer<ReturnType<typeof CustomReturnSchema<T>>>;
