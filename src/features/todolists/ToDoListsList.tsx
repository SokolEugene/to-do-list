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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const ToDoListsList = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    useEffect(() => {
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
    const removeTask = useCallback(function (id: string, todolistId: string) {
        // @ts-ignore
        dispatch(removeTaskTC(todolistId, id))
    }, []);
    const changeTaskTitle = useCallback(function (todolistId: string, taskId: string, title: string) {
        // @ts-ignore
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, []);
    const changeTaskStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatuses) {
        // @ts-ignore
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, []);
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [])
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addToDoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoLists.map(el => {

                    let allTodolistTasks = tasks[el.id];

                    return (
                        <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <ToDoList key={el.id}
                                          id={el.id}
                                          title={el.title}
                                          tasks={allTodolistTasks}
                                          changeFilter={changeFilter}
                                          filter={el.filter}
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