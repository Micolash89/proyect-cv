import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/utils";
// import { JWTValidate } from "./lib/utils";

// 1. Specify protected and public routes
const protectedRoutes = ["/pdf"];
const publicRoutes = ["/login","/dashboard"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.clone();

  const isProtectedRoute = protectedRoutes.includes(path.pathname);
  // const isPublicRoute = publicRoutes.includes(path.pathname);

  const token = req.cookies.get("token");

  if (isProtectedRoute && token) {
    const tokenverify = await verifyJwtToken(token.value);

    if (!tokenverify) {
      const response = NextResponse.redirect(
        new URL("/login", process.env.URL_BASE)
      );
      response.cookies.delete("token");
      return response;
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", process.env.URL_BASE));
  } else {
    return NextResponse.next();
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
