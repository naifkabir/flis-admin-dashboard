// Created and developed by ** Naif Kabir & Akash Pal ** (Team Supranostik), 2024

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FLIS | Admin Panel",
  description:
    "Welcome to Future Leaders International School! Located in Khojardanga, Murshidabad, near Lalbagh Court Road Station, we provide exceptional education with well-qualified teachers, diverse curricula, and a supportive learning environment. At FLIS, we foster critical thinking, creativity, and social skills through engaging educational experiences. Get in touch with us at 9932442243 or 7501783684 to learn more about our programs. Join us and become a part of our FLISIAN family!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-full w-full bg-[#f8f7f4]`}>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
