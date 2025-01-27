import Navbar from "@/components/Navbar-menu";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Menu at the Top */}
      <div className="sticky top-0 z-[3]">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-3 md:px-8 py-20 md:py-0">{children}</div>
    </div>
  );
}
