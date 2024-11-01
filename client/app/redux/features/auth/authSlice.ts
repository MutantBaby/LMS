import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./types";

const initialState: IInitialState = {
  user: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisteration: (state, action) => {
      state.token = action.payload.token;
    },
    userloggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    userloggedOut: (state, action) => {
      state.user = "";
      state.token = "";
    },
  },
});

export const { userRegisteration, userloggedIn, userloggedOut } =
  authSlice.actions;
