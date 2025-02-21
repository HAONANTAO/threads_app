import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

// 确保 params 类型明确
interface Params {
  id: string;
}

const ProfilePage = async ({ params }: { params: Params }) => {
  // 获取当前用户
  const user = await currentUser();
  if (!user) {
    return null; // 如果没有用户，返回 null（或可以跳转到登录页面）
  }

  // 获取用户信息
  const userInfo = await fetchUser(params.id);

  // 如果用户没有完成 onboarding，跳转到 onboarding 页面
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <section>
        <ProfileHeader
          accountId={userInfo.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          bio={userInfo.bio}
        />

        <div className="mt-9">
          <Tabs defaultValue="thread" className="w-full">
            <TabsList className="tab">
              {profileTabs.map((tab) => (
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
                      {userInfo.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            {profileTabs.map((tab) => (
              <TabsContent
                key={`content-${tab.label}`}
                value={tab.value}
                className="w-full text-light-1">
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
