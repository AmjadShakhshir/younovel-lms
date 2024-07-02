import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redis: Redis;
let connectionCount = 0;

const redisClient = (): Redis => {
  if (!redis) {
    if (process.env.REDIS_URL) {
      console.log("Creating new Redis connection");
      redis = new Redis(process.env.REDIS_URL);
      connectionCount++;
      console.log(`Redis connections created: ${connectionCount}`);
      redis.on("connect", () => console.log("Redis connected"));
      redis.on("end", () => console.log("Redis connection closed"));
      redis.on("error", (error) => console.error("Redis error:", error));
    } else {
      throw new Error("Redis connection failed");
    }
  }
  return redis;
};

const redisInstance = redisClient();
