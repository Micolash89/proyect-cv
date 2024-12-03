import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/utils";

const protectedRoutes = ["dashboard","user"];
const publicRoutes = ["/login","/","/about"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.clone();

  const { pathname } = path;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(e => e == pathname.split("/")[1]);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");

  let tokenverify;

  if (token) {

    tokenverify = await verifyJwtToken(token.value);

    if (!tokenverify) {
      const response = NextResponse.redirect(
        new URL(`/login?error=auth_required&url=${pathname.toString()}`, process.env.URL_BASE)
      );

      response.cookies.delete("token");
      response.cookies.delete("adminUser");
      return response;
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
  
    const response = NextResponse.redirect(
      new URL(`/login?error=auth_required&url=${pathname.toString()}`, process.env.URL_BASE)
    );
 
    return response;
    
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
