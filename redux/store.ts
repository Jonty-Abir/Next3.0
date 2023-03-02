import { configureStore } from "@reduxjs/toolkit";
import cardSclice from "./Sclice/cardSclice";
import productSclice from "./Sclice/productSclice";
import userSclice from "./Sclice/reducer";

const store = configureStore({
  reducer: {
    app: userSclice,
    product: productSclice,
    card: cardSclice,
  },
});

export { store };
