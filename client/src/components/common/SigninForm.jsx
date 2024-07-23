import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SiginForm=({switchAuthState,switchToForgotPassword})=>{
    const dispatch=useDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const signinForm=useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema:Yup.object({
            email:Yup.string().required('Please enter your email').email('Please enter a valid email address'),
            password:Yup.string().required('Please enter your password').min(8, 'Password minimum 8 characters')
        }),
        onSubmit: async (values) => {
            setErrorMessage('');
            setIsLoginRequest(true);
            const {response, err}=await userApi.signin(values);
            setIsLoginRequest(false);
            if(response){
                signinForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('Login Successful!');
            }
            if(err) setErrorMessage(err.message);
        }
    })
    const handleGoogleAuth = async () => {
      window.open("http://localhost:5000/auth/google/callback", "_self");
    }
    return (
        <>
        <Box component="form" onSubmit={signinForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="Email address"
                    name="email"
                    fullWidth
                    value={signinForm.values.email}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.email && signinForm.errors.email !== undefined}
                    helperText={signinForm.touched.email && signinForm.errors.email}
                />
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    fullWidth
                    value={signinForm.values.password}
                    onChange={signinForm.handleChange}
                    color="success"
                    error={signinForm.touched.password && signinForm.errors.password !== undefined}
                    helperText={signinForm.touched.password && signinForm.errors.password}
                />
            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isLoginRequest}
            >
                Sign in
            </LoadingButton>
            <Button
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={switchToForgotPassword}
            >
                Forgot Password?
            </Button>
            <Button
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => switchAuthState()}
            >
                Sign Up
            </Button>
            <Button
            fullWidth
            sx={{ marginTop: 1 }}
            variant="outlined"
            onClick={handleGoogleAuth}
            style={{ display: "flex", alignItems: "center" }}
            >
                <img src={'./google-logo.png'} alt="Google Logo" style={{ marginRight: 10, width: 20 }} />
                    Continue with Google
            </Button>
            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
                </Box>
            )}
        </Box>
      </>
    )
}

export default SiginForm