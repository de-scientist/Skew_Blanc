"use client";

import * as React from "react";
import type { User, ExamGoal, NursingPath } from "@/types/domain";
import {
  login as apiLogin,
  register as apiRegister,
  updateProfile as apiUpdateProfile,
  readSession,
  writeSession,
  clearSession,
  type LoginInput,
  type RegisterInput,
} from "@/lib/api/auth";

interface AuthContextValue {
  user: User | null;
  status: "loading" | "authenticated" | "guest";
  login: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<AuthContextValue["status"]>(
    "loading"
  );

  React.useEffect(() => {
    const session = readSession();
    if (session?.user) {
      setUser(session.user);
      setStatus("authenticated");
    } else {
      setStatus("guest");
    }
  }, []);

  const login = React.useCallback(async (input: LoginInput) => {
    const result = await apiLogin(input);
    writeSession(result);
    setUser(result.user);
    setStatus("authenticated");
    return result.user;
  }, []);

  const register = React.useCallback(async (input: RegisterInput) => {
    const result = await apiRegister(input);
    writeSession(result);
    setUser(result.user);
    setStatus("authenticated");
    return result.user;
  }, []);

  const logout = React.useCallback(() => {
    clearSession();
    setUser(null);
    setStatus("guest");
  }, []);

  const updateProfile = React.useCallback(
    async (patch: Partial<User>) => {
      if (!user) return;
      const updated = await apiUpdateProfile(user.id, patch);
      writeSession({ user: updated, token: readSession()?.token ?? "mock" });
      setUser(updated);
    },
    [user]
  );

  const value = React.useMemo(
    () => ({ user, status, login, register, logout, updateProfile }),
    [user, status, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
