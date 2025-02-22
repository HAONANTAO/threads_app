// components/shared/SearchBar.tsx

"use client"; // 表示这是一个客户端组件
import React, { useState } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";

// 定义传递给 SearchBar 组件的 props 类型
interface SearchBarProps {
  userId: string;
  defaultUsers: Array<any>;
}

const SearchBar: React.FC<SearchBarProps> = ({ userId, defaultUsers }) => {
  const [searchString, setSearchString] = useState<string>("");
  const [users, setUsers] = useState(defaultUsers);

  // TODO:实时搜索?
  // useEffect(() => {}, []);

  // 处理搜索框输入的变化
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  // 处理点击搜索按钮后的搜索操作
  const handleSearch = async () => {
    // 不包括自己的userid
    const result = await fetchUsers({
      userId,
      searchString: searchString,
      pageNumber: 1,
      pageSize: 25,
    });

    setUsers(result.users); // 更新显示的用户列表
  };

  return (
    <>
      <div className="w-full max-w-4xl  mt-4 flex justify-center">
        <input
          type="text"
          value={searchString}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md ">
          Search
        </button>
      </div>
      {/* 显示搜索结果 */}
      <div className="mt-14 flex flex-col gap-9">
        {users.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {users.map((person) => (
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
    </>
  );
};

export default SearchBar;
