import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { loggingMiddleware } from "./middlewares/logging";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import notificationRouter from "./routes/notificationRoute";
import layoutRouter from "./routes/layoutRoute";
import contactRouter from "./routes/contactRoute";
import videoRouter from "./routes/videoRoute";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://younovel-dashboard.vercel.app", "https://younovel-front.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users", loggingMiddleware, userRouter);
app.use("/api/v1/courses", loggingMiddleware, courseRouter);
app.use("/api/v1/notifications", loggingMiddleware, notificationRouter);
app.use("/api/v1/layout", loggingMiddleware, layoutRouter);
app.use("/api/v1/contact", loggingMiddleware, contactRouter);
app.use("/api/v1/videos", loggingMiddleware, videoRouter);

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
