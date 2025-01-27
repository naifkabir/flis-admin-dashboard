import { NextResponse } from "next/server";

const protectedRoutes = [
  "/student/approve",
  "/student/counseling",
  "/student/pending",
  "/student/reject",
  "/admin/profilePage",
  "/dashboard",
  "/finance/feesGroup",
  "/feesHeader",
  "/feesMaster",
  "/student/approve",
  "/student/counseling",
  "/student/pending",
  "/student/reject",
];

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is in the protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("accessToken");

    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
