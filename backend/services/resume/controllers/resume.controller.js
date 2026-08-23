import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume PDF is requried" });
    }

    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId is requried" });
    }

    const resumeText = await extractText(file.path);

    const aiResponse = await resumeAgent(resumeText);

    const resumeData = await JSON.parse(aiResponse);
    console.log(resumeData);

    let resume = await Resume.findOne({ userId });

    if (resume) {
      Object.assign(resume, { ...resumeData, extractedText: resumeText });
      await resume.save();
    } else {
      resume = await Resume.create({
        userId,
        extractedText: resumeText,
        ...resumeData,
      });
    }

    await redis.set(`resume:${userId}`, JSON.stringify(resume));

    await fs.unlinkSync(file.path);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: resume,
    });
  } catch (error) {
    console.log(error)
    if (file) {
      await fs.unlinkSync(file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    const cache = await redis.get(`resume:${userId}`);

    if (cache) {
      return res
        .status(200)
        .json({ success: true, source: "redis", data: JSON.parse(cache) });
    }

    const resume = await Resume.findOne({ userId });
    if (!resume) {
      return res
        .status(400)
        .json({ success: false, message: "Resume not found" });
    }

    await redis.set(`resume:${userId}`, JSON.stringify(resume));

    return res
      .status(200)
      .json({ success: true, source: "mongodb", data: resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
