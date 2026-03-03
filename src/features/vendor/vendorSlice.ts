import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendor: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorCredentials: (state, action) => {
      state.vendor = action.payload.vendor;
    },
    logout: () => initialState,
  },
});

export const { setVendorCredentials, logout } = vendorSlice.actions;
export default vendorSlice.reducer;
