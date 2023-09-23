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

  /*  let todoListID1 = v1()
    let todoListID2 = v1()*/

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState,TodoListType[] >(state => state.todolist)



    let removeTDL = (todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        dispatch(action);

        /*let filteredToDoLists = todoLists.filter(el => el.tdlID !== todolistID);
        setTodoLists(filteredToDoLists)
        delete tasks[todolistID];
        setTasks(tasks);*/
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
        //setTodoLists(todoLists.map(el => el.tdlID === todolistID ? {...el, title: newTitle} : el))
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


    /*function removeTask(id: string, todolistID: string,) {
       /!*const action = removeTaskAC(id, todolistID);
        dispatchToTasksReducer(action)*!/
        dispatch(removeTaskAC(id, todolistID))
        // console.log(todolistID, id)
        /!*let tasks = tasks[todolistID];
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistID] = filteredTasks
        // пропусти те элементы id которых !== переданному
        setTasks({...tasksObj});*!/
        /!*setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.taskID !== id)})*!/
    }
    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID, title))
    }
    function changeStatus(taskID: string, isDone: boolean, todolistID: string ) {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
        /!* let tasks = tasksObj[todolistID]
         let task =  tasks.find(el => el.id === taskId);
           if (task) {
               task.isDone = isDone
               setTasks({...tasksObj});
           }*!/
       /!* setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.taskID === taskID ? {...el, isDone: isDone} : el)
        })*!/
    }
    function changeTitle(todolistID: string, taskID: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle));
        /!*const action = changeTaskTitleAC(todolistID, taskID, newTitle);
        dispatchToTasksReducer(action);*!/
       /!* setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.taskID === taskID ? {...el, title: newTitle} : el)
        })*!/
    }
*/



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
                       /* let tasksForToDoList = tasks[el.tdlID];
                        if (el.filter === 'Active') {
                            tasksForToDoList = tasks[el.tdlID].filter(t => !t.isDone)
                        }
                        if (el.filter === 'Completed') {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                        }*/
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
