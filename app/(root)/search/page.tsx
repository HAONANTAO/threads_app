import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import SearchBar from "@/components/shared/SearchBar"; // 客户端组件
import UserCard from "@/components/cards/UserCard";

// 服务器端逻辑
const Page = async () => {
  const user = await currentUser();
  if (!user) return null; // 如果没有登录用户，返回 null

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // 初始用户数据获取（没有搜索时）
  const result = await fetchUsers({
    userId: user.id,
    searchString: "", // 没有搜索时传空字符串
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* 搜索栏（由客户端组件处理） */}
      <SearchBar userId={user.id} defaultUsers={result.users} />

      {/* 显示结果 */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
