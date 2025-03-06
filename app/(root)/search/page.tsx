
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import SearchBar from "@/components/shared/SearchBar"; // 客户端组件
import UserCard from "@/components/cards/UserCard";
import { fetchPosts } from "@/lib/actions/thread.actions";

// 服务器端逻辑
const Page = async () => {
  const user = await currentUser();
  if (!user) return null; // 如果没有登录用户，返回 null

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // 初始用户数据获取（没有搜索时）
  // const UserResult = await fetchUsers({
  //   userId: user.id,
  //   searchString: "", // 没有搜索时传空字符串
  //   pageNumber: 1,
  //   pageSize: 25,
  // });

  // const PostResult = await fetchPosts();

    const UserResult = {users:[]}

  const PostResult = { posts: [] };

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* 搜索栏（由客户端组件处理） */}
      <SearchBar
        userId={user.id}
        defaultUsers={UserResult.users}
        defaultPosts={PostResult.posts}
      />
    </section>
  );
};

export default Page;
