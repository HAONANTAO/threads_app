"use client"; // 这是一个客户端组件
import React, { useState } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";
import { fetchSearchPosts } from "@/lib/actions/thread.actions"; // 引入新的 actions
import UserCard from "../cards/UserCard";
import ThreadCard from "../cards/ThreadCard"; // Use ThreadCard here

interface SearchBarProps {
  userId: string;
  defaultUsers: Array<any>;
  defaultPosts: Array<any>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  userId,
  defaultUsers,
  defaultPosts,
}) => {
  const [searchStringLeft, setSearchStringLeft] = useState<string>("");
  const [searchStringRight, setSearchStringRight] = useState<string>("");
  const [usersLeft, setUsersLeft] = useState(defaultUsers);
  const [postsRight, setPostsRight] = useState(defaultPosts);
  const [loadingRight, setLoadingRight] = useState<boolean>(false); // 添加加载状态

  // 处理搜索框输入变化
  const handleSearchChangeLeft = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchStringLeft(event.target.value);
  };

  const handleSearchChangeRight = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchStringRight(event.target.value);
  };

  // 搜索用户（左侧）
  const handleSearchLeft = async () => {
    const result = await fetchUsers({
      userId,
      searchString: searchStringLeft,
      pageNumber: 1,
      pageSize: 25,
    });
    setUsersLeft(result.users);
  };

  // 搜索帖子（右侧）
  const handleSearchRight = async () => {
    setLoadingRight(true); // 设置加载状态
    try {
      const result = await fetchSearchPosts(searchStringRight);
      console.log(result); // 打印查看返回的数据结构
      setPostsRight(result); // 更新帖子数据
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoadingRight(false); // 请求完成后设置加载状态为 false
    }
  };

  return (
    <div className="w-full max-w-6xl mt-4 flex gap-5">
      {/* 左侧 搜索 + 结果 */}
      <div className="w-[50%] flex flex-col items-center">
        {/* 搜索框 */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchStringLeft}
            onChange={handleSearchChangeLeft}
            placeholder="Search Users..."
            className="w-full p-2 pl-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearchLeft}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md">
            🔍
          </button>
        </div>

        {/* 结果区域 */}
        <div className="mt-4 w-full flex-1 max-w-sm overflow-auto max-h-96 border border-gray-300 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Users</h2>
          {usersLeft.length === 0 ? (
            <p className="text-center">No users found</p>
          ) : (
            usersLeft.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))
          )}
        </div>
      </div>

      {/* 中间灰色分割线 */}
      <div className="w-[2px] bg-gray-300 self-stretch"></div>

      {/* 右侧 搜索 + 结果 */}
      <div className="w-[50%] flex flex-col items-center">
        {/* 搜索框 */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchStringRight}
            onChange={handleSearchChangeRight}
            placeholder="Search Posts..."
            className="w-full p-2 pl-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearchRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md">
            🔍
          </button>
        </div>

        {/* 结果区域 */}
        <div className="mt-4 w-full flex-1 max-w-sm overflow-auto max-h-96 border border-gray-300 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Posts</h2>
          {loadingRight ? (
            <p className="text-center">Loading...</p> // 显示加载状态
          ) : postsRight.length === 0 ? (
            <p className="text-center">No posts found</p>
          ) : (
            postsRight.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={userId}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.comments || []}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
