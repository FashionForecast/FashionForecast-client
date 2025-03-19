import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@/entities/auth';
import { memberSlice } from '@/entities/member/model/slice';
import { regionSlice } from '@/entities/region';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    region: regionSlice,
    member: memberSlice,
  },
});
