import crypto from "crypto";
import { cookies } from "next/headers";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}

const COOKIE_NAME = "bloom_session";
const AUTH_SECRET =
  process.env.AUTH_SECRET || "bloomshop-demo-secret-change-me";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const computed = crypto
    .createHash("sha256")
    .update(`${salt}:${password}`)
    .digest("hex");
  return computed === hash;
}

function sign(payload: SessionUser, expiresAt: number): string {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: expiresAt })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

export function createSession(user: SessionUser): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return sign(user, expiresAt);
}

export function verifySession(token: string): SessionUser | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(body)
    .digest("base64url");
  if (expected !== sig) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf-8")
    ) as SessionUser & { exp: number };
    if (payload.exp < Date.now()) return null;
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export { COOKIE_NAME };