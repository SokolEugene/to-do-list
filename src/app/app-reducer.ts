export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

//type InitialStateType = typeof initialState
type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type SetErrorACType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export type SetStatusACType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
type ActionsType =
    | SetErrorACType
    | SetStatusACType
//  | ReturnType<typeof setErrorAc>
//  | ReturnType<typeof setStatusAC>


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


