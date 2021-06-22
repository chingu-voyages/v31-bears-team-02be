import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    loginSuccess: (state) => { state.isAuthenticated = true },
    logout: (state) => { state.isAuthenticated = false }
  }
})

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
