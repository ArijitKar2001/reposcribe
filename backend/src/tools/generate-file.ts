import axios from "axios";
import { FileDescriptions } from "../types/types.js";

export const ExtractFeature = async (project: FileDescriptions) => {
  let refinedProject: FileDescriptions = {};
  for (let key in project) {
    const response = await axios.post(
      process.env.OPENAI_API_URL || "",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `${process.env.CODE_PROMPT} - ${JSON.stringify(
              project[key]
            )}`,
          },
        ],
        max_tokens: 5000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    refinedProject[key] = response.data.choices[0].message.content;
  }

  return refinedProject;
};

export const GenerateReadmeAI = async (project: FileDescriptions) => {
  const response = await axios.post(
    process.env.OPENAI_API_URL || "",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${process.env.GEN_PROMPT} - ${JSON.stringify(project)}`,
        },
      ],
      max_tokens: 5000,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
};
