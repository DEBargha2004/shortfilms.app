import { NextRequest, NextResponse } from "next/server";
import micromatch from "micromatch";

const privateRoutes = ["/content/**"];

const isPrivateRoute = (path: string) =>
  micromatch.isMatch(path, privateRoutes);

export default async function middleware(req: NextRequest) {
  const isPrivateRouteMatched = isPrivateRoute(req.nextUrl.pathname);

  if (isPrivateRouteMatched && !req.cookies?.get("jwt")) {
    const onSuccessUrl = req.nextUrl.pathname;

    const redirectUrl = new URL(`/auth/signin`, req.url);
    redirectUrl.searchParams.set("redirect", onSuccessUrl);

    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
