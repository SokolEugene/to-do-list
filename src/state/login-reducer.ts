import {Dispatch} from "redux";
import {setAppStatusAC} from "../app/app-reducer";
import {authAPI, LoginDataType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginStateType = {
    isLoggedIn: false
}

type LoginStateType = {
    isLoggedIn: boolean
}

//type ThunkDispatchType = Dispatch<ActionsTypes | SetAppStatusACType | SetAppErrorACType>

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn:boolean}>) {
           state.isLoggedIn = action.payload.isLoggedIn}
        }
})


export const loginReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// ThankCreators
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}