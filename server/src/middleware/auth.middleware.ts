import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// ✅ Typed JWT payload
interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // 1️⃣ Get token from headers
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Not authorized, token missing", 401);
    }

    try {
      // 2️⃣ Decode token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      // 3️⃣ Get userId directly
      const userId = decoded.id;

      // 4️⃣ Find user
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new AppError("User not found", 401);
      }

      // 5️⃣ Attach user to req
      req.user = user;

      next();
    } catch (err) {
      throw new AppError("Token is invalid or expired", 401);
    }
  }
);

export default protect;
