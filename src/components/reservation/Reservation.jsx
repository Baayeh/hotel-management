import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoBedOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { FaVectorSquare } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import rooms from '../../RoomData';
import { Link } from "react-router-dom";

const Reservation = ({ activeStep, steps, handleNext, handleBack }) => {
  return (
    <div className="my-5">
      <div className="reservation-banner">
        <div className="banner-overlay">
          <h2 className="text-5xl font-bold">Available Rooms</h2>
        </div>
      </div>
      

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
