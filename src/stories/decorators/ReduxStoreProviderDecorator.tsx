import React from 'react'
import {Provider} from 'react-redux';
import {AppRootState, store} from "../../state/store";
import {tasksReducer} from "../../state/tasks-reducer";
import {todoListID1, todoListID2, todolistsReducer} from "../../state/todolists-reducer";
import {combineReducers, createStore} from "redux";

import {v1} from "uuid";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})
const initialGlobalState = {
    todolist: [
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ],
    tasks: {
        [todoListID1]: [
            {taskID: v1(), title: 'HTML', isDone: true},
            {taskID: v1(), title: 'CSS', isDone: true},
            {taskID: v1(), title: 'JS', isDone: false},
            {taskID: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {taskID: v1(), title: 'Bread', isDone: true},
            {taskID: v1(), title: 'Milk', isDone: true},
            {taskID: v1(), title: 'Eggs', isDone: false},
            {taskID: v1(), title: 'Meat', isDone: false},
        ],
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}