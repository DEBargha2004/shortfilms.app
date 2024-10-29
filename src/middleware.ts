import { NextRequest, NextResponse } from "next/server";
import micromatch from "micromatch";

const publicRoutes: string[] = ["/a/**", "/@*"];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => micromatch.isMatch(pathname, route));
};

export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const pathname = request.nextUrl.pathname;
  const isPublic = isPublicRoute(pathname);

  if (isPublic) return NextResponse.next();
  const token = cookies.get("pb_auth");
  if (!token) {
    const url = new URL(process.env.NEXT_PUBLIC_SIGNIN_PATH!, request.url);
    if (request.nextUrl.pathname)
      url.searchParams.set("callback", request.nextUrl.href);
    return NextResponse.redirect(url);
  }
  const headers = new Headers(request.headers);
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
