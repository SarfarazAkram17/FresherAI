import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feedbackPrompt.js";

export const feedbackAgent = async (data) => {
  try {
    const prompt = feedbackPrompt(data);

    const res = await llm.invoke(prompt);

    const cleaned = res.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("Feedback Agent Parse Error");
    console.log(res.content);

    throw new Error("Failed to generate feedback.");
  }
};