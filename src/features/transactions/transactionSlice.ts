import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
    logout: () => initialState,
  },
});

export const { setTransactions, logout } = transactionsSlice.actions;
export default transactionsSlice.reducer;
