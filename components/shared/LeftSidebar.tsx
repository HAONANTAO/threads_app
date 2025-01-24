"use client";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// @ == root
import { sidebarLinks } from "@/constants/index";
const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {/* constants map iterations */}
        {sidebarLinks.map((link) => {
          // active link check，part of or full equal
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.label}>
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-primary-500"}`}>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width="24"
                  height="24"
                />
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex cursor-pointer p-4 gap-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width="24"
                height="24"
              />
              <p className="text-light-2 max-lg:hidden ">LogOut</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
