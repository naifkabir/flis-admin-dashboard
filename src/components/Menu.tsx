"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { menuItems } from "@/constant";
import { cn } from "@/lib/utils";
import { Logout } from "@/lib/actions/logout.action";
import { GetCurrentAdminApi } from "@/lib/actions/adminAuth.action";

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  // Fetch current user Details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await GetCurrentAdminApi();
      setUser(currentUser);
    };

    fetchCurrentUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    // console.log("Before Call");
    const response = await Logout(); // Call Logout API
    // console.log("After Call");
    // console.log("Response: ", response);

    // Check the status code and success state
    if (response.statusCode === 200 && response.success) {
      alert("Logged out successfully!");
      window.location.href = "/";
    } else {
      alert("Logout failed. Please try again.");
      console.error("Logout Error:", response.statusCode);
    }
  };

  return (
    <div className="w-full flex justify-between items-center py-4 px-6 border-b shadow-sm z-[999] h-16 bg-white text-black">
      <div className="block md:hidden">Menu</div>
      <div>
        <Link
          href="/dashboard"
          className="btn btn-ghost hover:bg-gray-100 px-2 rounded-lg py-1 text-[16px] gap-2 font-bold hidden xl:flex items-center justify-center">
          <Image
            src="/assets/images/School-Logo.png"
            width={500}
            height={500}
            alt="School Logo"
            className="h-9 w-9 object-cover object-center"
          />
          Future Leaders International School
        </Link>
        <Link
          href="/dashboard"
          className="btn btn-ghost text-lg w-28 flex items-center justify-center xl:hidden">
          <Image
            src="/assets/images/School-Logo.png"
            width={500}
            height={500}
            alt="School Logo"
            className="h-8 w-8 object-cover object-center text-[16px] gap-2 font-bold btn btn-ghost hover:bg-gray-100 px-2 rounded-lg py-1"
          />
          FLIS
        </Link>
      </div>

      {/* Menu */}
      <div className="hidden md:block">
        <Menu setActive={setActive}>
          {menuItems.map((item, i) => (
            <MenuItem
              setActive={setActive}
              active={active}
              item={item.name}
              key={i}>
              <div className="flex flex-col space-y-4 text-sm ">
                {item.subItems.map((subItem, i) => (
                  <HoveredLink href={subItem.href} key={i}>
                    {subItem.label}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* Profile */}
      <div className="flex items-center">
        <div className="mr-4 text-right sm:block hidden">
          {user && (
            <>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.role}</div>
            </>
          )}
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-9 h-9">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("md:mr-6 mt-3 rounded-none")}>
              <DropdownMenuLabel className={cn("cursor-none")}>
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={cn("cursor-pointer")}>
                <Link href="/admin/profilePage">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn("cursor-pointer")}
                onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
