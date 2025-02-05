"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  // update user
  try {
    await User.findOneAndUpdate(
      //查询内容
      { id: userId },
      // 更新内容
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      // update and insert
      { upsert: true },
    );

    if (path === "/profile/edit") {
      // 调用 revalidatePath 后，清除 /profile/edit 页面缓存，让其重新拉取用户数据，确保用户能看到最新信息。
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userID:string) {
  try {
    
  } catch (error) {
    
  }
}
