import React, {useState} from 'react';
// import './App.css';
import {PropsTasksType, ToDoList} from './Components/ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, IconButton, Button, Toolbar, Container, Grid, Paper} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

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

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {tdlID: todoListID1, title: 'What to learn', filter: 'All'},
        {tdlID: todoListID2, title: 'What to buy', filter: 'All'}
    ]);
    let removeTDL = (todolistID: string) => {
        let filteredToDoLists = todoLists.filter(el => el.tdlID !== todolistID);
        setTodoLists(filteredToDoLists)
        delete tasks[todolistID];
        setTasks(tasks);
    }
    function addToDoList(title: string) {
        let todoList: TodoListType = {
            tdlID: v1(), title: title, filter: 'All'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.tdlID]: []})
    }
    let ChangeToDoListTitle = (todolistID: string, newTitle: string) => {
        setTodoLists(todoLists.map(el => el.tdlID === todolistID ? {...el, title: newTitle} : el))
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        /*let todoList = todoLists.find(el => el.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }*/
        setTodoLists(todoLists.map(el => el.tdlID === todolistID ? {...el, filter: value} : el))
    }

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {taskID: v1(), title: 'HTML', isDone: true},
            {taskID: v1(), title: 'CSS', isDone: true},
            {taskID: v1(), title: 'JS', isDone: false},
            {taskID: v1(), title: 'React', isDone: false},],
        [todoListID2]: [
            {taskID: v1(), title: 'Bread', isDone: true},
            {taskID: v1(), title: 'Milk', isDone: true},
            {taskID: v1(), title: 'Eggs', isDone: false},
            {taskID: v1(), title: 'Meat', isDone: false},],
    });
    function removeTask(id: string, todolistID: string,) {
        debugger
        // console.log(todolistID, id)
        /*let tasks = tasks[todolistID];
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistID] = filteredTasks
        // пропусти те элементы id которых !== переданному
        setTasks({...tasksObj});*/
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.taskID !== id)})
    }
    function addTask(todolistID: string, title: string) {
        /*let task = {id: v1(), title: title,isDone: false};
        let tasks = tasksObj[todolistID];
        let newTasks = [task, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj});*/
        let newTask = {taskID: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }
    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        /* let tasks = tasksObj[todolistID]
         let task =  tasks.find(el => el.id === taskId);
           if (task) {
               task.isDone = isDone
               setTasks({...tasksObj});
           }*/
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.taskID === taskID ? {...el, isDone: isDone} : el)
        })
    }
    function changeTitle(todolistID: string, taskID: string, newTitle: string) {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.taskID === taskID ? {...el, title: newTitle} : el)
        })
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
                        let tasksForToDoList = tasks[el.tdlID];
                        if (el.filter === 'Active') {
                            tasksForToDoList = tasks[el.tdlID].filter(t => !t.isDone)
                        }
                        if (el.filter === 'Completed') {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <ToDoList key={el.tdlID}
                                              tdlID={el.tdlID}
                                              title={el.title}
                                              tasks={tasksForToDoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTitle}
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

export default App;
