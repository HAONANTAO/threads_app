"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

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
      author,
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
