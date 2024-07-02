import mongoose from "mongoose";

import { Video } from "../types/Video";
import VideoRepo from "../models/VideoModel";

const findAll = async () => {
  const videos = await VideoRepo.find().sort({ createdAt: -1 });
  return videos;
};

const findById = async (id: mongoose.Types.ObjectId) => {
  const videoId = id.toString();
  const video = await VideoRepo.findById(videoId);
  return video;
};

const create = async (video: Video) => {
  const newVideo = new VideoRepo(video);
  return await newVideo.save();
};

const deleteVideo = async (id: mongoose.Types.ObjectId) => {
  return await VideoRepo.findByIdAndDelete(id);
};

export default {
  findAll,
  findById,
  create,
  deleteVideo,
};
