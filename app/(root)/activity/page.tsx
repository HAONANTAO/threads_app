import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
const page = async () => {
  const user = await currentUser();
  // no user redirect to signin
  if (!user) return null;

  // user information
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // getActivity
  
  return (
    <section>
      <h1 className="head-text mb-10">activity</h1>
    </section>
  );
};

export default page;
