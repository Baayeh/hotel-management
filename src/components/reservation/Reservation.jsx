import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaVectorSquare } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { SlArrowRight } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { bookARoom, clearStatus } from '../../redux/booking/bookingSlice';
import { getRooms, storeSingleRoom } from '../../redux/rooms/roomSlice';

const MySwal = withReactContent(Swal);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const Reservation = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  values,
  setFieldValue,
}) => {
  const [value, setValue] = useState(0);
  const rooms = useSelector((state) => state.rooms.rooms);
  const { guest } = useSelector((state) => state.guests);
  const { status, message, errMsg, errors } = useSelector(
    (state) => state.bookings
  );
  const [isError] = useState(false);
  const dispatch = useDispatch();
  const [guestId, setGuestId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleBookingForm = () => {
    const booking = {
      guest_id: guestId,
      room_id: selectedRoom.id,
      check_in_date: values.check_in_date,
      check_out_date: values.check_out_date,
    };
    dispatch(bookARoom(booking));
  };

  const displayErrors = (errArray) => {
    return (
      <ul>
        {errArray &&
          errArray.map((err, index) => {
            return (
              <li key={index}>
                {index + 1}. {err}
              </li>
            );
          })}
      </ul>
    );
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        dispatch(clearStatus());
        dispatch(storeSingleRoom(selectedRoom));
        handleNext();
      });
    }

    if (status === 'rejected') {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: errMsg,
        html: displayErrors(errors),
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      }).then(() => {
        dispatch(clearStatus());
      });
    }
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    if (guest) {
      setGuestId(guest.id);
    }
  }, [guest]);

  return (
    <div className="my-10">
      {rooms && (
        <div>
          <div className="reservation-banner">
            <div className="banner-overlay">
              <h2 className="text-5xl font-bold">Available Rooms</h2>
            </div>
          </div>
          <div className="reservation-container relative flex justify-between">
            {/* Room List */}
            <div className="my-5">
              {rooms.length !== 0 &&
                rooms.map((room) => (
                  <div className="room-card" key={room.id}>
                    <div className="room-img w-[20rem]">
                      <img src={room.room_img} alt={room.room_type} />
                    </div>
                    <div className="room-details">
                      <div className="flex items-center gap-6">
                        <h3 className="text-[1.7rem] font-bold">
                          {room.room_type}
                        </h3>
                      </div>
                      <div className="room-card-body">
                        <div className="text-gray-600 my-4 flex items-center gap-5">
                          <div className="bed-info flex items-center gap-1">
                            <span className="text-3xl">
                              <IoBedOutline />
                            </span>
                            <span className="text-lg">{room.beds}</span>
                          </div>
                          <div className="bed-info flex items-center gap-1">
                            <span className="text-2xl">
                              <BsPeople />
                            </span>
                            <span className="text-lg">
                              {room.room_max_guests} Guests
                            </span>
                          </div>
                          <div className="bed-info flex items-center gap-1">
                            <span className="text-2xl">
                              <FaVectorSquare />
                            </span>
                            <span className="text-lg">
                              {room.room_size} Sqm
                            </span>
                          </div>
                        </div>
                        <p className="room-dec text-gray-600">
                          {room.room_desc}
                        </p>
                        <div className="room-card-action">
                          <div className="book-room">
                            <button type="button" className="more-details">
                              <span className="uppercase pt-[1px] tracking-widest font-bold text-sm">
                                More Details
                              </span>
                              <span>
                                <SlArrowRight />
                              </span>
                            </button>
                          </div>
                          <div className="room-price">
                            <span className="font-bold text-3xl text-primaryColorDark">
                              GHC {room.room_price}{' '}
                            </span>
                            <span className="text-gray-400">/ night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Booking Form */}
            <div className="book-form flex flex-col items-center w-[40%] relative">
              <div className="sticky top-28 mt-24">
                <Box sx={{ borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Booking Forms"
                  >
                    <Tab label="Book Your Room" {...a11yProps(0)} />
                    <Tab label="Enquiry" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div>
                    <div className="flex flex-col gap-6">
                      {/* Guest Details */}
                      <div>
                        <TextField
                          disabled
                          fullWidth
                          value={guest ? `${guest.f_name} ${guest.l_name}` : ''}
                        />
                      </div>

                      {/* Select Room */}
                      <div>
                        <FormControl className="w-full">
                          <InputLabel id="room" required>
                            Room
                          </InputLabel>
                          <Select
                            labelId="room"
                            id="room"
                            label="Room"
                            required
                            value={selectedRoom}
                            onChange={handleSelectedRoom}
                          >
                            {rooms.length &&
                              rooms.map((room) => {
                                return (
                                  <MenuItem key={room.id} value={room}>
                                    {room.room_type}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>

                      {/* Check In */}
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Check In"
                            inputFormat="DD/MM/YYYY"
                            value={values.check_in_date}
                            onChange={(value) =>
                              setFieldValue('check_in_date', value)
                            }
                            renderInput={(params) => (
                              <Field name="check_in_date">
                                {({ field, meta }) => (
                                  <TextField
                                    required
                                    {...params}
                                    {...field}
                                    error={
                                      meta.touched && meta.error
                                        ? !isError
                                        : isError
                                    }
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              </Field>
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                      {/* Check Out */}
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Check Out"
                            inputFormat="DD/MM/YYYY"
                            value={values.check_out_date}
                            onChange={(value) =>
                              setFieldValue('check_out_date', value)
                            }
                            renderInput={(params) => (
                              <Field name="check_out_date">
                                {({ field, meta }) => (
                                  <TextField
                                    required
                                    {...params}
                                    {...field}
                                    error={
                                      meta.touched && meta.error
                                        ? !isError
                                        : isError
                                    }
                                    helperText={meta.touched && meta.error}
                                  />
                                )}
                              </Field>
                            )}
                          />
                        </LocalizationProvider>
                      </div>

                      {/* Check In Button */}
                      <div>
                        <button
                          type="submit"
                          className="border bg-slate-800 text-white w-full border-slate-800 p-3 rounded uppercase hover:bg-transparent hover:text-slate-800 transition-all ease-out duration-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-0"
                        >
                          Check In Now
                        </button>
                      </div>

                      <div>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                          }}
                        >
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <Button onClick={handleBookingForm}>
                            {activeStep === steps.length - 1
                              ? 'Finish'
                              : 'Save & Continue'}
                          </Button>
                        </Box>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
