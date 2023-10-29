import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type ActionsTypes = AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistActionType
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    tdlID: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    tdlID: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    tdlID: string
}
export type SetTodolistActionType = {
    type: 'SET-TODOLIST'
    todolists: TodolistType[]
}
export let todoListID1 = v1()
export let todoListID2 = v1()
export type FilterValuesType = 'All' | 'Completed' | 'Active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [
    // {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
    // {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.todolists.map(el => ({...el, filter: 'All'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.tdlID)
        }
        case 'ADD-TODOLIST': {

            return [{...action.todolist, filter: 'All'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.tdlID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state,]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.tdlID);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state,]
        }

        default:
            return state;
    }
}

//==========ACTION CREATORE========
export const removeTodolistAC = (newTodoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', tdlID: newTodoListID}
}
export const addTodolistAC = (todolist: TodolistType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, tdlID: id}
}
export const changeTodolistFilterAC = (id: string, newTodolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: newTodolistFilter, tdlID: id}
}
export const setTodolistAC = (todolists: TodolistType[]): SetTodolistActionType => {
    return {type: 'SET-TODOLIST', todolists: todolists}
}
//==========THUNK CREATORE========
export const getTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
}
export const addTodolistTC = (title: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}