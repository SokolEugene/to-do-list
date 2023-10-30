import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetErrorACType, setStatusAC, SetStatusACType} from "../app/app-reducer";

export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type SetTodoListsType = ReturnType<typeof setTodolistAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>

type ActionsTypes =
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>


export type FilterValuesType = 'All' | 'Completed' | 'Active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatchType = Dispatch<ActionsTypes | SetStatusACType | SetErrorACType>
const initialState: Array<TodolistDomainType> = [
    // {id: todoListID1, title: 'What to learn', filter: 'All'},
    // {id: todoListID2, title: 'What to buy', filter: 'All'}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.todolists.map(el => ({...el, filter: 'All', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
            // const todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     todolist.title = action.title;
            // }
            // return [...state,]
        case 'CHANGE-TODOLIST-FILTER':
            //return state.map(el => el.id === action.id ? {...el, title: action.filter} : el)
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        default:
            return state;
    }
}

//============ActionCreator
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const)
//============ThunkCreator
export const getTodolistTC = () => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
                setStatusAC('succeeded')
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC(todolistID))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

