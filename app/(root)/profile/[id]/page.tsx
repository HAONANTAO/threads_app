import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList,TabsContent,TabsTrigger} from "@/components/ui/tabs";


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
        <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}/>

        <div className="mt-9">
          <Tabs>
            <TabsList>

            </TabsList>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default page;
