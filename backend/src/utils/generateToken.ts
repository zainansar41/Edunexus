import jwt from "jsonwebtoken";
import { type Response } from "express";
import {
  JWT_ALGORITHM,
  JWT_COOKIE_NAME,
  JWT_EXPIRES_IN,
  authCookieOptions,
  getJwtSecret,
} from "../config/auth.ts";

export const generateToken = (userId: string, res: Response): string => {
  const token = jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });

  res.cookie(JWT_COOKIE_NAME, token, authCookieOptions());
  return token;
};
