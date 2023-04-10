import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

import User, { type IUser, type userRoles } from "../models/user.ts";
import { JWT_COOKIE_NAME, getJwtSecret } from "../config/auth.ts";

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  userId: string;
}

const getTokenFromRequest = (req: AuthRequest): string | undefined => {
  return req.cookies?.[JWT_COOKIE_NAME];
};

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = getTokenFromRequest(req);

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    req.user = (await User.findById(decoded.userId).select(
      "-password"
    )) as IUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

/**
 * Accepts a list of allowed roles (e.g. 'admin', 'teacher')
 * usage: router.post('/', protect, authorize(['admin']), createClass)
 */
export const authorize = (roles: userRoles[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }

    next();
  };
};
