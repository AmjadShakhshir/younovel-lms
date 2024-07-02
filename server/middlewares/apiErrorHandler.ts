import { NextFunction, Request, Response } from "express";
import { ApiError } from "./errors/ApiError";
import { monitorRequest } from "./logging";

const paths = /^(\/users|\/analytics|\/courses|\/layout|\/notifications|\/orders)/;

const handleApiError = (error: ApiError, res: Response) => {
  res.status(error.code).json({ message: error.message });
};

const handleGenericError = (res: Response) => {
  res.status(500).json({ message: "Something went wrong" });
};

const monitorNonPathRequests = (req: Request, res: Response, next: NextFunction) => {
  if (!paths.test(req.originalUrl)) monitorRequest(req, res, next, true);
};

export const apiErrorHandler = (error: typeof ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    handleApiError(error, res);
  } else {
    handleGenericError(res);
  }
  monitorNonPathRequests(req, res, next);
};
