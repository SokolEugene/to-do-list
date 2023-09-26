import React from 'react';
import {PropsTasksType, ToDoList} from './Components/ToDoList';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, IconButton, Button, Toolbar, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    //todolistsReducer
} from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

//useState  - функция которая принимает в себя данные(state) и функцию(setState) которое способна изменить эти данные и возвращает массив

export type FilterValuesType = 'All' | 'Completed' | 'Active';

export type TodoListType = {
    tdlID: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<PropsTasksType>
}

function AppWithRedux() {


    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState,TodoListType[] >(state => state.todolist)



    let removeTDL = (todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        dispatch(action);
    }
    function addToDoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
       /* let todoList: TodoListType = {
            tdlID: v1(), title: title, filter: 'All'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.tdlID]: []})*/
    }
    let ChangeToDoListTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistID, value))
        /*let todoList = todoLists.find(el => el.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }*/
       // setTodoLists(todoLists.map(el => el.tdlID === todolistID ? {...el, filter: value} : el))
    }

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
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <ToDoList key={el.tdlID}
                                              tdlID={el.tdlID}
                                              title={el.title}
                                              //tasks={el.tasksForToDoList}

                                              changeFilter={changeFilter}



                                              filter={el.filter}
                                              removeTDL={removeTDL}
                                              ChangeToDoListTitle={ChangeToDoListTitle}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
