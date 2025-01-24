import React from "react";
import Link from "next/link";
import Image from "next/image";
// @ == root
import { sidebarLinks } from "@/constants/index";
const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => (
          <div>
            <Link
              href={link.route}
              key={link.label}
              className="leftsidebar_link">
              <Image
                src={link.imgURL}
                alt={link.label}
                width="24"
                height="24"/>
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
