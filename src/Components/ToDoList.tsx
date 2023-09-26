import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton, Button, ListItem, List, Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";

export type PropsTasksType = {
    taskID: string
    title: string
    isDone: boolean
}

type PropsToDoListType = {
    tdlID: string
    title: string
    filter: FilterValuesType
    removeTDL: (todolistID: string) => void
    ChangeToDoListTitle: (todolistID: string, newTitle: string) => void
    changeFilter: (tdlID: string, filter: FilterValuesType) => void
}

export function ToDoList(props: PropsToDoListType) {
debugger
    const tasks = useSelector<AppRootState, Array<PropsTasksType>>(state => state.tasks[props.tdlID])
    const dispatch = useDispatch();


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
        dispatch(addTaskAC(props.tdlID, title))
       /* props.addTask(props.tdlID, title)*/
    }

    let tasksForToDoList = tasks;
    if (props.filter === 'Active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ChangeToDoListTitle}/>
                <IconButton onClick={removeTDL} size={'large'} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksForToDoList.map(el => {
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                       /* props.changeTaskStatus(el.taskID, event.currentTarget.checked, props.tdlID,)*/
                        dispatch(changeTaskStatusAC(el.taskID, event.currentTarget.checked, props.tdlID))
                    }
                    const onChangeTitleHandler = (newValue: string,) => {
                        //props.changeTaskTitle(props.tdlID, el.taskID, newValue)
                        dispatch(changeTaskTitleAC(props.tdlID, el.taskID, newValue));
                    }
                    const OnRemoveHandler = () => {
                        dispatch(removeTaskAC(el.taskID, props.tdlID))
                        /*props.removeTask(el.taskID, props.tdlID)*/
                    }
                    return (<ListItem
                        sx={{display:"flex", justifyContent: "space-between", p:0}}
                        key={el.taskID}
                        className={el.isDone ? 'is-done' : ''}>
                        <Checkbox checked={el.isDone} onChange={onChangeStatusHandler}/>
                        {/*<span>{el.title}</span>*/}
                        <EditableSpan title={el.title}
                                      onChange={onChangeTitleHandler}/>
                        <IconButton onClick={OnRemoveHandler} aria-label="delete" size="small">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>)
                })}
            </List>
            <div>
                <Button
                    sx={{mr: '2px'}}
                    variant={props.filter === 'All' ? 'contained' : 'outlined'}
                    color={'primary'}
                    size={'small'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button sx={{mr: '2px'}}
                        variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button sx={{mr: '2px'}}
                        variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                        color={'primary'}
                        size={'small'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}
