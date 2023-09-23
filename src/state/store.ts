import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
// import {TodoListType, TasksStateType} from "../AppWithRedux";

/*type AppRootState = {
    todolist: TodoListType[]
    tasks: TasksStateType
}*/

export type AppRootState = ReturnType<typeof rootReducer> //способ автоматической типизации

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer);



// @ts-ignore
window.store = store

