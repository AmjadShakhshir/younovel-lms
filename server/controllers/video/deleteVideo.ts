import { Request, Response } from "express";
import mongoose from "mongoose";

import videoService from "../../services/videosService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

/*
@ Desc     Delete video
@ Route    DELETE /api/v1/videos/:id
@ Access   Private/Admin
*/
export const deleteVideo = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const videoId = req.params.id as unknown as mongoose.Types.ObjectId;
    await videoService.deleteVideo(videoId);
    res.status(200).json({ success: true, message: "Video deleted successfully." });
  },
  { message: "Something went wrong while deleting video. Please try again." }
);
