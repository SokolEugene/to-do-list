import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type PropsTasksType = {
    taskID: string
    title: string
    isDone: boolean
}

type PropsToDoListType = {
    tdlID: string
    title: string
    tasks: Array<PropsTasksType> //PropsTasksType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, NewTitle: string) => void
    filter: FilterValuesType
    removeTDL: (todolistID: string) => void
    ChangeToDoListTitle: (todolistID: string, newTitle: string) => void
}

export function ToDoList(props: PropsToDoListType) {

    /*const [newTaskTitle, setNewTaskTitle] = useState('');*/
    /*const [error, setError] = useState<string | null>(null);*/
    /* const addTask = () => {
         if (newTaskTitle.trim() !== '') {
             props.addTask(props.tdlID, newTaskTitle.trim())
             setNewTaskTitle('')
         } else {
             setError('Field is required')
         }
     }*/
    /*const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }*/
    /*const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addTask()
            /!*props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('')*!/
        }
    }*/
    const onAllClickHandler = () => props.changeFilter(props.tdlID, 'All')
    const onActiveClickHandler = () => props.changeFilter(props.tdlID, 'Active')
    const onCompletedClickHandler = () => props.changeFilter(props.tdlID, 'Completed')
    const removeTDL = () => {
        props.removeTDL(props.tdlID)
    }
    const ChangeToDoListTitle = (newTitle: string) => {
        props.ChangeToDoListTitle(props.tdlID, newTitle);
    }
    const addTask = (title: string) => {
        props.addTask(props.tdlID, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ChangeToDoListTitle}/>
                {/*{props.title}*/}
                <button onClick={removeTDL}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <ul>
                {props.tasks.map(el => {
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.tdlID, el.taskID, event.currentTarget.checked)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.tdlID, el.taskID, newValue)
                    }
                    const OnRemoveHandler = () => {
                        props.removeTask(el.taskID, props.tdlID)
                    }
                    return (<li key={el.taskID} className={el.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={el.isDone} onChange={onChangeStatusHandler}/>
                        {/*<span>{el.title}</span>*/}
                        <EditableSpan title={el.title}
                                      onChange={onChangeTitleHandler}/>
                        <button onClick={OnRemoveHandler}>X</button>
                    </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
