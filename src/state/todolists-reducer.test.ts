import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodoListFilterActionType,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodoListType} from '../App'

test('correct todolist should be removed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: Array<TodoListType> = [
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ]

    //const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', tdlID: todoListID1})
    const endState = todolistsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].tdlID).toBe(todoListID2)
})

test('correct todolist should be added', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ]

    //const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})
test('correct todolist should change its name', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ]

    const action = changeTodolistTitleAC(todoListID2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newFilter: FilterValuesType = 'Completed'

    const startState: Array<TodoListType> = [
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ]

    const action: ChangeTodoListFilterActionType = changeTodolistFilterAC(todoListID2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})
