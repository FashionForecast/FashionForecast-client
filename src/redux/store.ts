import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/EXAMPLE_counterSlice';
import currentRegionSlice from './slice/currentRegionSlice';

const store = configureStore({
  reducer: { counter: counterReducer, currentRegion: currentRegionSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
