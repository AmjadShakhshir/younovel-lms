import { Document } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

export interface RegisterationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface ActivationToken {
  token: string;
  activationCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenOptions {
  expiresIn: Date;
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
  sameSite: "strict" | "lax" | "none";
}

export interface SocialAuthBody {
  name: string;
  email: string;
  avatar: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}
