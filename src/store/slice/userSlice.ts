import { Member } from '@/types/member';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  info: Member | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<Member>) => {
      state.info = action.payload;
    },
    setGender: (state, action: PayloadAction<Member['gender']>) => {
      if (state.info) {
        state.info.gender = action.payload;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
