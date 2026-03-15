import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availability: null
}

const availabilitySlice = createSlice({
  name: "availability",
    initialState,
    reducers: {
      setAvailability: (state, action) => {
        state.availability = action.payload.availability;
      },
      logout: () => initialState,
    },
})

export const { setAvailability, logout } = availabilitySlice.actions;
export default availabilitySlice.reducer;