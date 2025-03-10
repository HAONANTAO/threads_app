// RightSidebar.tsx (Server Component)
import { fetchTopCommunities } from "@/lib/actions/community.actions";
import { fetchTopUsers } from "@/lib/actions/user.actions"; // 假设你有这个 fetchUsers 函数

const RightSidebar = async () => {
  try {
    // 获取社区数据
    const communities = await fetchTopCommunities();

    // 获取用户数据
    const users = await fetchTopUsers(); 
   
    return (
      <section className="custom-scrollbar rightsidebar">
        {/* Suggested Communities */}
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1 mt-2">
            Suggested Communities
          </h3>
          <ul className="mt-2">
            {communities.map((community) => (
              <li
                key={community.id}
                className="mb-6 p-2 bg-gray-800 rounded-md">
                <a
                  href={`/communities/${community.id}`}
                  className="flex items-center gap-2">
                  <img
                    src={community.image || "/default-community.png"}
                    alt={community.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-light-1">{community.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested Users */}
        <div className="flex flex-1 flex-col justify-start mt-6">
          <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
          <ul className="mt-2">
            {users.map((user) => (
              <li key={user.id} className="mb-6 p-2 bg-gray-800 rounded-md">
                <a
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-2">
                  <img
                    src={user.image || "/default-user.png"}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-light-1">{user.username}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch communities or users:", error);
    return <p>Failed to load communities or users.</p>;
  }
};

export default RightSidebar;
