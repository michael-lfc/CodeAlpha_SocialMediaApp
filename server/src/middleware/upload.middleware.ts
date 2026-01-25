import multer from "multer";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary.js";
import { AppError } from "../utils/AppError.js";
import User from "../models/user.model.js";

// Memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const uploadSingleImage = upload.single("profileImage");

export const uploadToCloudinaryAndDeleteOld = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1️⃣ Check if file exists
    if (!req.file) {
      return next(new AppError("No image file provided", 400));
    }

    // 2️⃣ Validate file type
    if (!req.file.mimetype.startsWith("image/")) {
      return next(new AppError("Only image files are allowed", 400));
    }

    // 3️⃣ Get user
    const user = await User.findById(req.user.id);

    // 4️⃣ Delete old image from Cloudinary if it exists
    if (user?.profileImage?.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    }

    // 5️⃣ Convert buffer to base64
    const base64 = req.file.buffer.toString("base64");
    const fileStr = `data:${req.file.mimetype};base64,${base64}`;

    // 6️⃣ Upload new image
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "profile_images",
      resource_type: "image",
    });

    // 7️⃣ Attach new image data to request body
    req.body.profileImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    next();
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);

    next(
      new AppError(
        error.message || "Image upload failed",
        error.statusCode || 500
      )
    );
  }
};
