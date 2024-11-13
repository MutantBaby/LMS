import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IInitialState } from "./types";

const initialState: IInitialState = {
  user: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisteration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userloggedIn: (state, action: PayloadAction<IInitialState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userloggedOut: (state, action: PayloadAction<IInitialState>) => {
      state.user = "";
      state.token = "";
    },
  },
});

export const { userRegisteration, userloggedIn, userloggedOut } =
  authSlice.actions;
export default authSlice.reducer;
