import { SignOutButton } from "@clerk/nextjs";

async function Page() {
  return (
    <main>
      <h1 className="head-text">On-Boarding</h1>
      <SignOutButton
        style={{
          color: "white",
          backgroundColor: "#007bff",
        }}
      />
    </main>
  );
}
export default Page;
