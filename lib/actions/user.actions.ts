"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string,
): Promise<void> {
  connectToDB();

  // update user
  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      // update and insert
      { upsert: true },
    );

    if (path === "/profile/edit") {
      // 调用 revalidatePath 后，Next.js 会 自动让页面重新获取数据，用户刷新后就能看到新文章。
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
