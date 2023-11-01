import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsType} from "./todolists-reducer";
import {TasksStateType} from "../features/todolists/ToDoListsList";
import {SetApErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type ActionsTypes =
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type ThunkDispatchType = Dispatch<ActionsTypes | SetAppStatusACType | SetApErrorACType>
const initialState: TasksStateType = {
    /*[todoListID1]: [
        {taskID: v1(), title: 'HTML', isDone: true},
        {taskID: v1(), title: 'CSS', isDone: true},
        {taskID: v1(), title: 'JS', isDone: false},
        {taskID: v1(), title: 'React', isDone: false},],
    [todoListID2]: [
        {taskID: v1(), title: 'Bread', isDone: true},
        {taskID: v1(), title: 'Milk', isDone: true},
        {taskID: v1(), title: 'Eggs', isDone: false},
        {taskID: v1(), title: 'Meat', isDone: false},],*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
            // const stateCopy = {...state}
            // return action.todolists.reduce((acc, el)=> {
            //     stateCopy[el.id] = []
            //     return stateCopy;
            // }, {...state})
        }
        case 'SET-TASKS':
            return {...state, [action.tdlID]: action.tasks};
        case "REMOVE-TASK":
            return {...state, [action.tdlID]: state[action.tdlID].filter(el => el.id !== action.taskID)}
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
            // const stateCopy = {...state}
            // const newTask: TaskType = action.task
            // const tasks = stateCopy[newTask.todoListId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[newTask.todoListId] = newTasks;
            // return stateCopy;
        }
        case "UPDATE-TASK":
            return {
                ...state, [action.tdlID]: state[action.tdlID].map(el =>
                    el.id === action.taskID ? {...el, ...action.model} : el)
            }
        // let todolistTasks = state[action.tdlID];
        // let newTasksArray = todolistTasks
        //     .map(t => t.id === action.taskID ? {...t, ...action.model} : t);
        //
        // state[action.tdlID] = newTasksArray;
        // return ({...state});
        case "ADD-TODOLIST" :
            return {...state, [action.todolist.id]: []}

        case "REMOVE-TODOLIST" :
            const stateCope = {...state}
            delete stateCope[action.id]
            return stateCope

        default:
            return state;
    }
}
//============ActionCreator
export const removeTaskAC = (taskID: string, tdlID: string) =>
    ({type: 'REMOVE-TASK', taskID, tdlID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, tdlID: string) =>
    ({type: 'UPDATE-TASK', taskID: id, model, tdlID} as const)
export const setTasksAC = (tasks: TaskType[], tdlID: string) =>
    ({type: "SET-TASKS", tasks, tdlID} as const)


//============ThunkCreator
export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch<ActionsTypes | SetAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistID))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                //     dispatch(setAppStatusAC('failed'))
                // } else
                //     dispatch(setAppErrorAC('Some error of Task Title'))
                // dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType,) =>
    (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task || undefined) {
            return
            console.warn('Error in changeTaskTitle')
        }
        const apimodel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, apimodel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, apimodel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
              handleServerNetworkError(error, dispatch)
            })
    }
