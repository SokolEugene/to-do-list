import React, {useCallback, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import {ToDoListsList} from "../features/todolists/ToDoListsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Box, CircularProgress} from "@mui/material";
import {logoutTC} from "../state/login-reducer";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, []);
    const logoutHandler = useCallback(()=> {
        // @ts-ignore
        dispatch(logoutTC())
    }, [])
    if (!isInitialized) {
        return <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        }}>
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box></div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <ErrorSnackBar/>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Tasks
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="success"/>}
                </AppBar>

                <Container fixed>
                    <Routes>
                        <Route path={'/login'} element={<Login/>}></Route>
                        <Route path={'/'} element={<ToDoListsList/>}></Route>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App;
