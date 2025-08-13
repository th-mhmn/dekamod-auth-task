"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import useLocalStorageState from "@/hooks/useLocalStorageState";

export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: () => Promise<void>;
  logout: () => void;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser, isHydrated] = useLocalStorageState<AuthUser | null>(LOCAL_STORAGE_KEY, null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isValidStoredUser = (value: unknown): value is AuthUser => {
      if (!value || typeof value !== "object") return false;
      const u = value as Record<string, unknown>;
      return (
        typeof u.firstName === "string" &&
        typeof u.lastName === "string" &&
        typeof u.email === "string" &&
        typeof u.avatarUrl === "string"
      );
    };
    if (!isHydrated) return;
    if (user && !isValidStoredUser(user)) {
      setUser(null);
    }
    setIsReady(true);
  }, [isHydrated, user, setUser]);

  const login = useCallback(async () => {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await res.json();
    const randomUser = data?.results?.[0];
    const nextUser: AuthUser = {
      firstName: randomUser?.name?.first ?? "John",
      lastName: randomUser?.name?.last ?? "Doe",
      email: randomUser?.email ?? "john.doe@example.com",
      avatarUrl: randomUser?.picture?.large ?? "",
    };
    setUser(nextUser);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo<AuthContextValue>(() => ({ user, login, logout, isReady }), [user, isReady, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}


