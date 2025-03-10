import mongoose from "mongoose";

let isConnected = false; // variable to check the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("✅ Already connected to MongoDB.");

  // continue to connect DB,TIMEOUTS
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000, // 增加连接超时时间为30秒
      socketTimeoutMS: 30000, // 增加请求超时时间
    });

    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1); // 发生错误时退出进程
  }
};
