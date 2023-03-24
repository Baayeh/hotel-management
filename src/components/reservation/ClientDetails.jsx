import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  addGuest,
  addSingleGuest,
  clearStatus,
  getGuests,
} from '../../redux/guests/guestSlice';

const MySwal = withReactContent(Swal);

const ClientDetails = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  values,
}) => {
  const { guests, message, errors, errMsg, status } = useSelector(
    (state) => state.guests
  );
  const [isError] = useState(false);
  const [isNewClient, setIsNewClient] = useState('yes');
  const [client, setGuest] = useState('');
  const dispatch = useDispatch();

  const handleGuestSelect = (event) => {
    setGuest(event.target.value);
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

  const saveGuestDetails = () => {
    if (isNewClient === 'yes') {
      const guest = {
        f_name: values.f_name,
        l_name: values.l_name,
        email: values.email,
        phone_number: values.phone_number,
      };
      dispatch(addGuest(guest));
    }

    if (isNewClient === 'no') {
      const guest = {
        id: client.id,
        f_name: client.f_name,
        l_name: client.l_name,
        email: client.email,
        phone_number: client.phone_number,
      }
      dispatch(addSingleGuest(guest))
      handleNext();
    }
  };

  useEffect(() => {
    dispatch(getGuests());
  }, []);

  useEffect(() => {
    if (status === 'fulfilled') {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
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
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        dispatch(clearStatus());
      });
    }
  }, [status]);

  return (
    <section className="client-details px-2 mt-10">
      <h3 className="font-bold text-center uppercase text-xl mb-4">
        Enter client details
      </h3>
      {guests && guests.length !== 0 && (
        <div className="text-center mb-6">
          <FormControl>
            <FormLabel id="newClient">Is it a new guest?</FormLabel>
            <RadioGroup
              row
              aria-labelledby="newClient"
              value={isNewClient}
              onChange={(e) => setIsNewClient(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      )}

      {/* If guest is not in the system */}
      {isNewClient === 'yes' && (
        <section>
          <div className="client-name flex gap-4 w-[45rem] mx-auto justify-center">
            <Field name="f_name">
              {(props) => {
                const { field, meta } = props;
                return (
                  <TextField
                    id="f_name"
                    fullWidth
                    label="First Name"
                    {...field}
                    variant="outlined"
                    size="small"
                    error={meta.touched && meta.error ? !isError : isError}
                    helperText={meta.touched && meta.error}
                    required
                  />
                );
              }}
            </Field>
            <Field name="l_name">
              {(props) => {
                const { field, meta } = props;
                return (
                  <TextField
                    id="l_name"
                    fullWidth
                    label="Last Name"
                    {...field}
                    variant="outlined"
                    size="small"
                    error={meta.touched && meta.error ? !isError : isError}
                    helperText={meta.touched && meta.error}
                    required
                  />
                );
              }}
            </Field>
          </div>

          <div className="client-contact my-4 flex gap-4 w-[45rem] mx-auto justify-center">
            <Field name="email">
              {(props) => {
                const { field, meta } = props;
                return (
                  <TextField
                    id="email"
                    fullWidth
                    label="Email"
                    {...field}
                    variant="outlined"
                    size="small"
                    error={meta.touched && meta.error ? !isError : isError}
                    helperText={meta.touched && meta.error}
                    required
                  />
                );
              }}
            </Field>
            <Field name="phone_number">
              {(props) => {
                const { field, meta } = props;
                return (
                  <TextField
                    id="phone_number"
                    fullWidth
                    label="Phone Number"
                    {...field}
                    variant="outlined"
                    size="small"
                    error={meta.touched && meta.error ? !isError : isError}
                    helperText={meta.touched && meta.error}
                    required
                  />
                );
              }}
            </Field>
          </div>
        </section>
      )}

      {/* If guest is already in the system */}
      {isNewClient === 'no' && (
        <section>
          <FormControl className="w-full">
            <InputLabel id="guest" required>
              Guest
            </InputLabel>
            <Select
              labelId="room"
              id="room"
              label="Guest"
              required
              value={client}
              onChange={handleGuestSelect}
            >
              {guests &&
                guests.map((guest) => {
                  return (
                    <MenuItem key={guest.id} value={guest}>
                      {guest.f_name} {guest.l_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </section>
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
        <Button type="button" onClick={saveGuestDetails}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Save & Continue'}
        </Button>
      </Box>
    </section>
  );
};

export default ClientDetails;
