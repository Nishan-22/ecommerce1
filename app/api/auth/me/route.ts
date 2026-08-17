import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getSession();
  return NextResponse.json({ user });
}