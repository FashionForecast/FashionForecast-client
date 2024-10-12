import { User } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  user: User | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.gender = action.payload;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
