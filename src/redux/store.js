import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import restaurantListSlice from './features/restaurantListSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    restaurantList: restaurantListSlice,
  },
});
