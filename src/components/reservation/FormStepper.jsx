import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  ClientDetails,
  Confirmation,
  Payment,
  Reservation,
} from '..';

const steps = [
  'Client Details',
  'Reservation',
  'Payment',
  'Confirmation',
];

const initialValues = {
  f_name: '',
  l_name: '',
  email: '',
  phone_number: '',
  room: '',
  check_in_date: '',
  check_out_date: '',
  payment_method: 'cash',
  payment_date: '',
  cheque_number: '',
  momo_number: '',
  transaction_id: '',
};

const validationSchema = Yup.object({
  f_name: Yup.string().required('Required'),
  l_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email Format').required('Required'),
  phone_number: Yup.string().required('Required'),
  cheque_number: Yup.string().when('payment_method', {
    is: (value) => value === 'cheque',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Cheque Number must be digits')
      .min(4, 'Amount is incorrect')
      .required('Required'),
  }),
  momo_number: Yup.string().when('payment_method', {
    is: (value) => value === 'momo',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Number must be digits')
      .length(10, 'Momo number must be 10 digits')
      .required('Required'),
  }),
  transaction_id: Yup.string().when('payment_method', {
    is: (value) => value === 'momo' || value === 'pos',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Transaction ID must be digits')
      .length(11, 'Transaction ID must be 11 digits')
      .required('Required'),
  }),
});

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const renderSwitch = (values, setFieldValue) => {
    switch (activeStep) {
      case 0:
        return (
          <ClientDetails
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
            values={values}
          />
        );
      case 1:
        return (
          <Reservation
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      case 2:
        return (
          <Payment
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
            values={values}
            setFieldValue={setFieldValue}
          />
        );
      case 3:
        return (
          <Confirmation
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          />
        );
    }
  };

  return (
    <Box sx={{ width: '70%', margin: '0 auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="my-4">
                {renderSwitch(values, setFieldValue)}
              </Form>
            );
          }}
        </Formik>
      </>
    </Box>
  );
};

export default FormStepper;
