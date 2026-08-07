import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Only overwrites the fields that are actually present in the payload,
    // so callers can update e.g. just the token without wiping user/refreshToken.
    setCredentials: (state, action) => {
      if ("user" in action.payload) state.user = action.payload.user;
      if ("token" in action.payload) state.token = action.payload.token;
      if ("refreshToken" in action.payload)
        state.refreshToken = action.payload.refreshToken;
    },
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;