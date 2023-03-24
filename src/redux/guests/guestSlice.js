import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createGuest, fetchAllGuests } from '../services/endpoint';

const initialState = {
  guests: [],
  guest: {},
  status: '',
  errors: null,
  errMsg: '',
  message: '',
};

export const getGuests = createAsyncThunk(
  'guests/getGuests',
  async (thunkAPI) => {
    try {
      const response = await fetchAllGuests();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addGuest = createAsyncThunk(
  'guests/addGuest',
  async (payload, thunkAPI) => {
    try {
      const response = await createGuest(payload);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    clearStatus: (state) => {
      const IsCleared = state;
      IsCleared.status = '';
    },
    addSingleGuest: (state, action) => {
      const IsAdded = state;
      IsAdded.guest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGuests.pending, (state) => {
        const IsPending = state;
        IsPending.status = 'pending';
      })
      .addCase(getGuests.fulfilled, (state, action) => {
        const IsFulfilled = state;
        IsFulfilled.guests = action.payload;
        IsFulfilled.errors = [];
        IsFulfilled.errMsg = '';
      })
      .addCase(getGuests.rejected, (state) => {
        const IsRejected = state;
        IsRejected.status = 'rejected';
      })
      .addCase(addGuest.pending, (state) => {
        const IsPending = state;
        IsPending.status = 'pending';
      })
      .addCase(addGuest.fulfilled, (state, action) => {
        const IsFulfilled = state;
        IsFulfilled.status = 'fulfilled';
        IsFulfilled.guest = action.payload.data;
        IsFulfilled.errors = [];
        IsFulfilled.message = action.payload.message;
        IsFulfilled.errMsg = '';
      })
      .addCase(addGuest.rejected, (state, action) => {
        const IsRejected = state;
        IsRejected.status = 'rejected';
        IsRejected.message = '';
        IsRejected.errMsg = action.payload.message;
        IsRejected.errors = action.payload.errors;
      });
  },
});

export const { clearStatus, addSingleGuest } = guestSlice.actions;

export default guestSlice.reducer;
