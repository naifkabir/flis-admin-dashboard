"use client";

import { useState } from "react";

// Sample data for menu items
const menuItems = [
  {
    name: "Item 1",
    subItems: [
      { label: "Sub-item 1A", href: "/subitem1A" },
      { label: "Sub-item 1B", href: "/subitem1B" },
    ],
  },
  {
    name: "Item 2",
    subItems: [
      { label: "Sub-item 2A", href: "/subitem2A" },
      { label: "Sub-item 2B", href: "/subitem2B" },
    ],
  },
  {
    name: "Item 3",
    subItems: [
      { label: "Sub-item 3A", href: "/subitem3A" },
      { label: "Sub-item 3B", href: "/subitem3B" },
    ],
  },
];

const HamburgerMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null); // Track active item
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility

  const handleItemClick = (name: string) => {
    // Toggle active item
    setActiveItem(activeItem === name ? null : name);
  };

  return (
    <div className="relative Z-[9999]">
      {/* Hamburger button */}
      <button
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)} // Toggle sidebar visibility
        aria-label={isOpen ? "Close menu" : "Open menu"}>
        <span className="text-2xl">☰</span>
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setIsOpen(false)} // Close sidebar
          aria-label="Close sidebar">
          &times; {/* Close icon */}
        </button>

        <nav className="flex flex-col p-4">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-2">
              <button
                onClick={() => handleItemClick(item.name)} // Click to toggle sub-items
                className="w-full text-left py-2 px-4 bg-transparent hover:bg-gray-700">
                {item.name}
              </button>

              {/* Sub-items */}
              {activeItem === item.name && (
                <div className="ml-4 flex flex-col">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className="py-1 px-4 text-sm hover:bg-gray-700"
                      onClick={() => setIsOpen(true)} // Keep sidebar open when clicking sub-items
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for the sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}
    </div>
  );
};

export default HamburgerMenu;
