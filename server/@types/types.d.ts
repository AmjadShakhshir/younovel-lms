import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload & { id?: string; name?: string; email?: string; avatar?: {}; role?: string };
  }
}
