import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_REGION } from './consts';
import { Region } from './region';

type RegionState = {
  geolocation: Region | null;
  selectedRegion: Region | null;
  geolocationStatus: 'pending' | 'success' | 'error';
};

const slice = createSlice({
  name: 'region',
  initialState: {
    geolocation: null,
    geolocationStatus: 'pending',
    selectedRegion: DEFAULT_REGION,
  } as RegionState,
  reducers: {
    updateGeolocation: (state, action: PayloadAction<Region>) => {
      state.geolocation = action.payload;
    },
    updateSelectedRegion: (state, action: PayloadAction<Region>) => {
      state.selectedRegion = action.payload;
    },
    updateStatus: (
      state,
      action: PayloadAction<RegionState['geolocationStatus']>
    ) => {
      state.geolocationStatus = action.payload;
    },
  },
});

export const regionActions = slice.actions;
export const regionSlice = slice.reducer;
