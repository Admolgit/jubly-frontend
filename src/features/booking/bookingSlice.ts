import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.booking = action.payload.booking;
    },
    logout: () => initialState,
  },
});

export const { setBookingDetails, logout } = bookingSlice.actions;
export default bookingSlice.reducer;
