import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // important one
  threads: [
    // 通常用作文档的唯一标识符。
    {
      type: mongoose.Schema.Types.ObjectId,
      // threads 数组中的每个 ObjectId 都指向一个 Thread 模型中的文档。
      ref: "Thread",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// 第一个为了二次使用方便
// 创建 User 模型
const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
