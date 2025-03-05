import mongoose from "mongoose";

let isConnected = false; // variable to check the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("✅ Already connected to MongoDB.");

  // continue to connect DB
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1); // 发生错误时退出进程
  }
};
