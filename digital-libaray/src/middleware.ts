import { NextRequest, NextResponse } from "next/server";

export default function Middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPUblic = path === "/pages/login" || path === "/pages/signup";
  const token = req.cookies.get("token");

  if (!isPUblic && !token) {
    return NextResponse.redirect(new URL("/pages/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/pages/login",
    "/pages/Book",
    "/pages/Category",
    "/pages/DashBoard",
    "/pages/Reserve",
    "/pages/View",
    "/pages/Return",
    "/pages/signup",
  ],
};
