import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    signedInUser: '',
  },
  reducers: {
    loginSuccess: (state) => { state.isAuthenticated = true },
    logout: (state) => { state.isAuthenticated = false },
    setSignedInUser: (state, action) => { state.signedInUser = action.payload },
  }
})

export const { loginSuccess, logout, setSignedInUser } = authSlice.actions;

export default authSlice.reducer;
