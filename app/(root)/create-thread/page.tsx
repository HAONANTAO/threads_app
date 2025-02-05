import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
const page = async () => {
  const user = await currentUser();
  // no user redirect to signin
  if (!user) return null;

  // user informations
  const userInfor = await fetchUser(user.id);
  return (
    <>
      <h1 className="head-text">create-thread</h1>
    </>
  );
};

export default page;
