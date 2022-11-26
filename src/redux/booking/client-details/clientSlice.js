import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addClient: (state, action) => {
      state = action.payload;
    },
  },
});

export const { addClient } = clientSlice.actions;
export default clientSlice.reducer;