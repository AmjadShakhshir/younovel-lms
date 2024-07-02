import { Request, Response } from "express";

import videoService from "../../services/videosService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

/*
@ Desc     Create video
@ Route    POST /api/v1/videos
@ Access   Private/Admin
*/
export const createVideo = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const video = await videoService.create(req.body);
    res.status(201).json({ success: true, video });
  },
  { message: "Something went wrong while creating video. Please try again." }
);
