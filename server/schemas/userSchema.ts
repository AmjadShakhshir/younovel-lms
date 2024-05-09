import mongoose from "mongoose";
import { z } from "zod";

export const userBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50).optional(),
  avatar: z.object({
    public_id: z.string().optional(),
    url: z.string().optional(),
  }),
  role: z.string(),
  isVerified: z.boolean(),
  courses: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val))),
  comparePassword: z.function(z.tuple([z.string()]), z.promise(z.boolean())),
  SignAccessToken: z.function(z.tuple([]), z.string()),
  SignRefreshToken: z.function(z.tuple([]), z.string()),
});

export const UserSchema = z.object({
  body: userBodySchema,
});
