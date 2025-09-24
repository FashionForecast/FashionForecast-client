import { createSlice } from '@reduxjs/toolkit';

import { getDefaultTimes } from '../lib/getDefaultTimes';

const slice = createSlice({
  name: 'times',
  initialState: {
    selected: getDefaultTimes(),
  },
  reducers: {
    updateTimes: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const timesActions = slice.actions;
export const timesSlice = slice.reducer;
