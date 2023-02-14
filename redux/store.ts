import { configureStore } from "@reduxjs/toolkit";
import userSclice from "./Sclice/reducer";

const store = configureStore({
  reducer: {
    app: userSclice,
  },
});

export { store };
