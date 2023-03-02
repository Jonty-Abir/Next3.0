import { createSlice } from "@reduxjs/toolkit";

export enum status {
  loading = "loading",
  fullfile = "fullfile",
  error = "error",
}

const productSclice = createSlice({
  name: "productSclince",
  initialState: {
    data: [],
    status: status.fullfile,
  },
  reducers: {
    add: (state, actions) => {
      state.data = actions.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default productSclice.reducer;
export const { add, setStatus } = productSclice.actions;
