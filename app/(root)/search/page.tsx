import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
const page = async () => {
    const user = await currentUser();
    // no user redirect to signin
    if (!user) return null;
  
    // user information
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    // fetch users
    const result = await fetchUsers({
      userId: user.id,
      searchString:"",
      pageNumber:1,
      pageSize:25
    });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length===0?(
          <p className="no-result">No users found</p>
        ):(
          <>
          {result.users.map((person)=>
          <UserCard
          key={person.id}
          id={person.id}
          name={person.name}
          username={person.username}
          imgUrl={person.image}
          personType="User"/>)}</>
        )}
      </div>
    </section>
  );
};

export default page;
