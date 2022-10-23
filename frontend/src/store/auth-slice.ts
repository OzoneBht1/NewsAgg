import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface authState {
  authTokens: authTokenState | null;
  user: {} | null;
}
type authTokenState = {
  access: string;
  refresh: string;
};

const initialState: authState = {
  authTokens: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginUser(state, action: PayloadAction<authTokenState>) {
      state.authTokens = action.payload;
      const token = action.payload.access;
      state.user = jwt_decode(token);
      localStorage.setItem("authTokens", JSON.stringify(action.payload));
    },
    logoutUser() {},
    updateTokens() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice;
