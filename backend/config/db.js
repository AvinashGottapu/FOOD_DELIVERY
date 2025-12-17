import mongoose from 'mongoose'

export const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};