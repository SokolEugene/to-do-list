import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../state/login-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    initialized: false
}

//type InitialStateType = typeof initialState
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}
export type SetAppErrorACType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export type SetAppStatusACType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
type ActionsType =
    | SetAppErrorACType
    | SetAppStatusACType
    | ReturnType<typeof setAppInitializedAC>
//  | ReturnType<typeof setErrorAc>
//  | ReturnType<typeof setStatusAC>


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

//thunks

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else {

                }
                dispatch(setAppInitializedAC(true))
            })
    }
}



