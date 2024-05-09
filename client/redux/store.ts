"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Call the refresh token function on every page load
const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));

  await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};
initializeApp();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
