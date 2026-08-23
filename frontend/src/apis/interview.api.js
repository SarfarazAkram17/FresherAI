import api from "../utils/axios";

export const startInterview = async (data) => {
  try {
    const res = await api.post("/api/interview/start", data);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getInterview = async (id) => {
  try {
    const res = await api.get(`/api/interview/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const submitAnswer = async (data) => {
  try {
    const res = await api.post(`/api/interview/answer`, data);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllInterviews = async () => {
  try {
    const res = await api.get("/api/interview/all");
    return res.data;
  } catch (error) {
    return null;
  }
};