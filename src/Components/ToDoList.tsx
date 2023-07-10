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
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function ToDoList(props: PropsToDoListType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            props.adTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.adTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }

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
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {/* {
                    props.task.map((el) => {
                        return <li><input type="checkbox"
                                          checked={el.isDone}/><span>{el.title}</span></li>
                    })
                }*/}
                {props.tasks1.map(el => {
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, event.currentTarget.checked)
                    }
                    const OnRemoveHandler = () => {
                        props.removeTask(el.id)
                    }
                    return (<li key={el.id} className={el.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                        <span>{el.title}</span>
                        <button onClick={OnRemoveHandler}>X</button>
                    </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'All' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'Active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'Completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}