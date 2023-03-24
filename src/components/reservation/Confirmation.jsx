import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaVectorSquare } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { SlArrowRight } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import completedImg from '/src/assets/images/completed.svg';

const MySwal = withReactContent(Swal);

const Confirmation = ({ activeStep, steps, handleNext, handleBack }) => {
  const navigate = useNavigate();
  const { room } = useSelector((state) => state.rooms);
  const { payment } = useSelector((state) => state.payments);
  const { guest } = useSelector((state) => state.guests);

  const printReceipt = () => {
    window.print();
  };

  const handleFormCompletion = () => {
    console.log('Here');
    MySwal.fire({
      title: 'Completed!',
      text: 'The booking process has been completed.',
      icon: 'success',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Go to dashboard',
    }).then((res) => {
      if (res.isConfirmed) {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="mt-6">
      <section className="confirmation">
        <div className="confirmation-summary">
          <div className="summary-detail w-[60%]">
            <p className="text-gray-500 text-sm">Room Summary</p>

            <div>
              <h3 className="font-bold text-2xl">{room.room_type}</h3>
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
                    <span className="text-lg">{room.room_size} Sqm</span>
                  </div>
                </div>
                <p className="room-dec text-gray-600">{room.room_desc}</p>
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

              <ul className="total-list">
                <li className="total-item">
                  <span>GHC {room.room_price}</span>
                  <span>per night</span>
                </li>
                <li className="total-item">
                  <span>{payment.total_amount / room.room_price}</span>
                  <span>number of nights</span>
                </li>
                <li className="total-item">
                  <span className="text-lg">GHC {payment.total_amount}</span>
                  <span>Total</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="summary-img w-[40%]">
            <img src={completedImg} alt="" />
          </div>
        </div>
        <div className="flex justify-between my-5 px-2">
          <section className="client-details">
            <h4 className="text-gray-500 text-sm">Client details</h4>
            <h6 className="font-bold">{guest.f_name} {guest.l_name}</h6>
            <p>{guest.email}</p>
            <p>{guest.phone_number}</p>
          </section>
          <section className="payment-details">
            <h4 className="text-gray-500 text-sm">Payment method</h4>
            <p className="font-bold">{payment.payment_method}</p>
          </section>
        </div>
        <div className="receipt-btn flex justify-end">
          <button type="button" onClick={printReceipt}>
            Print Receipt
          </button>
        </div>
      </section>
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
        <Button onClick={handleFormCompletion}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </div>
  );
};

export default Confirmation;
