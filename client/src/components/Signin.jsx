import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signin = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle signin logic here (e.g., send data to the backend)
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
        Sign In
      </Button>
    </form>
  );
};

export default Signin;
