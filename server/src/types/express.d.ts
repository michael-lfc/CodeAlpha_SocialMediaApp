// import { IUser } from "../models/user.model";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }

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
