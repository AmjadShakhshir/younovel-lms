import express from "express";

import { activateUser, signup } from "../controllers/users/signup";
import { loginUser } from "../controllers/users/login";
import { logout } from "../controllers/users/logout";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { updateAccessToken } from "../controllers/users/updateAccessToken";
import { getUser } from "../controllers/users/getUser";
import { socialAuth } from "../controllers/users/socialAuth";
import { updatedUser } from "../controllers/users/updatedUser";
import { updatePassword } from "../controllers/users/updatePassword";
import { updateProfilePic } from "../controllers/users/updateProfilePic";
import { getAllUsers } from "../controllers/users/getAllUsers";
import { updateUserRole } from "../controllers/users/updateUserRole";
import { deleteUser } from "../controllers/users/deleteUser";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/me", isAuthenticated, getUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.post("/signup", signup);
userRouter.post("/activate", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/social", socialAuth);
userRouter.put("/update", isAuthenticated, updatedUser);
userRouter.put("/password", isAuthenticated, updatePassword);
userRouter.put("/avatar", isAuthenticated, updateProfilePic);
userRouter.put("/role", isAuthenticated, authorizeRoles("admin"), updateUserRole);
userRouter.delete("/:id", authorizeRoles("admin"), deleteUser);

export default userRouter;
