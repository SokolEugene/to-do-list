import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
// import {TodoListType, TasksStateType} from "../AppWithRedux";

/*type AppRootState = {
    todolist: TodoListType[]
    tasks: TasksStateType
}*/



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

