import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendar: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar: (state, action) => {
      state.calendar = action.payload.calendar;
    },
    logout: () => initialState,
  },
});

export const { setCalendar, logout } = calendarSlice.actions;
export default calendarSlice.reducer;
