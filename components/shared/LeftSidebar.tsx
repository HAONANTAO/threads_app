"use client";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// @ == root
import { sidebarLinks } from "@/constants/index";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId, isLoaded } = useAuth(); // 获取 userId 和 isLoaded 状态

  // 在用户信息未加载时显示加载中状态
  if (!isLoaded) {
    return <div>Loading...</div>; // 可根据需要自定义加载状态
  }

  // 如果用户未登录，返回一个登录页面
  if (!userId) {
    return <div>Please log in to view the sidebar</div>; // 可改为重定向到登录页面
  }

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {/* constants map iterations */}
        {sidebarLinks.map((link) => {
          // active link check，part of or full equal
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // 如果路由是 `/profile`，动态构建包含用户 ID 的链接
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

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

      {/* signout button */}
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
