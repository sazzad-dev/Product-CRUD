// import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   restaurantListState: '',
// };

// export const restaurantListSlice = createSlice({
//   name: 'restaurantListState',
//   initialState,
//   reducers: {
//     setRestaurantListState: (state, action) => {
//       state.restaurantListState = action.payload;
//     },
//   },
// });

// export const { setRestaurantListState } = restaurantListSlice.actions;

const REDUCER_NAME = 'restaurantApp/restaurantList';

export const fetchRestaurantList = createAsyncThunk(
  `${REDUCER_NAME}/fetchRestaurantList`,
  async (params) => {
    try {
      const response = await fetch(
        'https://rms.techsistltd.com/restaurant/v1/restaurant/'
      );
      console.log('response', response);
      const responseData = await response?.data;
      return responseData?.data;
    } catch (e) {
      console.log('error', e);
    }
  }
);

const restaurantListSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantList.fulfilled, (state, action) => {
        return { isLoading: false, isError: false, data: action.payload };
      })
      .addCase(fetchRestaurantList.pending, (state, action) => {
        return { isLoading: true, isError: false, data: null };
      })
      .addCase(fetchRestaurantList.rejected, (state, action) => {
        return { isLoading: false, isError: true, data: null, error: '' };
      });
  },
});

export const selectRestaurantList = (state) =>
  state.restaurantApp?.restaurantList;

export default restaurantListSlice.reducer;
