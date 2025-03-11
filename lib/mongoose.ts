import mongoose from "mongoose";

let isConnected = false; // variable to check the connection status
let isConnecting = false; // connection lock to avoid multiple attempts

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // 检查环境变量
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL environment variable not found.");
    process.exit(1); // 环境变量缺失时退出进程
  }

  // 如果已经连接则返回
  if (isConnected) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }

  // 防止并发连接
  if (isConnecting) {
    console.log("🛑 Connection already in progress...");
    return;
  }

  isConnecting = true; // 设置为连接中状态

  // 连接重试机制
  const retries = 5; // 最大重试次数
  const delay = 5000; // 重试延迟 5 秒

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${retries} to connect to MongoDB...`);
      await mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 30000, // 连接超时设置为30秒
        socketTimeoutMS: 30000, // 请求超时设置为30秒
        useNewUrlParser: true, // 使用新的 MongoDB 连接方式
        useUnifiedTopology: true, // 使用统一拓扑
        maxPoolSize: 10, // 设置最大连接池大小
      });

      // 连接成功
      isConnected = true;
      console.log("✅ Connected to MongoDB.");
      isConnecting = false; // 连接成功，解锁
      return;
    } catch (error) {
      console.error(`Failed to connect to MongoDB: ${error.message}`);
      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay)); // 等待重试
      } else {
        console.error("Failed to connect after multiple attempts.");
        process.exit(1); // 如果重试失败，则退出进程
      }
    }
  }

  isConnecting = false; // 即使重试失败，最终解锁
};

// 优雅关闭连接
process.on("SIGINT", async () => {
  if (isConnected) {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB.");
  }
  process.exit(0); // 确保应用正常退出
});
