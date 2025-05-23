import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
const page = async ({ searchParams }: { searchParams?: { edit?: string } }) => {
  const user = await currentUser();
  // no user redirect to signin
  if (!user) return null;

  // user information
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded && !searchParams?.edit) redirect("/onboarding");

  // fetchCommunities
  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>

      {/* Search Bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No Community Found</p>
        ) : (
          <>
            {result.communities.map((comm) => (
              <CommunityCard
                key={comm.id}
                id={comm.id}
                name={comm.name}
                username={comm.username}
                imgUrl={comm.image}
                bio={comm.bio}
                members={comm.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
