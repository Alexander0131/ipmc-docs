import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
