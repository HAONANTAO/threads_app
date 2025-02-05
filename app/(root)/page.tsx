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
 
  return (
    <>
      <>
        <h1 className="head-text text-left">Home</h1>
      </>
    </>
  );
}
