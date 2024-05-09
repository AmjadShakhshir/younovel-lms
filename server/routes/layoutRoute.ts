import express from "express";
import { createLayout } from "../controllers/layout/createLayout";
import { updateLayout } from "../controllers/layout/updateLayout";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { getLayout } from "../controllers/layout/getLayout";

const layoutRouter = express.Router();

layoutRouter.get("/get-layout", isAuthenticated, authorizeRoles("admin"), getLayout);
layoutRouter.post("/create-layout", isAuthenticated, authorizeRoles("admin"), createLayout);
layoutRouter.put("/update-layout", isAuthenticated, authorizeRoles("admin"), updateLayout);

export default layoutRouter;
