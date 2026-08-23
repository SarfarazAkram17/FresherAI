import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js";
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js";

export const interviewAgent = async (data) => {
  const prompt =
    data?.type?.toLowerCase() === "hr"
      ? hrInterviewPrompt(data)
      : technicalInterviewPrompt(data);

  const res = await llm.invoke(prompt);
  try {
    const cleaned = res.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("Interview Agent Parse Error");
    console.log(res.content);

    throw new Error("Failed to generate interview questions.");
  }
};
