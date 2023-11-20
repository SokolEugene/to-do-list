import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";


export type PropsTasksType = {
    task: TaskType
    tdlID: string
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}
/*export type PropsTasksType = {
    taskID: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}*/

export const Task = React.memo((props: PropsTasksType) => {

    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.tdlID, props.task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        // dispatch(changeTaskStatus(props.task.taskID, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.tdlID))
    }, [props.task.id, props.tdlID]);
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.tdlID, props.task.id, newValue)
        // dispatch(changeTaskTitle(props.task.taskID, newValue, props.tdlID, ))
    }, [props.tdlID, props.task.id]);
    const OnRemoveHandler = useCallback(() => {
        //  dispatch(removeTaskAC(props.task.taskID, props.tdlID))
        // debugger
        props.removeTask(props.tdlID, props.task.id)
    }, [props.task.id, props.tdlID]);

    /*let tasksForToDoList = tasks;
    if (props.filter === 'Active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }*/


    return (<ListItem
        sx={{display: "flex", justifyContent: "space-between", p: 0}}
        key={props.task.id}
        className={props.task.status ? 'is-done' : ''}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeStatusHandler}/>

        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton onClick={OnRemoveHandler} aria-label="delete" size="small">
            <DeleteIcon/>
        </IconButton>
    </ListItem>)
})
