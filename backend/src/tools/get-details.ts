import axios from "axios";
import type { FileDescriptions, GithubRepo, Headers } from "../types/types.js";

export const GetProjectData = async (
  repo: GithubRepo,
  headers: Headers,
  path = ""
) => {
  const { githubUser, githubRepo } = repo;

  const apiUrl = `${process.env.GITHUB_API_URL}/${githubUser}/${githubRepo}/contents/${path}`;

  // Make a GET request to the GitHub API
  const response = await axios.get(apiUrl, { headers });

  // Object to store file paths and their contents
  const fileData: FileDescriptions = {};

  // Process each item in the directory
  for (const item of response.data) {
    // Ignore files that start with "package" or "README"
    if (
      item.type === "file" &&
      !item.name.toLowerCase().startsWith("package") &&
      !item.name.toLowerCase().startsWith("readme")
    ) {
      // Check if the file is a video, audio, or image
      const fileExtension = item.name.split(".").pop().toLowerCase();
      const mediaExtensions = [
        // Image extensions
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "svg",
        // Video extensions
        "mp4",
        "mkv",
        "avi",
        "mov",
        "flv",
        "wmv",
        // Audio extensions
        "mp3",
        "wav",
        "ogg",
        "flac",
        "aac",
      ];

      if (!mediaExtensions.includes(fileExtension)) {
        // If it's not a media file, fetch its content
        const fileResponse = await axios.get(item.download_url, { headers });
        fileData[item.path] = fileResponse.data; // Store file content
      }
    } else if (item.type === "dir") {
      // If it's a directory, recursively fetch its contents
      const dirData = await GetProjectData(repo, headers, item.path);
      Object.assign(fileData, dirData); // Merge directory contents into fileData
    }
  }
  return fileData;
};
