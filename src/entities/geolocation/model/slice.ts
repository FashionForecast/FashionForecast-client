import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserCurrentRegion } from '@/shared/types/region';

type geolocationState = {
  value: UserCurrentRegion | null;
  status: 'pending' | 'available' | 'error';
};

const slice = createSlice({
  name: 'geolocation',
  initialState: {
    value: null,
    status: 'pending',
  } as geolocationState,
  reducers: {
    updateGeolocation: (state, action: PayloadAction<UserCurrentRegion>) => {
      state.value = action.payload;
    },
    updateStatus: (
      state,
      action: PayloadAction<geolocationState['status']>
    ) => {
      state.status = action.payload;
    },
  },
});

export const geolocationActions = slice.actions;
export const geolocationSlice = slice.reducer;
