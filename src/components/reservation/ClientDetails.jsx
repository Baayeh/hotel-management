import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const initialValues = {
  fname: '',
  lname: '',
  email: '',
  pnumber: '',
};

const onSubmit = (values) => {
  console.log(values);
  // handleNext();
};

const validate = (values) => {
  let errors = {};

  if (!values.fname) {
    errors.fname = 'Required';
  }

  if (!values.lname) {
    errors.lname = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.pnumber) {
    errors.pnumber = 'Required';
  }

  return errors;
};

const ClientDetails = ({ activeStep, steps, handleNext, handleBack }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const [isError, setIsError] = useState(false);

  const checkErrors = () => {
    if (formik.errors.fname) {
      setIsError(true);
    } else if (formik.errors.lname) {
      setIsError(true);
    } else if (formik.errors.email) {
      setIsError(true);
    } else if (formik.errors.pnumber) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  useEffect(() => {
    checkErrors();
  }, [formik.errors]);

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
            error={formik.touched.fname && formik.errors.fname && isError}
            helperText={formik.touched.fname && formik.errors.fname}
            // required
            value={formik.values.fname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            variant="outlined"
            size="small"
            helperText={formik.touched.lname && formik.errors.lname}
            error={formik.touched.lname && formik.errors.lname && isError}
            // required
            value={formik.values.lname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            error={formik.touched.email && formik.errors.email && isError}
            helperText={formik.touched.email && formik.errors.email}
            // required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="pnumber"
            label="Phone Number"
            name="pnumber"
            variant="outlined"
            size="small"
            helperText={formik.touched.pnumber && formik.errors.pnumber}
            error={formik.touched.pnumber && formik.errors.pnumber && isError}
            // required
            value={formik.values.pnumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
