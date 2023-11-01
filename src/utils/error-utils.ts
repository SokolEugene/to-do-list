import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {ThunkDispatchType} from "../state/tasks-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    } else
        dispatch(setAppErrorAC('Some error of Task Title'))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispath: ThunkDispatchType) => {
    dispath(setAppErrorAC(error.message ? error.message : 'Some Error'))
    dispath(setAppStatusAC('failed'))
}