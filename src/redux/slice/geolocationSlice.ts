import { UserCurrentRegion } from '@/types/region';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type geolocationState = {
  value: UserCurrentRegion | null;
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    value: null,
  } as geolocationState,
  reducers: {
    updateGeolocation: (state, action: PayloadAction<UserCurrentRegion>) => {
      state.value = action.payload;
    },
  },
});

export const goelocationActions = geolocationSlice.actions;
export default geolocationSlice.reducer;
