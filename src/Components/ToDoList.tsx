import React, {useCallback} from 'react';
import {FilterValuesType} from '../AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton, Button, List} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {Task} from "./Task";

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

export const ToDoList = React.memo((props: PropsToDoListType) => {
    const tasks = useSelector<AppRootState, Array<PropsTasksType>>(state => state.tasks[props.tdlID])
    const dispatch = useDispatch();

    const removeTDL = useCallback(() => props.removeTDL(props.tdlID), [props.removeTDL, props.tdlID, dispatch]);
    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.tdlID, title)), [props.tdlID, dispatch]);
    const ChangeToDoListTitle = useCallback((newTitle: string) => props.ChangeToDoListTitle(props.tdlID, newTitle), [props.ChangeToDoListTitle, props.tdlID,  dispatch]);


    const onAllClickHandler = useCallback(() => props.changeFilter(props.tdlID, 'All'), [props.changeFilter, props.tdlID, dispatch]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.tdlID, 'Active'), [props.changeFilter, props.tdlID]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.tdlID, 'Completed'), [props.changeFilter, props.tdlID, dispatch]);


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
                {tasksForToDoList.map(el => <Task task={el}
                    // filter={props.filter}
                                                  tdlID={props.tdlID}
                                                  key={el.taskID}/>)}
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
})


/*
const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
dispatch(changeTaskStatusAC(el.taskID, event.currentTarget.checked, props.tdlID))
}
const onChangeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(props.tdlID, el.taskID, newValue));
}
const OnRemoveHandler = () => {
    dispatch(removeTaskAC(el.taskID, props.tdlID))
}
return (<ListItem
    sx={{display: "flex", justifyContent: "space-between", p: 0}}
    key={el.taskID}
    className={el.isDone ? 'is-done' : ''}>
    <Checkbox checked={el.isDone} onChange={onChangeStatusHandler}/>
    <span>{el.title}</span>
    <EditableSpan title={el.title}
                  onChange={onChangeTitleHandler}/>
    <IconButton onClick={OnRemoveHandler} aria-label="delete" size="small">
        <DeleteIcon/>
    </IconButton>
</ListItem>)
*/