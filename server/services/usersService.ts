import mongoose from "mongoose";
import UserRepo from "../models/UserModel";
import { LoginRequest, RegisterationBody, SocialAuthBody, UpdateUser, User } from "../types/User";
import { redis } from "../utils/redis";

const findAll = async () => {
  const users = await UserRepo.find().sort({ createdAt: -1 });
  return users;
};

const signUp = async (user: RegisterationBody) => {
  const newUser = new UserRepo(user);
  return await newUser.save();
};

const socialAuthSignup = async (socialAuthInfo: SocialAuthBody) => {
  const { email, name, avatar } = socialAuthInfo;
  const user = await UserRepo.create({ email, name, avatar });
  return user;
};

const logIn = async (loggedInUser: LoginRequest) => {
  const email = loggedInUser.email;
  const user = await UserRepo.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const findByEmail = async (email: string) => {
  const emailFoundInDB = await UserRepo.findOne({ email });
  return emailFoundInDB;
};

const findById = async (id: mongoose.Types.ObjectId) => {
  const userId = id.toString();
  const user = await redis.get(userId);
  return user;
};

const findByName = async (name: string) => {
  const user = await UserRepo.findOne({ name });
  return user;
};

const updateUser = async (id: mongoose.Types.ObjectId, userUpdatedInfo: UpdateUser) => {
  const updatedUser = await UserRepo.findByIdAndUpdate(id, userUpdatedInfo, { new: true });
  return updatedUser;
};

const updatePassword = async (id: mongoose.Types.ObjectId, oldPassword: string, newPassword: string) => {
  const user = await UserRepo.findById(id).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await user.comparePassword(oldPassword);
  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  return user;
};

const updateAvatar = async (id: mongoose.Types.ObjectId, avatar: string) => {
  const updatedUserAvatar = await UserRepo.findByIdAndUpdate(id, { avatar }, { new: true });
  return updatedUserAvatar;
};

const updateUserRole = async (id: mongoose.Types.ObjectId, role: string) => {
  console.log(id, role);
  const updatedUserRole = await UserRepo.findByIdAndUpdate(id, { role }, { new: true });
  return updatedUserRole;
};

const deleteUser = async (id: mongoose.Types.ObjectId) => {
  const deletedUser = await UserRepo.findByIdAndDelete({ _id: id });
  return deletedUser;
};

export default {
  findAll,
  signUp,
  logIn,
  findByEmail,
  findById,
  findByName,
  socialAuthSignup,
  updateUser,
  updatePassword,
  updateAvatar,
  updateUserRole,
  deleteUser,
};
