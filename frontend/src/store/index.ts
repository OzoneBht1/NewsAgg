import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
// inferring the "RootState" and "AppDispatch" types from the store itself

export type AppDispatch = typeof store.dispatch;

export default store;
