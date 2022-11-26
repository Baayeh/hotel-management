import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import clientSlice from './booking/client-details/clientSlice';

const store = configureStore({
  reducer: {
    client: clientSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
