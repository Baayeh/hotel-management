import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  ClientDetails,
  RoomDetails,
  Reservation,
  Payment,
  Confirmation,
} from '..';

const steps = [
  'Client Details',
  'Rooms',
  'Reservation',
  'Payment',
  'Confirmation',
];

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {activeStep === 0 && (
            <ClientDetails
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
          {activeStep === 1 && (
            <RoomDetails
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
          {activeStep === 2 && (
            <Reservation
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
          {activeStep === 3 && (
            <Payment
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
          {activeStep === 4 && (
            <Confirmation
              handleNext={handleNext}
              handleBack={handleBack}
              activeStep={activeStep}
              steps={steps}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FormStepper;
