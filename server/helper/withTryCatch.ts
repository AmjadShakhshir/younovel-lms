import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/errors/ApiError";

export const withTryCatch = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  };
};
