
import React, {ChangeEvent, useCallback} from 'react';
// import {FilterValuesType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";


export type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}

export type PropsTasksType = {
    tasks: TaskType
   // filter: FilterValuesType
    tdlID: string

}


export const Task = React.memo((props: PropsTasksType) => {
    const dispatch = useDispatch();

        const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
             // props.changeTaskStatus(el.taskID, event.currentTarget.checked, props.tdlID,)
            dispatch(changeTaskStatusAC(props.tasks.taskID, event.currentTarget.checked, props.tdlID))
        }, [props.tasks.taskID, props.tdlID]);
        const onChangeTitleHandler = useCallback((newValue: string) => {
            //props.changeTaskTitle(props.tdlID, el.taskID, newValue)
            dispatch(changeTaskTitleAC(props.tdlID, props.tasks.taskID, newValue))
        }, [props.tdlID, props.tasks.taskID]);
        const OnRemoveHandler = useCallback(() => {
            dispatch(removeTaskAC(props.tasks.taskID, props.tdlID))
            // props.removeTask(el.taskID, props.tdlID)
        }, [props.tasks.taskID, props.tdlID]);

    /*let tasksForToDoList = tasks;
    if (props.filter === 'Active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }*/


        return (<ListItem
            sx={{display: "flex", justifyContent: "space-between", p: 0}}
            key={props.tasks.taskID}
            className={props.tasks.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.tasks.isDone} onChange={onChangeStatusHandler}/>

            <EditableSpan title={props.tasks.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={OnRemoveHandler} aria-label="delete" size="small">
                <DeleteIcon/>
            </IconButton>
        </ListItem>)
})
