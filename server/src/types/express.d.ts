import { IUser } from "../models/user.model";
import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      file?: Multer.File;
    }
  }
}
