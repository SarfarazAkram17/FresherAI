import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected db");
  } catch (error) {
    console.log("mongodb error", error);
  }
};
