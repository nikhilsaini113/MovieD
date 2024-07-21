import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Stack, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [onRequest, setOnRequest] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setOnRequest(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/reset-password/${id}/${token}`, {
          password: values.password,
        });
        if (response.data.Status === "Success") {
          toast.success('Password reset successfully. Redirecting to home page...', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          // Redirect to home page after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('Failed to reset password. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setOnRequest(false);
      }
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={form.handleSubmit}
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Reset Password
            </Typography>
            <TextField
              type="password"
              placeholder="New password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              error={form.touched.password && form.errors.password !== undefined}
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              fullWidth
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              error={form.touched.confirmPassword && form.errors.confirmPassword !== undefined}
              helperText={form.touched.confirmPassword && form.errors.confirmPassword}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              loading={onRequest}
            >
              Reset Password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;