import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  // UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
          {/* new version to use,check whether user sign in or not! */}
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

        {/* add a button for edit user profile */}
        <div>
          <a
            href="/onboarding?edit=true"
            className="text-light-1 px-4 py-2 rounded-full hover:bg-primary-500/70 hover:text-white transition-all duration-200 ease-in-out hover:scale-105 flex items-center gap-2 group">
            <Image
              src="/assets/edit.svg"
              alt="edit profile"
              width={20}
              height={20}
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <span className="group-hover:text-white transition-colors">
              Edit Profile
            </span>
          </a>
        </div>
        {/* <UserButton /> */}
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
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
