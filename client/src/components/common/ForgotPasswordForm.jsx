import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';

const ForgotPasswordForm = ({ switchToSignIn }) => {
    const [isLoading, setIsLoading] = useState(false);

    const forgotPasswordForm = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { response, err } = await userApi.forgotPassword(values);
                if (response) {
                    toast.success('Password reset link sent to your email');
                    switchToSignIn();
                }
                if (err) {
                    toast.error(err.message || 'An error occurred');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <Box component="form" onSubmit={forgotPasswordForm.handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Forgot Password
            </Typography>
            <TextField
                type="email"
                name="email"
                placeholder="Enter your email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={forgotPasswordForm.values.email}
                onChange={forgotPasswordForm.handleChange}
                error={forgotPasswordForm.touched.email && Boolean(forgotPasswordForm.errors.email)}
                helperText={forgotPasswordForm.touched.email && forgotPasswordForm.errors.email}
                disabled={isLoading}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Send Reset Link'}
            </Button>
            <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={switchToSignIn}
                disabled={isLoading}
            >
                Back to Sign In
            </Button>
        </Box>
    );
};

export default ForgotPasswordForm;