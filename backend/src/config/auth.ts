import type { CookieOptions } from "express";

export const JWT_COOKIE_NAME = "jwt";
export const JWT_EXPIRES_IN = "30d" as const;
export const JWT_ALGORITHM = "HS512" as const;
export const JWT_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export const getJwtSecret = (): string => {
  return process.env.JWT_SECRET as string;
};

export const authCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: JWT_COOKIE_MAX_AGE_MS,
  path: "/",
});

export const clearAuthCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  expires: new Date(0),
});
