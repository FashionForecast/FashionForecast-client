import { UserCurrentRegion } from '@/types/region';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type currentRegionState = {
  value: UserCurrentRegion | null;
};

const DEFAULT_REGION = {
  region: '서울특별시 종로구',
  nx: 37,
  ny: 126,
};

const currentRegionSlice = createSlice({
  name: 'currentRegion',
  initialState: {
    value: null,
  } as currentRegionState,
  reducers: {
    setCurrentRegion: (
      state,
      action: PayloadAction<UserCurrentRegion | null>
    ) => {
      state.value = action.payload || DEFAULT_REGION;
    },
  },
});

export const currentRegionActions = currentRegionSlice.actions;
export default currentRegionSlice.reducer;
