import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducer/login_reducer.ts'

export const store = configureStore({
  reducer: {
    counter: authSlice,
  },
});
