import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import {IconButton, Button, List} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../../../state/todolists-reducer";
import {fetchTasksTC} from "../../../state/tasks-reducer";


type PropsToDoListType = {
    removeTDL: (todolistID: string) => void
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    ChangeToDoListTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const ToDoList = React.memo((props: PropsToDoListType) => {
    //const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.tdlID])
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTasksTC(props.id))
    }, []);
    const removeTDL = useCallback(() => props.removeTDL(props.id), [props.removeTDL, props.id, dispatch]);
    //const addTask = useCallback((title: string) => dispatch(addTaskAC(props.tdlID, title)), [props.tdlID, dispatch]);
    //const addTask = useCallback((title: string) => dispatch(addTaskAC(title)), [props.tdlID, dispatch]);
    const ChangeToDoListTitle = useCallback((newTitle: string) => props.ChangeToDoListTitle(props.id, newTitle), [props.ChangeToDoListTitle, props.id, dispatch]);
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'All'), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'Active' ), [props.id, props.changeFilter, ]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'Completed'), [props.id, props.changeFilter, ]);


    let tasksForToDoList = props.tasks
    console.log(props.tasks)
    if (props.filter === 'Active') {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
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
                    return (
                        <Task
                            task={el}
                            tdlID={props.id}
                            key={el.id}
                            removeTask={props.removeTask}
                            changeTaskTitle={props.changeTaskTitle}
                            changeTaskStatus={props.changeTaskStatus}
                        />
                    );
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