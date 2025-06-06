import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

import PostThread from "@/components/forms/PostThread";
const page = async ({ searchParams }: { searchParams?: { edit?: string } }) => {
  const user = await currentUser();
  // no user redirect to signin
  if (!user) return null;

  // user information
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded && !searchParams?.edit) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">create-thread</h1>
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
};

export default page;
