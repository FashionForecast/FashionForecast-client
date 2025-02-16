import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@/entities/auth';
import { geolocationSlice } from '@/entities/geolocation';
import { memberSlice } from '@/entities/member/model/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    geolocation: geolocationSlice,
    member: memberSlice,
  },
});
