import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms } from '../services/endpoint';

const initialState = {
  rooms: [],
  room: {},
  status: '',
  errors: null,
  errMsg: '',
  message: '',
};

export const getRooms = createAsyncThunk('rooms/getRooms', async (thunkAPI) => {
  try {
    const response = await fetchAllRooms();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    storeSingleRoom: (state, action) => {
      const IsStored = state;
      IsStored.room = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        const IsPending = state;
        IsPending.status = 'pending';
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        const IsFulfilled = state;
        IsFulfilled.status = 'fulfilled';
        IsFulfilled.rooms = action.payload;
        IsFulfilled.errors = [];
        IsFulfilled.message = action.payload.message;
      })
      .addCase(getRooms.rejected, (state) => {
        const IsRejected = state;
        IsRejected.status = 'rejected';
      });
  },
});

export const { storeSingleRoom } = roomSlice.actions;

export default roomSlice.reducer;
