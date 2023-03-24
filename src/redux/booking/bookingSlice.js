import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBooking } from '../services/endpoint';

const initialState = {
  bookings: [],
  booking: {},
  message: '',
  errMsg: '',
  errors: [],
  status: '',
};

export const bookARoom = createAsyncThunk(
  'bookings/bookARoom',
  async (payload, thunkAPI) => {
    try {
      const response = await createBooking(payload);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearStatus: (state) => {
      const IsCleared = state;
      IsCleared.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookARoom.pending, (state) => {
        const IsPending = state;
        IsPending.status = 'pending';
      })
      .addCase(bookARoom.fulfilled, (state, action) => {
        const IsFulfilled = state;
        IsFulfilled.status = 'fulfilled';
        IsFulfilled.message = action.payload.message;
        IsFulfilled.booking = action.payload.data;
        IsFulfilled.errors = [];
        IsFulfilled.message = action.payload.message;
        IsFulfilled.errMsg = '';
      })
      .addCase(bookARoom.rejected, (state, action) => {
        const IsRejected = state;
        IsRejected.status = 'rejected';
        IsRejected.message = '';
        IsRejected.errMsg = action.payload.message;
        IsRejected.errors = action.payload.errors;
      });
  },
});

export const { clearStatus } = bookingSlice.actions;

export default bookingSlice.reducer;
