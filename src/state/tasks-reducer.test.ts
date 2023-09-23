import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType,} from '../AppWithRedux'

import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
   /* let todoListID1 = v1()
    let todoListID2 = v1()*/

    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = removeTaskAC('v2()', 'todoListID2')

    const endState = tasksReducer(startState, action)
    expect(endState['todoListID1'].length).toBe(4)
    expect(endState['todoListID2'].length).toBe(3)
    expect(endState['todoListID2'].every(t=>t.taskID !== 'v2')).toBeTruthy()

    expect(endState).toEqual({
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = addTaskAC('todoListID2', 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'].length).toBe(4)
    expect(endState['todoListID2'].length).toBe(5)
    expect(endState['todoListID2'][0].taskID).toBeDefined()
    expect(endState['todoListID2'][0].title).toBe('juce')
    expect(endState['todoListID2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = changeTaskStatusAC('v2()', false, 'todoListID2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID2'][1].isDone).toBe(false)
    expect(endState['todoListID1'][1].isDone).toBe(true)

})
test('title of task should be changed', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = changeTaskTitleAC('todoListID1', 'v3()', 'TypeScript')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'][2].title).toBe('TypeScript')
    expect(endState['todoListID2'][2].title).toBe('Eggs')

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListID1' && k !== 'todoListID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {taskID: 'v1()', title: 'HTML', isDone: true},
            {taskID: 'v2()', title: 'CSS', isDone: true},
            {taskID: 'v3()', title: 'JS', isDone: false},
            {taskID: 'v4()', title: 'React', isDone: false},],
        'todoListID2': [
            {taskID: 'v1()', title: 'Bread', isDone: true},
            {taskID: 'v2()', title: 'Milk', isDone: true},
            {taskID: 'v3()', title: 'Eggs', isDone: false},
            {taskID: 'v4()', title: 'Meat', isDone: false},],
    }

    const action = removeTodolistAC('todoListID2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})

