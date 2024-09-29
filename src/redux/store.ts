import { configureStore } from '@reduxjs/toolkit';
import geolocationSlice from './slice/geolocationSlice';

const store = configureStore({
  reducer: { geolocation: geolocationSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
