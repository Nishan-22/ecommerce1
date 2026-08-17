import { COOKIE_NAME, createSession, hashPassword } from "@/lib/auth";
import { readJsonFile, writeJsonFile } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  const users = await readJsonFile<UserRecord[]>("users.json");
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const newUser: UserRecord = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
    password: hashPassword(password),
    role: "customer",
  };

  await writeJsonFile("users.json", [...users, newUser]);

  const token = createSession({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  });

  const response = NextResponse.json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
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