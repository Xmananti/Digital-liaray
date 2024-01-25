import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setHasRole: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHasRole } = roleSlice.actions;

export default roleSlice.reducer;
