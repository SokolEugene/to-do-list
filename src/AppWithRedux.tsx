import React, {useCallback, useEffect} from 'react';
import {ToDoList} from './Components/ToDoList';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, IconButton, Button, Toolbar, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, FilterValuesType, getTodolistTC,
    removeTodolistTC, TodolistDomainType,
} from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";

//useState  - функция которая принимает в себя данные(state) и функцию(setState) которое способна изменить эти данные и возвращает массив



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("App")
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    console.log({todoLists})
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    console.log({tasks})
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
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        // @ts-ignore
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, []);
    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // @ts-ignore
        dispatch(updateTaskTC(id, {status}, todolistId))
    }, []);
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Tasks
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoLists.map(el => {

                        let allTodolistTasks = tasks[el.id];
                        console.log(el.id)

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
            </Container>

        </div>
    )
}

export default AppWithRedux;
