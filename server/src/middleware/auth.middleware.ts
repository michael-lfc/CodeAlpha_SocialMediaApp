// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protect = async (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     const userId = decoded.id || decoded.userId || decoded._id;

//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// export default protect;

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
