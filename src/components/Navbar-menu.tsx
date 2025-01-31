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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { Menu } from "./ui/navbar-menu";
import { menuItems } from "@/constant";
import { cn } from "@/lib/utils";
import { Logout } from "@/lib/actions/logout.action";
import { GetCurrentAdminApi } from "@/lib/actions/adminAuth.action";
import HamburgerMenu from "./Ham-menu";
import { toast } from "sonner";
import DevAlertDialogComponent from "./development-alart/DevAlart";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName); // Set the active item on click
  };

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
    const response = await Logout();

    if (response.statusCode === 200 && response.success) {
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  // Handle link click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    subItem: any
  ) => {
    e.preventDefault();
    if (subItem.shouldShowAlert) {
      setDialogOpen(true);
      return;
    } else {
      window.location.href = subItem.href;
    }
  };

  return (
    <div className="w-full flex justify-between items-center py-4 px-8 border-b shadow-sm z-[999] h-16 bg-white text-black border-2">
      <div className="block lg:hidden">
        <HamburgerMenu />
      </div>
      <div className="">
        <Link href="/dashboard">
          <div className="flex items-center">
            <Image
              src="/assets/flis_logo/flis-web-title.svg"
              alt="Logo"
              width={210}
              height={200}
              className="object-contain w-[200px] h-[40px]"
            />
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="hidden lg:block">
        <Menu setActive={setActiveItem}>
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.name} className="mb-1">
                  <NavigationMenuTrigger
                    onClick={() => handleItemClick(item.name)}
                    className="border-1 hover:bg-none hover:text-balance">
                    {item.name} {/* Display the item name */}
                  </NavigationMenuTrigger>

                  {/* Sub-items section */}
                  <NavigationMenuContent className="text-sm">
                    <div className="grid grid-cols-2 gap-1 w-[48.5rem] px-5 h-full py-5 bg-gray-800 text-white">
                      {item.subItems.map((subItem, i) => (
                        <NavigationMenuLink
                          key={i || subItem.label}
                          href={subItem.href}
                          onClick={(e: any) => handleLinkClick(e, subItem)}
                          className="py-1 hover:bg-gray-700 px-2 rounded-sm">
                          <div
                            className={`flex flex-col items-start justify-center py-1 px-2 text-[13px] ${
                              activeItem === item.name ? "bg-gray-700" : ""
                            }`}>
                            <span className="text-base">{subItem.label}</span>
                            <span className="text-gray-400">
                              {subItem.description}
                            </span>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </Menu>
        <DevAlertDialogComponent
          isOpen={isDialogOpen}
          onOpenChange={setDialogOpen}
        />
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
                <Image
                  width={500}
                  height={500}
                  alt="User Avatar"
                  src="/assets/profile/flis_profile.jpg"
                  className="rounded-full aspect-square object-cover object-top"
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
