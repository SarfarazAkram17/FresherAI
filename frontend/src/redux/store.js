import { configureStore } from "@reduxjs/toolkit";
import resumeSlice from "../redux/resumeSlice";

export const store = configureStore({
  reducer: {
    resume: resumeSlice,
  },
});