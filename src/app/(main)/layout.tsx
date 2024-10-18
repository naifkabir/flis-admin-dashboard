import Navbar from "@/components/Menu";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Menu at the Top */}
      <div className="sticky top-0">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-8 py-20 md:py-12">{children}</div>
    </div>
  );
}
