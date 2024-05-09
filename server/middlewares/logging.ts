import { Request, Response, NextFunction } from "express";

let requestCount = 0;
const statusCodes: {
  "200": number;
  "201": number;
  "400": number;
  "404": number;
  "409": number;
  "500": number;
} = {
  "200": 0,
  "201": 0,
  "400": 0,
  "404": 0,
  "409": 0,
  "500": 0,
};

const incrementRequestCount = () => {
  requestCount++;
};

const updateStatusCodes = (statusCode: number) => {
  const status = Math.floor(statusCode).toString();
  if (status in statusCodes) {
    statusCodes[status as keyof typeof statusCodes]++;
  }
};

const logRequestInfo = (req: Request, res: Response) => {
  console.log("👀 [INFO]: ", req.method, req.originalUrl, res.statusCode, res.statusMessage);
  console.log("Total requests:", requestCount);
  for (const [key, value] of Object.entries(statusCodes)) {
    value > 0 && console.log(`Code: ${key}: requests: ${value}`);
  }
};

export const monitorRequest = (req: Request, res: Response, next: NextFunction, isReturn?: boolean) => {
  incrementRequestCount();
  res.on("finish", () => {
    updateStatusCodes(res.statusCode);
    logRequestInfo(req, res);
  });
  if (isReturn) {
    return;
  } else {
    next();
  }
};

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  monitorRequest(req, res, next);
};
