import type { User, ExamGoal, NursingPath } from "@/types/domain";
import { request } from "./client";

/**
 * Mock authentication service. The QLexNursing backend already owns real
 * auth; this layer mirrors the intended contract so the UI can be wired to a
 * real API by swapping `request(...)` for a `fetch` to NEXT_PUBLIC_API_URL.
 *
 * Sessions are persisted to localStorage under `qlex:session` so the demo
 * survives reloads. No real credentials are validated.
 */
const SESSION_KEY = "qlex:session";

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nursingLevel: NursingPath;
  primaryGoal: ExamGoal;
}

export interface AuthResult {
  user: User;
  token: string;
}

function makeUser(input: Partial<User> & { email: string }): User {
  return {
    id: "u-1001",
    firstName: input.firstName ?? "Mark",
    lastName: input.lastName ?? "Example",
    email: input.email,
    phone: input.phone,
    nursingLevel: input.nursingLevel ?? "RN",
    institution: input.institution,
    primaryGoal: input.primaryGoal ?? "NCLEX-RN",
    studyGoal: input.studyGoal,
    preferredLanguage: input.preferredLanguage ?? "English",
    timezone: input.timezone ?? "America/New_York",
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const user = makeUser({ email: input.email, firstName: "Mark", lastName: "Example" });
  return request({ user, token: `mock.${Date.now()}` }, 500);
}

export async function register(input: RegisterInput): Promise<AuthResult> {
  const user = makeUser({
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    nursingLevel: input.nursingLevel,
    primaryGoal: input.primaryGoal,
  });
  return request({ user, token: `mock.${Date.now()}` }, 600);
}

export async function updateProfile(
  id: string,
  patch: Partial<User>
): Promise<User> {
  const stored = readSession();
  const merged = { ...(stored?.user ?? makeUser({ email: patch.email ?? "example@qlexnursing.com" })), ...patch, id };
  return request(merged, 400);
}

export function readSession(): AuthResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthResult) : null;
  } catch {
    return null;
  }
}

export function writeSession(result: AuthResult) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(result));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
