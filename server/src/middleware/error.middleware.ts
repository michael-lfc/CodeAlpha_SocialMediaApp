import { Request, Response, NextFunction } from "express";

// Centralized error handling middleware
const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error stack in the console for debugging
  console.error(err.stack);

  // Respond with a JSON error message
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    // Optional: only include stack in development
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorMiddleware; // ✅ Default export
