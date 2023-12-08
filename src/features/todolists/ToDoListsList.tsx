import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    getTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {ToDoList} from "./Todolist/ToDoList";
import {Navigate} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const ToDoListsList = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        if (!isLoggedIn){
            return
        }
        // @ts-ignore
        dispatch(getTodolistTC());
    }, []);

    const removeTDL = useCallback((todolistID: string) => {
        // @ts-ignore
        dispatch(removeTodolistTC(todolistID));
    }, []);
    const addToDoList = useCallback((title: string) => {
        // @ts-ignore
        dispatch(addTodolistTC(title))
    }, []);
    const ChangeToDoListTitle = useCallback((todolistID: string, newTitle: string) => {
        // @ts-ignore
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [])

    // !!!!!!!!!!!!!! T A S K S !!!!!!!!!!!!

    const addTask = useCallback(function (title: string, todolistId: string) {
        // @ts-ignore
        dispatch(addTaskTC(title, todolistId))
    }, []);
    const removeTask = useCallback(function (todolistId: string, taskId: string) {
        // @ts-ignore
        dispatch(removeTaskTC({todolistId: todolistId, taskId: taskId}))
    }, []);
    const changeTaskTitle = useCallback(function (todolistId: string, taskId: string, title: string) {
        // @ts-ignore
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, []);
    const changeTaskStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatuses) {
        // @ts-ignore
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, []);
    const changeFilter = useCallback((todolistID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolistID, filter}))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addToDoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoLists.map(el => {

                    let allTodolistTasks = tasks[el.id];

                    return (
                        <Grid item key={el.id}>
                            <Paper style={{padding: "10px"}}>
                                <ToDoList todolist={el}
                                          tasks={allTodolistTasks}
                                          changeFilter={changeFilter}
                                          removeTDL={removeTDL}
                                          ChangeToDoListTitle={ChangeToDoListTitle}
                                          addTask={addTask}
                                          removeTask={removeTask}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTaskStatus={changeTaskStatus}
                                />
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </>
    )
}