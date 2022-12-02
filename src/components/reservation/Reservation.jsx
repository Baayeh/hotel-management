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
      {rooms &&
        rooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-img w-[20rem]">
              <img src={room.img} alt={room.name} />
            </div>
            <div className="room-details">
              <h3 className="text-[2rem] font-bold">{room.name}</h3>
              <div className="room-card-body">
                <div className="text-gray-600 my-4 flex items-center gap-5">
                  <div className="bed-info flex items-center gap-1">
                    <span className="text-3xl">
                      <IoBedOutline />
                    </span>
                    <span className="text-lg">{room.bed}</span>
                  </div>
                  <div className="bed-info flex items-center gap-1">
                    <span className="text-2xl">
                      <BsPeople />
                    </span>
                    <span className="text-lg">{room.guests} Guests</span>
                  </div>
                  <div className="bed-info flex items-center gap-1">
                    <span className="text-2xl">
                      <FaVectorSquare />
                    </span>
                    <span className="text-lg">{room.size} Sqm</span>
                  </div>
                </div>
                <p className="room-dec text-gray-600">{room.desc}</p>
                <div className="room-card-action">
                  <div className="book-room">
                    <Link to={`/booking/reserve/${room.id}`} type="button" className="book-now">
                      <span className="uppercase pt-[1px] tracking-widest font-bold text-sm">
                        Book Now
                      </span>
                      <span>
                        <SlArrowRight />
                      </span>
                    </Link>
                  </div>
                  <div className="room-price">
                    <span className="font-bold text-3xl text-primaryColorDark">
                      ${room.price}{' '}
                    </span>
                    <span className="text-gray-400">/ night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
