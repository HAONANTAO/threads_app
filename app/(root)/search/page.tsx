import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
const page = async () => {
    const user = await currentUser();
    // no user redirect to signin
    if (!user) return null;
  
    // user information
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    // fetch users
    
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
    </section>
  );
};

export default page;
