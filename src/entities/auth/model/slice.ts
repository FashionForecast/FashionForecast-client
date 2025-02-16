import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
};

const slice: Slice<AuthState> = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
  } as AuthState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const authActions = slice.actions;
export const authSlice = slice.reducer;
