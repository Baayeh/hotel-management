import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room: {
    bed: '1 King Bed',
    booked: true,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.',
    guests: 4,
    id: 1,
    img: '/src/assets/images/room-1.jpg',
    name: 'Luxury Suite',
    price: 90,
    size: 30,
  },
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
