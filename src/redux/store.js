import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './booking/client-details/clientSlice';

const store = configureStore({
  reducers: {
    client: clientSlice,
  },
});

export default store;
