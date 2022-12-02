import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoBedOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { FaVectorSquare } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import rooms from '../../RoomData';
import { addRoom, getRoomDetails } from '../../redux/booking/rooms/roomSlice';

const MySwal = withReactContent(Swal);

const RoomDetails = ({ activeStep, steps, handleNext, handleBack }) => {
  const roomData = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const bookRoom = (room) => {
    MySwal.fire({
      title: room.name,
      text: room.desc,
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, Book Room',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      imageUrl: room.img,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: `${room.name} Image`,
    }).then((res) => {
      if (res.isConfirmed) {
        MySwal.fire({
          title: 'Booked!',
          text: 'Your room has been booked.',
          icon: 'success',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'Next',
        }).then((res) => {
          if (res.isConfirmed) {
            dispatch(addRoom({ ...room, booked: true }));
            handleNext();
          }
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getRoomDetails());
  }, [roomData]);

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
              <div className="flex items-center gap-6">
                <h3 className="text-[1.7rem] font-bold">{room.name}</h3>
                {room.id === roomData.id && roomData.booked === true && (
                  <span className="bg-green-500 px-4 text-white font-bold uppercase text-sm rounded-full py-1">
                    Booked
                  </span>
                )}
              </div>
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
                    <button
                      type="button"
                      className="book-now"
                      onClick={() => bookRoom(room)}
                    >
                      <span className="uppercase pt-[1px] tracking-widest font-bold text-sm">
                        Book Now
                      </span>
                      <span>
                        <SlArrowRight />
                      </span>
                    </button>
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

export default RoomDetails;
