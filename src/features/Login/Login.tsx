import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/login-reducer";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggetIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {email: "Required"}
            }
            if (!values.password) {
                return {password: "Required"}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}
                               rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   name={'email'}
                                   onChange={formik.handleChange}
                                   value={formik.values.email}
                            // shortest way:
                            //{...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                            //name={'password'}
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              checked={formik.values.rememberMe}
                                              {...formik.getFieldProps('rememberMe')}
                                          />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}