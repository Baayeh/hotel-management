import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import clientSlice from './booking/client-details/clientSlice';
import roomSlice from './booking/rooms/roomSlice';

const store = configureStore({
  reducer: {
    client: clientSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
