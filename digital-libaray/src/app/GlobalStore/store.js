"use client";

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/login/loginSlice";
import roleReducer from "./Features/role/roleSlice";
export const makeStore = configureStore({
  reducer: {
    login: loginReducer,
    role: roleReducer,
  },
});
