import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle signup logic here (e.g., send data to the backend)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', { required: true })}
        label="Email"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('password', { required: true })}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
