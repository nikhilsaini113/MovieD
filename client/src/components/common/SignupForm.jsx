import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
const SignupForm = ({switchAuthState}) => {
    const dispatch=useDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const signupForm=useFormik({
        initialValues:{
            username: '',
            displayName: '',
            password: '',
            confirmPassword:''
        },
        validationSchema:Yup.object({
            username:Yup.string().required('Please enter your username').min(8, 'Username minimum 8 characters'),
            displayName:Yup.string().required('Please enter your display name').min(8, 'Display name minimum 8 characters'),
            password:Yup.string().required('Please enter your password').min(8, 'Password minimum 8 characters'),
            confirmPassword:Yup.string().required('Please reenter your password').min(8, 'Confirm password minimum 8 characters')
        }),
        onSubmit: async (values) => {
            setErrorMessage('');
            setIsLoginRequest(true);
            const {response, err}=await userApi.signup(values);
            setIsLoginRequest(false);
            if(response){
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('SignUp Suceessful!');
            }
            if(err) setErrorMessage(err.message);
        }
    })
    return (
        <>
        <Box component="form" onSubmit={signupForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="Username"
                    name="username"
                    fullWidth
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.username && signupForm.errors.username !== undefined}
                    helperText={signupForm.touched.username && signupForm.errors.username}
                />
                <TextField
                  type="text"
                  placeholder="Display Name"
                  name="displayName"
                  fullWidth
                  value={signupForm.values.displayName}
                  onChange={signupForm.handleChange}
                  color="success"
                  error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
                  helperText={signupForm.touched.displayName && signupForm.errors.displayName}
                ></TextField>
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    fullWidth
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.password && signupForm.errors.password !== undefined}
                    helperText={signupForm.touched.password && signupForm.errors.password}
                />
                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  fullWidth
                  value={signupForm.values.confirmPassword}
                  onChange={signupForm.handleChange}
                  color="success"
                  error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
                  helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
                ></TextField>
            </Stack>
            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isLoginRequest}
            >
                Sign Up
            </LoadingButton>
            <Button
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => switchAuthState()}
            >
                Sign In
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

export default SignupForm