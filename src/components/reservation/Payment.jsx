import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const initialValues = {
  payMethod: 'cash',
  amtReceived: '',
  chequeNum: '',
  momoNum: '',
  transactionID: '',
  payDate: null,
};

const validationSchema = Yup.object({
  payMethod: Yup.string().required('Required'),
  amtReceived: Yup.string()
    .matches(/^[0-9]+$/, 'Amount must be digits')
    .min(3, 'Amount is incorrect')
    .required('Required'),
  chequeNum: Yup.string().when('payMethod', {
    is: (value) => value === 'cheque',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Cheque Number must be digits')
      .min(4, 'Amount is incorrect')
      .required('Required'),
  }),
  momoNum: Yup.string().when('payMethod', {
    is: (value) => value === 'momo',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Number must be digits')
      .length(10, 'Momo number is incorrect')
      .required('Required'),
  }),
  transactionID: Yup.string().when('payMethod', {
    is: (value) => value === 'momo' || value === 'pos',
    then: Yup.string()
      .matches(/^[0-9]+$/, 'Transaction ID must be digits')
      .length(11, 'Transaction ID is incorrect')
      .required('Required'),
  }),
  payDate: Yup.date().nullable().required('Required'),
});

const Payment = ({ activeStep, steps, handleNext, handleBack }) => {
  const [isError] = useState(false);

  const onSubmit = (values) => {
    console.log(values);
    handleNext();
  };

  return (
    <div className="mt-6">
      <section className="payment-form">
        <h3 className="text-xl">Select Payment Method</h3>

        <div className="form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => {
              const { isValid, values } = props;
              return (
                <Form>
                  <Field name="payMethod">
                    {(props) => {
                      const { field } = props;
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
                    <div className="border h-[2.5rem] border-gray-400 flex items-center px-4 rounded">
                      <span>GHC 2500</span>
                    </div>

                    <Field name="amtReceived">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <TextField
                            required
                            id="amount_given"
                            label="Amount Received"
                            variant="outlined"
                            size="small"
                            error={
                              meta.touched && meta.error ? !isError : isError
                            }
                            helperText={meta.touched && meta.error}
                            {...field}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  GHC
                                </InputAdornment>
                              ),
                            }}
                          />
                        );
                      }}
                    </Field>

                    {values.payMethod === 'cheque' && (
                      <Field name="chequeNum">
                        {({ field, meta }) => {
                          return (
                            <TextField
                              required
                              id="cheque_no"
                              label="Cheque Number"
                              variant="outlined"
                              size="small"
                              {...field}
                              error={
                                meta.touched && meta.error ? !isError : isError
                              }
                              helperText={meta.touched && meta.error}
                            />
                          );
                        }}
                      </Field>
                    )}

                    {values.payMethod === 'momo' && (
                      <>
                        <Field name="momoNum">
                          {({ field, meta }) => {
                            return (
                              <TextField
                                required
                                id="momo_no"
                                label="Momo Number"
                                variant="outlined"
                                size="small"
                                {...field}
                                error={
                                  meta.touched && meta.error
                                    ? !isError
                                    : isError
                                }
                                helperText={meta.touched && meta.error}
                              />
                            );
                          }}
                        </Field>

                        <Field name="transactionID">
                          {({ field, meta }) => {
                            return (
                              <TextField
                                required
                                id="transc_id"
                                label="Transaction ID"
                                variant="outlined"
                                size="small"
                                {...field}
                                error={
                                  meta.touched && meta.error
                                    ? !isError
                                    : isError
                                }
                                helperText={meta.touched && meta.error}
                              />
                            );
                          }}
                        </Field>
                      </>
                    )}

                    {values.payMethod === 'pos' && (
                      <Field name="transactionID">
                        {({ field, meta }) => {
                          return (
                            <TextField
                              required
                              id="transc_id"
                              label="Transaction ID"
                              variant="outlined"
                              size="small"
                              {...field}
                              error={
                                meta.touched && meta.error ? !isError : isError
                              }
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
                          value={props.values.payDate}
                          onChange={(value) =>
                            props.setFieldValue('payDate', value)
                          }
                          renderInput={(params) => (
                            <Field name="payDate">
                              {({ field, meta }) => (
                                <TextField
                                  required
                                  size="small"
                                  {...params}
                                  {...field}
                                  error={
                                    meta.touched && meta.error
                                      ? !isError
                                      : isError
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
                    <Button type="submit" disabled={!isValid}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default Payment;
