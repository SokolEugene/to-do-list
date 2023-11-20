import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {ThunkDispatchType} from "../state/tasks-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
        dispatch(setAppStatusAC({status:'failed'}))
    } else
        dispatch(setAppErrorAC({error:'Some error of Task Title'}))
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: any, dispath: ThunkDispatchType) => {
    // dispath(setAppErrorAC(error.message ? {error : error.message} : {error:'Some Error'}))
    dispath(setAppErrorAC({error: error.message ? error.message: 'Some Error'}))
    dispath(setAppStatusAC({status:'failed'}))
}