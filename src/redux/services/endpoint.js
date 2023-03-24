import instance from './axios';

// Fetch all rooms from API
export const fetchAllRooms = async () => {
  return await instance.get('rooms').then((res) => res.data);
};

// Fetch all guests from API
export const fetchAllGuests = async () => {
  return await instance.get('guests');
};

// Add a new guest to database
export const createGuest = async (payload) => {
  return await instance
    .post('guests', { guest: payload })
    .then((res) => res.data);
};

// Book a room
export const createBooking = async (payload) => {
  return await instance
    .post('bookings', { booking: payload })
    .then((res) => res.data);
};

// Make payment
export const createPayment = async (payload) => {
  return await instance
    .post('payments', { payment: payload })
    .then((res) => res.data);
};
