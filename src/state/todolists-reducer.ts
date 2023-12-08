import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export type FilterValuesType = 'All' | 'Completed' | 'Active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatchType = Dispatch
const initialState: Array<TodolistDomainType> = [
    // {id: todoListID1, title: 'What to learn', filter: 'All'},
    // {id: todoListID2, title: 'What to buy', filter: 'All'}
]
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'All', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(el => ({...el, filter: 'All', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    },

})
export const todolistsReducer = slice.reducer

//actions
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistAC,
    changeTodolistEntityStatusAC
} = slice.actions


//============ThunkCreator
export const getTodolistTC = () => {
    return (dispatch: ThunkDispatchType) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC({todolists: res.data}))
                setAppStatusAC({status: 'succeeded'})
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todolistID, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id, title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}


// type ActionsTypes =
//     | AddTodoListActionType
//     | RemoveTodoListActionType
//     | SetTodoListsType
//     | ChangeTodolistEntityStatusType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'SET-TODOLIST':
//             return action.todolists.map(el => ({...el, filter: 'All', entityStatus: 'idle'}))
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: 'All', entityStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
//         // const todolist = state.find(tl => tl.id === action.id);
//         // if (todolist) {
//         //     todolist.title = action.title;
//         // }
//         // return [...state,]
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
//         default:
//             return state;
//     }
// }

//============ActionCreator
// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
//
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     title,
//     id
// } as const)
//
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//     ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
// export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const)
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
//     ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, id} as const)