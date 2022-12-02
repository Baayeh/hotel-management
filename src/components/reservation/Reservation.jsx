import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getRoomDetails } from '../../redux/booking/rooms/roomSlice';

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

const Reservation = ({ activeStep, steps, handleNext, handleBack }) => {
  const [value, setValue] = useState(0);
  const roomData = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getRoomDetails());
  }, [roomData]);

  return (
    <div className="my-10">
      {roomData && (
        <div className="reservation-container flex justify-between gap-6">
          <div className="reserve-img rounded overflow-hidden w-[60%]">
            <img src={roomData.img} alt={roomData.name} className="" />
          </div>
          <div className="book-form w-[40%]">
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
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </div>
        </div>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </div>
  );
};

export default Reservation;
