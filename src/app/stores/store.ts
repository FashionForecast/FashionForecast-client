import { configureStore } from '@reduxjs/toolkit';
import geolocationSlice from '../../store/slice/geolocationSlice';
import authSlice from '../../store/slice/authSlice';
import userSlice from '../../store/slice/userSlice';

export const store = configureStore({
  reducer: { auth: authSlice, geolocation: geolocationSlice, user: userSlice },
});
