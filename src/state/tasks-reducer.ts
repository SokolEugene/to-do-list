import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListID1, todoListID2} from "./todolists-reducer";

export type ActionsTypes =
    AddTaskActionType |
    RemoveTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    tdlID: string

}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tdlID: string
    taskID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    tdlID: string
    taskID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    tdlID: string
    isDone: boolean
}
const initialState: TasksStateType = {
    [todoListID1]: [
        {taskID: v1(), title: 'HTML', isDone: true},
        {taskID: v1(), title: 'CSS', isDone: true},
        {taskID: v1(), title: 'JS', isDone: false},
        {taskID: v1(), title: 'React', isDone: false},],
    [todoListID2]: [
        {taskID: v1(), title: 'Bread', isDone: true},
        {taskID: v1(), title: 'Milk', isDone: true},
        {taskID: v1(), title: 'Eggs', isDone: false},
        {taskID: v1(), title: 'Meat', isDone: false},],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.tdlID]: state[action.tdlID].filter(el => el.taskID !== action.taskID)}
        }
        case "ADD-TASK": {
            let newTask = {taskID: v1(), title: action.title, isDone: false}
            return {...state, [action.tdlID]: [newTask, ...state[action.tdlID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.tdlID]: state[action.tdlID].map(el => el.taskID === action.taskID ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.tdlID]: state[action.tdlID].map(el => el.taskID === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case "ADD-TODOLIST" : {
            return {...state, [action.tdlID]: []}
        }
        case "REMOVE-TODOLIST" : {
            const stateCope = {...state}
            delete stateCope[action.tdlID]
            return stateCope
        }
        default:
            return state;
    }
}

export const removeTaskAC = (newTaskID: string, newTDLID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: newTaskID, tdlID: newTDLID}
}

export const addTaskAC = (todoListID: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', tdlID: todoListID, title: title}
}

export const changeTaskStatusAC = (id: string, done: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: id, isDone: done, tdlID: todoListID}
}

export const changeTaskTitleAC = (todoListID: string, taskid: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', tdlID: todoListID, taskID: taskid, title: newTitle}
}
