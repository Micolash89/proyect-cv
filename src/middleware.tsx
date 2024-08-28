import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  console.log("estoy dentro");
  return NextResponse.next();
}
