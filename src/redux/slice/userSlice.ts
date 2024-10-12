import { User } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  info: User | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.info = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      if (state.info) {
        state.info.gender = action.payload;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
