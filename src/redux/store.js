import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import bookingSlice from './booking/bookingSlice';
// import clientSlice from './booking/client-details/clientSlice';
// import roomIdSlice from './booking/rooms/roomIdSlice';
import guestSlice from './guests/guestSlice';
import paymentSlice from './payment/paymentSlice.';
import roomSlice from './rooms/roomSlice';

const store = configureStore({
  reducer: {
    // client: clientSlice,
    // room: roomIdSlice,
    rooms: roomSlice,
    guests: guestSlice,
    bookings: bookingSlice,
    payments: paymentSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
