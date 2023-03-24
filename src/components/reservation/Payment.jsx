import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { clearStatus, makePayment } from '../../redux/payment/paymentSlice.';

const MySwal = withReactContent(Swal);

const Payment = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  values,
  setFieldValue,
}) => {
  const [isError] = useState(false);
  const { booking } = useSelector((state) => state.bookings);
  const { room } = useSelector((state) => state.rooms);
  const { status, message, errMsg, errors } = useSelector(
    (state) => state.payments
  );
  const dispatch = useDispatch();

  const basePaymentObj = (
    booking_id,
    payment_method,
    total_amount,
    payment_date
  ) => {
    return {
      booking_id,
      payment_method,
      total_amount,
      payment_date,
    };
  };

  const getNumOfDaysBtwnDates = () => {
    const first_date = booking.check_in_date;
    const second_date = booking.check_out_date;

    // To calculate the no. of days between two dates
    let diff = Math.floor(
      (Date.parse(second_date) - Date.parse(first_date)) / 86400000
    );

    return diff;
  };

  const calcTotalAmount = () => {
    const room_price = room.room_price;
    const total_amount = room_price * getNumOfDaysBtwnDates();
    return total_amount.toFixed(2);
  };

  const handlePaymentForm = () => {
    let payment = {};

    if (values.payment_method === 'cash') {
      payment = {
        ...basePaymentObj(
          booking.id || null,
          'cash',
          calcTotalAmount(),
          values.payment_date
        ),
      };
    }

    if (values.payment_method === 'cheque') {
      payment = {
        ...basePaymentObj(
          booking.id || null,
          'cheque',
          calcTotalAmount(),
          values.payment_date
        ),
        cheque_number: values.cheque_number,
      };
    }

    if (values.payment_method === 'momo') {
      payment = {
        ...basePaymentObj(
          booking.id || null,
          'momo',
          calcTotalAmount(),
          values.payment_date
        ),
        momo_number: values.momo_number,
        transaction_id: values.transaction_id,
      };
    }

    if (values.payment_method === 'pos') {
      payment = {
        ...basePaymentObj(
          booking.id || null,
          'pos',
          calcTotalAmount(),
          values.payment_date
        ),
        transaction_id: values.transaction_id,
      };
    }
    dispatch(makePayment(payment));
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

  return (
    <div className="mt-6">
      <section className="payment-form">
        <h3 className="text-xl">Select Payment Method</h3>

        <div className="form">
          <Field name="payment_method">
            {({ field }) => {
              return (
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...field}
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="cheque"
                      control={<Radio />}
                      label="Cheque"
                    />
                    <FormControlLabel
                      value="momo"
                      control={<Radio />}
                      label="Momo"
                    />
                    <FormControlLabel
                      value="pos"
                      control={<Radio />}
                      label="POS"
                    />
                  </RadioGroup>
                </FormControl>
              );
            }}
          </Field>
          <section className="mt-5 flex gap-3 flex-wrap">
            {/* Total Amount */}
            <div>
              <div className="border border-gray-400 w-[14rem] relative px-3 py-[0.45rem] rounded before:content-['Total_Amount_*'] before:absolute before:-top-[10px] before:text-gray-500 before:left-3 before:bg-greyBaseColor before:text-xs">
                <span>GHC</span> {calcTotalAmount()}
              </div>
            </div>

            {values.payment_method === 'cheque' && (
              <Field name="cheque_number">
                {({ field, meta }) => {
                  return (
                    <TextField
                      required
                      id="cheque_no"
                      label="Cheque Number"
                      variant="outlined"
                      size="small"
                      {...field}
                      error={meta.touched && meta.error ? !isError : isError}
                      helperText={meta.touched && meta.error}
                    />
                  );
                }}
              </Field>
            )}

            {values.payment_method === 'momo' && (
              <>
                <Field name="momo_number">
                  {({ field, meta }) => {
                    return (
                      <TextField
                        required
                        id="momo_no"
                        label="Momo Number"
                        variant="outlined"
                        size="small"
                        {...field}
                        error={meta.touched && meta.error ? !isError : isError}
                        helperText={meta.touched && meta.error}
                      />
                    );
                  }}
                </Field>
              </>
            )}

            {(values.payment_method === 'pos' ||
              values.payment_method === 'momo') && (
              <Field name="transaction_id">
                {({ field, meta }) => {
                  return (
                    <TextField
                      required
                      id="transc_id"
                      label="Transaction ID"
                      variant="outlined"
                      size="small"
                      {...field}
                      error={meta.touched && meta.error ? !isError : isError}
                      helperText={meta.touched && meta.error}
                    />
                  );
                }}
              </Field>
            )}

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Payment Date"
                  inputFormat="DD/MM/YYYY"
                  value={values.payment_date}
                  onChange={(value) => setFieldValue('payment_date', value)}
                  renderInput={(params) => (
                    <Field name="payment_date">
                      {({ field, meta }) => (
                        <TextField
                          required
                          size="small"
                          {...params}
                          {...field}
                          error={
                            meta.touched && meta.error ? !isError : isError
                          }
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  )}
                />
              </LocalizationProvider>
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
            <Button type="button" onClick={handlePaymentForm}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Save & Continue'}
            </Button>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default Payment;
