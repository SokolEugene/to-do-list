import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsTypes = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    tdlID: string
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



export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.tdlID !== action.tdlID)
        }
        case 'ADD-TODOLIST': {

            return [{tdlID: action.tdlID, title: action.title, filter: 'All'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.tdlID === action.tdlID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state,]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.tdlID === action.tdlID);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state,]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (newTodoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', tdlID: newTodoListID}
}
export const addTodolistAC = (newTodolistTitle: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, tdlID: v1()}
}
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, tdlID: id}
}
export const changeTodolistFilterAC = (id: string, newTodolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: newTodolistFilter, tdlID: id}
}