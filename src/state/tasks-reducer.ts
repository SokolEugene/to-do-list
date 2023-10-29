import {TasksStateType} from "../AppWithRedux";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type ActionsTypes =
    AddTaskActionType |
    RemoveTaskActionType |
    UpdateTaskActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    SetTasksActionType |
    SetTodolistActionType
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType

}
export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todoListID: string
}
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tdlID: string
    taskID: string
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskID: string
    tdlID: string
    model: UpdateDomainTaskModelType
}
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
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todoListID]: action.tasks
            };
        }
        case "REMOVE-TASK": {
            return {...state, [action.tdlID]: state[action.tdlID].filter(el => el.id !== action.taskID)}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
            // const newTasks = {...state[action.task.]}.filter(t => t.taskID !== action.tdlID);
            // return {...state[action.task.] = newTasks}
            //     let newTask = {taskID: v1(), title: action.title, isDone: false}
            //     return {...state, [action.tdlID]: [newTask, ...state[action.tdlID]]}
        }
        case "UPDATE-TASK": {
            let todolistTasks = state[action.tdlID];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskID ? {...t, ...action.model} : t);

            state[action.tdlID] = newTasksArray;
            return ({...state});
        }
        case "ADD-TODOLIST" : {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST" : {
            const stateCope = {...state}
            delete stateCope[action.tdlID]
            return stateCope
        }
        case "SET-TODOLIST":
            const stateCopy = {...state}
             action.todolists.forEach((tl) => {
               stateCopy[tl.id] = []
            })
        return stateCopy

        default:
            return state;
    }
}

export const removeTaskAC = (newTaskID: string, newTDLID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: newTaskID, tdlID: newTDLID}
}

// export const addTaskAC = (task: TaskType): AddTaskActionType => {
//     return {type: 'ADD-TASK', task}
// }
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todoListID: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskID: id, model, tdlID: todoListID}
}
export const setTasksAC = (tasks: TaskType[], todoListID: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todoListID}
}

export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistID)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(taskId, todolistId)
            .then((res) => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                // @ts-ignore
                // console.log(res.data.data.item)
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
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
        todolistsAPI.updateTask(todolistId, taskId, apimodel)
            .then(res => {
                dispatch(updateTaskAC(taskId, apimodel, todolistId))
            })
    }
}