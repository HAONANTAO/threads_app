import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

const page = async ({params}:{params:{id:string}}) => {
  const user = await currentUser();
    // no user redirect to signin
    if (!user) return null;
  
    // user information
    const userInfo = await fetchUser(params.id);
    
    if (!userInfo?.onboarded) redirect("/onboarding");
  
  return (
    <>
      <section>
        <ProfileHeader/>
      </section>
    </>
  );
};

export default page;
