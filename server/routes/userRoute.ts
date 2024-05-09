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

userRouter.get("/all-users", isAuthenticated, authorizeRoles("admin"), getAllUsers);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/me", isAuthenticated, getUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.post("/signup", signup);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user", isAuthenticated, updatedUser);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePic);
userRouter.put("/update-user-role", isAuthenticated, authorizeRoles("admin"), updateUserRole);
userRouter.delete("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
