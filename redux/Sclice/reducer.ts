import { createSlice } from "@reduxjs/toolkit";
interface obj {
  client: { token: string; userName: string; _id: string };
}

const initialState: obj = {
  client: { token: "", userName: "", _id: "" },
};

const reducerSclice = createSlice({
  name: "user_credential",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.client.token = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.client._id = payload.id;
      state.client.userName = payload.username;
    },
  },
});

export default reducerSclice.reducer;
export const { setToken, setUserDetails } = reducerSclice.actions;
