import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import Community from "../../../../lib/models/community.model";
import UserCard from "@/components/cards/UserCard";
const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  // communityDetails information
  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <>
      <section>
        <ProfileHeader
          accountId={communityDetails.id}
          authUserId={user.id}
          name={communityDetails.name}
          username={communityDetails.username}
          imgUrl={communityDetails.image}
          bio={communityDetails.bio}
          type="Community"
        />

        <div className="mt-9">
          <Tabs defaultValue="thread" className="w-full">
            <TabsList className="tab">
              {communityTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />

                  <p className="max-sm:hidden">{tab.label}</p>

                  {/* number of threads */}
                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {communityDetails.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="threads" className="w-full text-light-1">
              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails._id}
                accountType="Community"
              />
            </TabsContent>

            {/* member */}
            <TabsContent value="members" className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                {communityDetails?.members.map((mems: any) => {
                  <UserCard
                    key={mems.id}
                    id={mems.id}
                    name={mems.name}
                    username={mems.username}
                    imgUrl={mems.image}
                    personType="User"
                  />;
                })}
              </section>
            </TabsContent>
            <TabsContent value="requests" className="w-full text-light-1">
              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails._id}
                accountType="Community"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default page;
