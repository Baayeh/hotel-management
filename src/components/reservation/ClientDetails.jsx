import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

const validationSchema = Yup.object({
  fname: Yup.string().required('Required'),
  lname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email Format').required('Required'),
  pnumber: Yup.string().required('Required'),
});

const ClientDetails = ({ activeStep, steps, handleNext, handleBack }) => {
  const [isError] = useState(false);

  return (
    <section className="client-details px-2 mt-10">
      <h3 className="font-bold text-center uppercase text-xl">
        Enter client details
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { isValid } = props;
          return (
            <Form className="my-4">
              <div className="client-name flex gap-4 w-[45rem] mx-auto justify-center">
                <Field name="fname">
                  {(props) => {
                    const { field, meta } = props;
                    return (
                      <TextField
                        id="fname"
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
                <Field name="lname">
                  {(props) => {
                    const { field, meta } = props;
                    return (
                      <TextField
                        id="lname"
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
                <Field name="pnumber">
                  {(props) => {
                    const { field, meta } = props;
                    return (
                      <TextField
                        id="pnumber"
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
                <Button type="submit" disabled={!isValid}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default ClientDetails;
