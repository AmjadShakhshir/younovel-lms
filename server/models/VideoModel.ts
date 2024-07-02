import mongoose, { Model, Schema } from "mongoose";

import { Video } from "../types/Video";

const videoSchema = new Schema<Video>(
  {
    title: {
      type: String,
      required: [true, "Please enter your title"],
    },
    description: {
      type: String,
      required: [true, "Please enter your description"],
    },
    url: {
      type: String,
      required: [true, "Please enter your url"],
    },
  },
  { timestamps: true }
);

const VideoModel: Model<Video> = mongoose.model("Video", videoSchema);

export default VideoModel;
