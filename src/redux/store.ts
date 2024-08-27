import { configureStore } from '@reduxjs/toolkit';
import currentRegionSlice from './slice/currentRegionSlice';

const store = configureStore({
  reducer: { currentRegion: currentRegionSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
