import { Request, Response } from "express";

import videoService from "../../services/videosService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import mongoose from "mongoose";

/*
@ Desc     Get video
@ Route    GET /api/v1/videos/:id
@ Access   Public
*/
export const getVideo = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const videoId = req.params.id as unknown as mongoose.Types.ObjectId;
    const video = await videoService.findById(videoId);
    res.status(200).json({ success: true, video });
  },
  { message: "Something went wrong while fetching video. Please try again." }
);
