import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionsList: [],
};

const transactionsSliceList = createSlice({
  name: "transactionsList",
  initialState,
  reducers: {
    setTransactionsList: (state, action) => {
      state.transactionsList = action.payload.transactionsList;
    },
    logout: () => initialState,
  },
});

export const { setTransactionsList, logout } =
  transactionsSliceList.actions;
export default transactionsSliceList.reducer;
