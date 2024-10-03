import { configureStore } from '@reduxjs/toolkit';
import geolocationSlice from './slice/geolocationSlice';
import authSlice from './slice/authSlice';

const store = configureStore({
  reducer: { auth: authSlice, geolocation: geolocationSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
