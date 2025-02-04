"use client";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  // const { isSignedIn } = useAuth();
  // const router = useRouter();

  // useLayoutEffect(() => {
  //   if (isSignedIn) {
  //     router.push("/onboarding"); // 登录后跳转到 /onboarding
  //   }
  // }, [isSignedIn]);
  return (
    <>
      <>
        <h1 className="head-text text-left">Home</h1>
      </>
    </>
  );
}
