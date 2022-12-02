import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const RoomDetails = () => {
  return (
    <section className="my-10">
      <h3>Room Details</h3>
      Some text
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
    </section>
  );
};

export default RoomDetails;
