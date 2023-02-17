import { createSlice } from "@reduxjs/toolkit";
interface obj {
  client: {
    token: string;
    userName: string;
    _id: string;
    recoveryEmail: string;
    recoveryID: string;
  };
}

const initialState: obj = {
  client: {
    token: "",
    userName: "",
    _id: "",
    recoveryEmail: "",
    recoveryID: "",
  },
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
    setRecoveryEmail: (state, { payload }) => {
      state.client.recoveryEmail = payload;
    },
    setRecoveryID: (state, { payload }) => {
      state.client.recoveryID = payload;
    },
  },
});

export default reducerSclice.reducer;
export const { setToken, setUserDetails, setRecoveryEmail, setRecoveryID } =
  reducerSclice.actions;
