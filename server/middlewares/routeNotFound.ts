import { NextFunction, Request, Response } from "express";
import { monitorRequest } from "./logging";

const paths = /^(\/story)/;

const sendNotFoundResponse = (res: Response) => {
  res.status(404).json({ msg: "Route not found" });
};

const monitorNonStoryRequests = (req: Request, res: Response, next: NextFunction) => {
  if (!paths.test(req.originalUrl)) monitorRequest(req, res, next, true);
};

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  sendNotFoundResponse(res);
  monitorNonStoryRequests(req, res, next);
}
