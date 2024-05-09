import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "../auth/authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (body) => ({
        url: "users/signup",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log("register", error.message);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ token, activationCode }) => ({
        url: "users/activate-user",
        method: "POST",
        body: { token, activationCode },
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log("activation", error.message);
        }
      },
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "users/login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log("activation", error.message);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation } = authApi;
