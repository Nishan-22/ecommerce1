import { COOKIE_NAME, createSession, verifyPassword } from "@/lib/auth";
import { readJsonFile } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const users = await readJsonFile<UserRecord[]>("users.json");
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}