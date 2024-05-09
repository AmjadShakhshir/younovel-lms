import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const parseRequestData = async (schema: AnyZodObject, req: Request) => {
  return await schema.parseAsync({
    body: req.body,
    query: req.query,
    params: req.params,
  });
};

const handleValidationError = (res: Response, error: any) => {
  return res.status(400).json(error);
};

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await parseRequestData(schema, req);
      return next();
    } catch (error) {
      return handleValidationError(res, error);
    }
  };
}
