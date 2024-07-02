import { Request, Response } from "express";

import videoService from "../../services/videosService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

/*
@ Desc     Get all video
@ Route    GET /api/v1/videos
@ Access   Public
*/
export const getAllVideo = catchAsyncErrors(
  async (_: Request, res: Response) => {
    const videos = await videoService.findAll();
    res.status(200).json({ success: true, videos });
  },
  { message: "Something went wrong while fetching video. Please try again." }
);
