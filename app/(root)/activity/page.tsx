/*
 * @Date: 2025-02-11 18:35:14
 * @LastEditors: 陶浩南 14639548+haonantao-aaron@user.noreply.gitee.com
 * @LastEditTime: 2025-03-11 19:00:30
 * @FilePath: /threads_app/app/(root)/activity/page.tsx
 */
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
const page = async ({ searchParams }: { searchParams?: { edit?: string } }) => {
  // from clerk！
  const user = await currentUser();
  // no user redirect to signin
  if (!user) return null;

  // user information数据库的
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded && !searchParams?.edit) redirect("/onboarding");

  // getActivity
  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((comm) => (
              // original thread post
              <Link key={comm._id} href={`/thread/${comm.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={comm.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {comm.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <>
            <p className="!text-base-regular text-light-3">No activity yet </p>
          </>
        )}
      </section>
    </section>
  );
};

export default page;
