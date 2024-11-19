import { UserCurrentRegion } from '@/types/region';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type geolocationState = {
  value: UserCurrentRegion | null;
  status: 'pending' | 'available' | 'error';
};

const geolocationSlice = createSlice({
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

export const goelocationActions = geolocationSlice.actions;
export default geolocationSlice.reducer;
