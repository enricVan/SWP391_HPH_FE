import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';

export default function Test() {
  const reqDate = new Date();
  const { control, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    console.log(watch('reqDate').toISOString());
  }, [watch('reqDate')]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='reqDate'
        defaultValue={reqDate}
        control={control}
        render={({ field: { onChange, ...restField } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Request Date'
              onChange={(event) => {
                onChange(event);
              }}
              renderInput={(params) => <TextField {...params} />}
              {...restField}
            />
          </LocalizationProvider>
        )}
      />
    </form>
  );
}
