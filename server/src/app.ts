import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

// Middleware
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Error handling
app.use(errorMiddleware);

export default app;
