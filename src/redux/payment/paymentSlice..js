import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPayment } from '../services/endpoint';

const initialState = {
  payments: [],
  payment: {},
  message: '',
  status: '',
  errMsg: '',
  errors: [],
};

export const makePayment = createAsyncThunk(
  'payments/makePayment',
  async (payload, thunkAPI) => {
    try {
      const response = await createPayment(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearStatus: (state) => {
      const IsCleared = state;
      IsCleared.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        const IsPending = state;
        IsPending.status = 'pending';
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        const IsFulfilled = state;
        IsFulfilled.status = 'fulfilled';
        IsFulfilled.payment = action.payload.data;
        IsFulfilled.message = action.payload.message;
        IsFulfilled.errMsg = '';
        IsFulfilled.errors = [];
      })
      .addCase(makePayment.rejected, (state, action) => {
        const IsRejected = state;
        IsRejected.status = 'rejected';
        IsRejected.payment = {};
        IsRejected.errMsg = action.payload.message;
        IsRejected.errors = action.payload.errors;
      });
  },
});

export const { clearStatus } = paymentSlice.actions

export default paymentSlice.reducer;
