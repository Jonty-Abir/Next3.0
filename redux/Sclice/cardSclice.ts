import { createSlice } from "@reduxjs/toolkit";

const cardSclice = createSlice({
  name: "productSclince",
  initialState: {
    card: [],
  },
  reducers: {
    addOnCard: (state, { payload }) => {
      //@ts-ignore
      state.card.push(payload);
    },

    removeToCard: (state, action) => {
      state.card = state.card.filter((v: any) => v.id != action.payload);
    },
  },
});

export default cardSclice.reducer;
export const { addOnCard, removeToCard } = cardSclice.actions;
