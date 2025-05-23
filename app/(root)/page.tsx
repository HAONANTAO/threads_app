import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams?: { edit?: string } }) {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in"); // redirect to sign-in clerk page
  }

  const userInfo = await fetchUser(user.id);
  // console.log("userInfo:", result.posts);
  if (!userInfo?.onboarded && !searchParams?.edit) {
    // 如果用户未完成入职流程且不是编辑模式，重定向到入职页面
    redirect("/onboarding");
  }
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user ? user.id : ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
