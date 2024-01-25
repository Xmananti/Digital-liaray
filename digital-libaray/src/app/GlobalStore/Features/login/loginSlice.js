import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [false],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setHasLogin: (state, action) => {
      const text = action.payload;
      state.value.push(text);
    },
  },
});

export const { setHasLogin } = loginSlice.actions;

export default loginSlice.reducer;
