"use client";
import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Bottombar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {/* for the small size version(mobile) */}
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
                className={`bottombar_link ${isActive && "bg-primary-500"}`}>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width="24"
                  height="24"
                />
                <p className="text-subtle-medium text-light-1 max-sm:hidden">
                  {/* 匹配一个或多个连续的空白字符。
                  link.label 中的第一个单词 */}
                  {link.label.split(/\s+/)[0]}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
