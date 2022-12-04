import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FiMonitor, FiWifi } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { GiShower } from 'react-icons/gi';
import { FaVectorSquare } from 'react-icons/fa';
import { MdOutlineRoomService } from 'react-icons/md';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getRoomDetails } from '../../redux/booking/rooms/roomSlice';

const initialValues = {
  checkIn: null,
  checkOut: null,
};

const validationSchema = Yup.object({
  checkIn: Yup.date().nullable().required('Required'),
  checkOut: Yup.date().nullable().required('Required'),
});

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Breakfast', 'Lunch', 'Supper'];

const getStyles = (name, roomService, theme) => {
  return {
    fontWeight:
      roomService.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const Reservation = ({ activeStep, steps, handleNext, handleBack }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [roomService, setRoomService] = useState([]);
  const roomData = useSelector((state) => state.room);
  const [isError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleMultipleSelect = (e) => {
    const {
      target: { value },
    } = e;
    setRoomService(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onSubmit = (values) => {
    const newValues = { ...values, roomService };
    console.log(newValues);
    // handleNext();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getRoomDetails());
  }, [roomData]);

  return (
    <div className="my-10">
      {roomData && (
        <div>
          <div className="reservation-container relative flex justify-between">
            <div className="reserve-img w-[60%]">
              <img
                src={roomData.img}
                alt={roomData.name}
                className="w-[33rem] h-[25rem]"
              />

              <div className="my-3 border-b border-gray-300 pb-4 flex justify-between items-center">
                <h3 className="text-3xl font-bold">{roomData.name}</h3>
                <p className="text-lg text-gray-500">Room Features</p>
              </div>

              <div className="my-10 flex justify-between items-center gap-5">
                <div className="bed-info flex items-center gap-3">
                  <span className="text-3xl text-gray-700">
                    <IoBedOutline />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-extrabold">Bed</span>
                    <span className="text-lg text-gray-500">
                      {roomData.bed}
                    </span>
                  </div>
                </div>
                <div className="bed-info flex items-center gap-5">
                  <span className="text-2xl text-gray-700">
                    <BsPeople />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-extrabold">Max Guest</span>
                    <span className="text-lg text-gray-500">
                      {roomData.guests} Guests
                    </span>
                  </div>
                </div>
                <div className="bed-info flex items-center gap-5">
                  <span className="text-2xl text-gray-700">
                    <FaVectorSquare />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-extrabold">Room Space</span>
                    <span className="text-lg text-gray-500">
                      {roomData.size} sqm.
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 border-gray-300">
                {roomData.desc}
              </div>

              <section className="room-amenities mt-10">
                <h4 className="text-2xl text-gray-600 mb-5">Room Amenities</h4>
                <section className="flex flex-wrap gap-4">
                  <div className="amenity-card">
                    <span className="text-3xl">
                      <FiMonitor />
                    </span>
                    <span className="text-md text-gray-500">TV</span>
                  </div>
                  <div className="amenity-card">
                    <span className="text-3xl">
                      <FiWifi />
                    </span>
                    <span className="text-md text-gray-500">Free WiFi</span>
                  </div>
                  <div className="amenity-card">
                    <span className="text-3xl">
                      <GiShower />
                    </span>
                    <span className="text-md text-gray-500">None Smoking</span>
                  </div>
                  <div className="amenity-card">
                    <span className="text-3xl">
                      <MdOutlineRoomService />
                    </span>
                    <span className="text-md text-gray-500">Room Service</span>
                  </div>
                </section>
              </section>
            </div>
            <div className="book-form flex flex-col items-center w-[40%] fixed top-[10rem] right-[3rem]">
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
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isValid, values, setFieldValue }) => (
                      <Form className="flex flex-col gap-6">
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Check In"
                              inputFormat="DD/MM/YYYY"
                              value={values.checkIn}
                              onChange={(value) =>
                                setFieldValue('checkIn', value)
                              }
                              renderInput={(params) => (
                                <Field name="checkIn">
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
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Check Out"
                              inputFormat="DD/MM/YYYY"
                              value={values.checkOut}
                              onChange={(value) =>
                                setFieldValue('checkOut', value)
                              }
                              renderInput={(params) => (
                                <Field name="checkOut">
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

                        <div>
                          <FormControl sx={{ width: 250 }}>
                            <InputLabel id="demo-multiple-chip-label">
                              Service
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={roomService}
                              onChange={handleMultipleSelect}
                              input={
                                <OutlinedInput
                                  id="select-multiple-chip"
                                  label="Chip"
                                />
                              }
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, roomService, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="border bg-slate-800 text-white w-full border-slate-800 p-3 rounded uppercase hover:bg-transparent hover:text-slate-800 transition-all ease-out duration-700 disabled:bg-gray-400 disabled:text-gray-500 disabled:border-0"
                            disabled={!isValid}
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
                            <Button onClick={handleNext} disabled={!isValid}>
                              {activeStep === steps.length - 1
                                ? 'Finish'
                                : 'Next'}
                            </Button>
                          </Box>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
