import { NextRequest, NextResponse } from "next/server";
import micromatch from "micromatch";

const publicRoutes: string[] = ["/a/**", "/@*"];
const authRoutes: string[] = ["/a/sign-in/**", "/a/sign-up/**"];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => micromatch.isMatch(pathname, route));
};

const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => micromatch.isMatch(pathname, route));
};

export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const pathname = request.nextUrl.pathname;
  const token = cookies.get("pb_auth");
  const headers = new Headers(request.headers);

  const isAuth = isAuthRoute(pathname);
  const referrer = new URL(request.referrer);

  const redirectUrl =
    referrer.origin === request.nextUrl.origin
      ? referrer
      : request.nextUrl.origin;

  if (isAuth && token) return NextResponse.redirect(redirectUrl);

  const isPublic = isPublicRoute(pathname);
  if (isPublic) return NextResponse.next();

  if (!token) {
    const url = new URL(process.env.NEXT_PUBLIC_SIGNIN_PATH!, request.url);
    if (request.nextUrl.pathname)
      url.searchParams.set("callback", request.nextUrl.href);
    return NextResponse.redirect(url);
  }

  headers.set("Authorization", `Bearer ${token?.value}`);
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
