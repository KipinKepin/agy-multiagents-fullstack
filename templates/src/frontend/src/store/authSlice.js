import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('cinetix_user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('cinetix_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('cinetix_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
