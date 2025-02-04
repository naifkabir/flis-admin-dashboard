import { NextResponse } from "next/server";

const protectedRoutes = [
  "/school",
  "/student/counseling",
  "/student/pending",
  "/student/reject",
  "/admin/profilePage",
  "/dashboard",
  "/finance/feesGroup",
  "/finance/feesHeader",
  "/finance/feesMaster",
  "/student/counseling",
  "/student/pending",
  "/student/reject",
  "/student/approve-student",
  "/student/all-admitted-student",
  "/student/upload-documents",
  "/student/collect-fees",
  "/student/collect-fees/[...params]",
  "/academics/batch-and-section",
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
