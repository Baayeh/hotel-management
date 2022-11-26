import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {},
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    getDetails: (state) => {
      return state.client;
    },
    addClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { addClient, getDetails } = clientSlice.actions;
export default clientSlice.reducer;