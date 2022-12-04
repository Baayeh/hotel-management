import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import completedImg from '/src/assets/images/completed.svg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Confirmation = ({ activeStep, steps, handleNext, handleBack }) => {
  const navigate = useNavigate();

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
              <h3 className="font-bold text-2xl">Standard Deluxe</h3>
              <p>1 Room, $60 per night</p>

              <div className="room-services my-3 flex items-center gap-3">
                <div className="service-badge">Breakfast - $12</div>
                <div className="service-badge">Lunch - $12</div>
                <div className="service-badge">Supper - $15</div>
              </div>

              <ul className="total-list">
                <li className="total-item">
                  <span>$2000</span>
                  <span>Subtotal</span>
                </li>
                <li className="total-item">
                  <span>$500</span>
                  <span>VAT (20%)</span>
                </li>
                <li className="total-item">
                  <span className="text-lg">$2500</span>
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
            <h6 className="font-bold">John Doe</h6>
            <p>johndoe@gmail.com</p>
            <p>0203456789</p>
          </section>
          <section className="payment-details">
            <h4 className="text-gray-500 text-sm">Payment method</h4>
            <p className="font-bold">Cash</p>
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
