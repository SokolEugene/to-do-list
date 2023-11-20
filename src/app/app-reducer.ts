import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../state/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null,
    initialized: false
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppInitializedAC: (state, action: PayloadAction<{ initialized: boolean }>) => {
            state.initialized = action.payload.initialized
        }
    }
})
//

export const appReducer = slice.reducer

//actions
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions
// export const setAppErrorAC = slice.actions.setAppErrorAC
// export const setAppStatusAC = slice.actions.setAppStatusAC
// export const setAppInitializedAC = slice.actions.setAppInitializedAC


//thunks

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({isLoggedIn: true}))
                } else {

                }
                dispatch(setAppInitializedAC({initialized: true}))
            })
    }
}

//old reducer

//export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, initialized: action.initialized}
//         default:
//             return state
//     }
// }

//old ActionCreators

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
// export const setAppInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)



