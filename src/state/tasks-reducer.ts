import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";
import {addTodolistAC, removeTodolistAC, setTodolistAC,} from "./todolists-reducer";
import {TasksStateType} from "../features/todolists/ToDoListsList";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../app/app-reducer";

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type ThunkDispatchType = Dispatch
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

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{tdlID: string, taskID: string }>) {
            // debugger
            const tasks = state[action.payload.tdlID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModelType, tdlID: string }>) {
            const tasks = state[action.payload.tdlID]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], tdlID: string }>) {
            state[action.payload.tdlID] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];

        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistAC, (state, action) => {
            action.payload.todolists.forEach(el => {
                state[el.id] = []
            })
        })
    }

})
export  const tasksReducer = slice.reducer
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC
} = slice.actions


//============ThunkCreator
export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC({tasks: tasks,tdlID: todolistID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: ThunkDispatchType) => {
    // debugger
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC({tdlID: todolistId, taskID: taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
        // @ts-ignore
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
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTask(todolistId, taskId, apimodel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({id: taskId, model: apimodel, tdlID: todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }


// export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
//     switch (action.type) {
//         case "SET-TODOLIST": {
//             const stateCopy = {...state}
//             action.todolists.forEach((tl) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy
//             // const stateCopy = {...state}
//             // return action.todolists.reduce((acc, el)=> {
//             //     stateCopy[el.id] = []
//             //     return stateCopy;
//             // }, {...state})
//         }
//         case 'SET-TASKS':
//             return {...state, [action.tdlID]: action.tasks};
//         case "REMOVE-TASK":
//             return {...state, [action.tdlID]: state[action.tdlID].filter(el => el.id !== action.taskID)}
//         case "ADD-TASK": {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//             // const stateCopy = {...state}
//             // const newTask: TaskType = action.task
//             // const tasks = stateCopy[newTask.todoListId];
//             // const newTasks = [newTask, ...tasks];
//             // stateCopy[newTask.todoListId] = newTasks;
//             // return stateCopy;
//         }
//         case "UPDATE-TASK":
//             return {
//                 ...state, [action.tdlID]: state[action.tdlID].map(el =>
//                     el.id === action.taskID ? {...el, ...action.model} : el)
//             }
//         // let todolistTasks = state[action.tdlID];
//         // let newTasksArray = todolistTasks
//         //     .map(t => t.id === action.taskID ? {...t, ...action.model} : t);
//         //
//         // state[action.tdlID] = newTasksArray;
//         // return ({...state});
//         case "ADD-TODOLIST" :
//             return {...state, [action.todolist.id]: []}
//
//         case "REMOVE-TODOLIST" :
//             const stateCope = {...state}
//             delete stateCope[action.id]
//             return stateCope
//
//         default:
//             return state;
//     }
// }

//============ActionCreator
// export const removeTaskAC = (taskID: string, tdlID: string) =>
//     ({type: 'REMOVE-TASK', taskID, tdlID} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: 'ADD-TASK', task} as const)
// export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, tdlID: string) =>
//     ({type: 'UPDATE-TASK', taskID: id, model, tdlID} as const)
// export const setTasksAC = (tasks: TaskType[], tdlID: string) =>
//     ({type: "SET-TASKS", tasks, tdlID} as const)