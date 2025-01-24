import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  // UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex item-center gap-4">
        <Image src="/logo.svg" alt="logo" width="28" height="28" />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          {/* new version to use,check whether user signe in or not! */}
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width="24"
                  height="24"
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* <UserButton /> */}
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;
