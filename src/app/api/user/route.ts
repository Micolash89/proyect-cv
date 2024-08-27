import { getAllUsers } from "@/database/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = getAllUsers();

  return NextResponse.json({ data });
}
