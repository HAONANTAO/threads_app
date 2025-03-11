import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page({ searchParams }: { searchParams: { edit?: string } }) {
  const user = await currentUser();
  console.log("user is here:", user);
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user.id);

  // 只有在非编辑模式下且用户已完成onboarding时才重定向
  if (userInfo?.onboarded && !searchParams?.edit) redirect("/");

  const userData = {
    id: user?.id || "",
    objectId: userInfo && userInfo._id ? userInfo._id : "", // 确保 userInfo 和 _id 都不为空
    username:
      userInfo && userInfo.username ? userInfo.username : user?.username || "",
    name: userInfo && userInfo.name ? userInfo.name : user?.firstName || "",
    bio: userInfo && userInfo.bio ? userInfo.bio : "",
    image: userInfo && userInfo.image ? userInfo.image : user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">
        {searchParams?.edit ? "编辑个人信息" : "On-Boarding"}
      </h1>
      <p className="mt-3 text-base-regular text-light-2">
        {searchParams?.edit
          ? "更新您的个人资料"
          : "Complete your profile now to use Threads"}
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile
          user={userData}
          btnTitle={searchParams?.edit ? "保存修改" : "Continue"}
        />
      </section>
    </main>
  );
}
export default Page;
