import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const PROTECTED_ROUTES = ["/dashboard", "/subscriptions"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  const isProtected = PROTECTED_ROUTES.some((route) => {
    return pathname.startsWith(route);
  });

  // If the route is protected and the user is not signed in,
  // redirect to the login page
  if (isProtected && !session) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // If the active route is the Login page, but the user is authenticated already,
  // redirect to the dashboard
  const isLoginPageActive = pathname === "/login";
  if (isLoginPageActive && session) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}