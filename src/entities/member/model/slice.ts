import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MemberDto } from './types';

type MemberState = {
  info: MemberDto | null;
};

const slice = createSlice({
  name: 'member',
  initialState: {
    info: null,
  } as MemberState,
  reducers: {
    setMember: (state, action: PayloadAction<MemberDto>) => {
      state.info = action.payload;
    },
    setGender: (state, action: PayloadAction<MemberDto['gender']>) => {
      if (state.info) {
        state.info.gender = action.payload;
      }
    },
  },
});

export const memberActions = slice.actions;
export const memberSlice = slice.reducer;
