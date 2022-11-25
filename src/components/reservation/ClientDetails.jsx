import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ClientDetails = ({ activeStep, steps, handleNext, handleBack }) => {
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      pnumber: '',
    },
    onSubmit: (values) => {
      console.log(values);
      // handleNext();
    },
  });

  // console.log('Form Values', formik.values);

  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const helperText = () => {
    if (fname === '') {
      setIsError(true);
      setErrMsg('First Name is required');
    } else {
      setIsError(false);
      setErrMsg('');
    }
  };

  return (
    <section className="client-details px-2 mt-10">
      <h3 className="font-bold text-center uppercase text-xl">
        Enter client details
      </h3>
      <form className="my-4" onSubmit={formik.handleSubmit}>
        <div className="client-name flex gap-4 w-[45rem] mx-auto justify-center">
          <TextField
            id="fname"
            fullWidth
            label="First Name"
            name="fname"
            variant="outlined"
            size="small"
            error={isError}
            helperText={errMsg}
            required
            value={formik.values.fname}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            variant="outlined"
            size="small"
            required
            value={formik.values.lname}
            onChange={formik.handleChange}
          />
        </div>

        <div className="client-contact my-4 flex gap-4 w-[45rem] mx-auto justify-center">
          <TextField
            id="email"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            size="small"
            error={isError}
            helperText={errMsg}
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            id="pnumber"
            label="Phone Number"
            name="pnumber"
            variant="outlined"
            size="small"
            required
            value={formik.values.pnumber}
            onChange={formik.handleChange}
          />
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
            <Button type="submit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
      </form>
    </section>
  );
};

export default ClientDetails;
