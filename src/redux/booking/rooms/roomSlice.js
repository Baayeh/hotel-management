import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room: {},
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRoomDetails: (state) => {
      return state.room;
    },
    addRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { getRoomDetails, addRoom } = roomSlice.actions;
export default roomSlice.reducer;
