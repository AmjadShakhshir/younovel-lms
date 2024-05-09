import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = (): string => {
  if (process.env.REDIS_URL) {
    console.log("Redis connection successful");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient());
