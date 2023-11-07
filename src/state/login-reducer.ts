import {Dispatch} from "redux";
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {authAPI, LoginDataType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: LoginStateType = {
    isLoggetIn: false,
    //userIsLoggedIb: false
}
type InitialStateType = {
    isLoggetIn: boolean
    //userIsLoggedIb: boolean
}

type LoginStateType = {
    isLoggetIn: boolean
    // userIsLoggedIb: boolean
}
type ActionsTypes = ReturnType<typeof setIsLoggedInAC>
// | ReturnType<typeof setIsLoginInAC>


//type ThunkDispatchType = Dispatch<ActionsTypes | SetAppStatusACType | SetAppErrorACType>

export const loginReducer = (state: InitialStateType = initialState, action: ActionsTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggetIn: action.isLoggetIn}
        default:
            return state
    }
}

//actions
/*export const setIsLoginInAC = (isLoginIn: boolean) =>
    ({type: 'login/SET-IS-LOGIN-IN', isLoginIn} as const)*/
export const setIsLoggedInAC = (isLoggetIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggetIn} as const)


// ThankCreators
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsTypes | SetAppErrorACType | SetAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsTypes | SetAppErrorACType | SetAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}