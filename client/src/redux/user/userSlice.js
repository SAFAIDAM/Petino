import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error= false
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    }
  }
});


export const { loginStart, loginSuccess, loginError , signout} = userSlice.actions;
export default userSlice.reducer;