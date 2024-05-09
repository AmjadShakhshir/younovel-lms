import { User } from "../../../app/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {} as User,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = {} as User;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
