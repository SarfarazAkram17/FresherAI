import { interviewAgent } from "../agents/interview.agent.js";
import { feedbackAgent } from "../agents/feedback.agent.js";
import { summaryAgent } from "../agents/summary.agent.js";

export const interviewNode = async (state) => {
  const questions = await interviewAgent({
    role: state.role,
    type: state.type,
    useResume: state.useResume,
    resume: state.resume,
  });

  return { questions };
};

export const feedbackNode = async (state) => {
  const feedback = await feedbackAgent({
    question: state.question,
    answer: state.answer,
    difficulty: state.difficulty,
  });

  return { feedback };
};

export const summaryNode = async (state) => {
  const report = await summaryAgent({
    role: state.role,
    type: state.type,
    questions: state.questions,
  });

  return { report };
};
