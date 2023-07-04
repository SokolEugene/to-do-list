import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

export type PropsTasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsToDoListType = {
    title: string
    tasks1: Array<PropsTasksType> //PropsTasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    adTask: (title: string) => void

}

export function ToDoList(props: PropsToDoListType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.adTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.adTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {/* {
                    props.task.map((el) => {
                        return <li><input type="checkbox"
                                          checked={el.isDone}/><span>{el.title}</span></li>
                    })
                }*/}
                {props.tasks1.map(el => {
                    const OnRemoveHandler = () => {
                        props.removeTask(el.id)
                    }
                    return (<li>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={OnRemoveHandler}>X</button>
                    </li>)
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}