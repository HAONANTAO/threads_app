"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";
interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    // TODO:communityId
    const createdThread = await Thread.create({
      text,
      author: new mongoose.Types.ObjectId(author), // 这里转换回 ObjectId
      community: null,
    });

    // update user model(for thread)
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    // update community model

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`createThread error: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    // calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // fetch the posts that have no parent(top level)
    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      // 把author的objectid换成对应的具体信息
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    //
    const totalPostsCount = await Thread.countDocuments({
      $in: [null, undefined],
    });
    // 用exec()分步执行
    const posts = await postsQuery.exec();

    // 说明还有后面的page
    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext };
  } catch (error) {}
}

export async function fetchThreadById(paramsId: { paramsId: string }) {}
