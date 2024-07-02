import express from "express";

import { getAllVideo } from "../controllers/video/getAllVideos";
import { getVideo } from "../controllers/video/getVideo";
import { createVideo } from "../controllers/video/createVideo";
import { deleteVideo } from "../controllers/video/deleteVideo";

const videoRouter = express.Router();

videoRouter.get("/", getAllVideo);
videoRouter.get("/:id", getVideo);
videoRouter.post("/", createVideo);
videoRouter.delete("/:id", deleteVideo);

export default videoRouter;
