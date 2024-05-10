import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { loggingMiddleware } from "./middlewares/logging";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoute";
import notificationRouter from "./routes/notificationRoute";
import analyticsRouter from "./routes/analyticsRoute";
import layoutRouter from "./routes/layoutRoute";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://younovel-lms.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users", loggingMiddleware, userRouter);
app.use("/api/v1/courses", loggingMiddleware, courseRouter);
app.use("/api/v1/orders", loggingMiddleware, orderRouter);
app.use("/api/v1/notifications", loggingMiddleware, notificationRouter);
app.use("/api/v1/analytics", loggingMiddleware, analyticsRouter);
app.use("/api/v1/layout", loggingMiddleware, layoutRouter);

app.get("/test", loggingMiddleware, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", loggingMiddleware, (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  res.status(404);
  next(err);
});

app.use(apiErrorHandler);
app.use(routeNotFound);

export default app;
