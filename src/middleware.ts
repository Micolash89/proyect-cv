import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/utils";
// import { JWTValidate } from "./lib/utils";

// 1. Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.url;
  console.log(path);
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // // 3. Decrypt the session from the cookie
  // // const cookie = cookies().get('token')?.value
  const token = req.cookies.get("token");

  if (!token) {
    // return NextResponse.redirect(new URL("/login", process.env.URL_BASE));
  }

  // console.log(token);
  // const veriyfToken = await verifyJwtToken(token.value);

  // console.log(veriyfToken);

  // if (!veriyfToken) {
  //   return NextResponse.redirect(new URL("login", process.env.URL_BASE));
  // }

  //const session = await decrypt(cookie)

  // 5. Redirect to /login if the user is not authenticated
  // if (isProtectedRoute && !session?.userId) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }

  // // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
