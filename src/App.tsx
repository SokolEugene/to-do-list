import React, {useState} from 'react';
import './App.css';
import {PropsTasksType, ToDoList} from './Components/ToDoList';
import {v1} from 'uuid';

//useState  - функция которая принимает в себя данные(state) и функцию(setState) которое способна изменить эти данные и возвращает массив

export type FilterValuesType = 'All' | 'Completed' | 'Active';

function App() {

    /* let tasks1: PropsTasksType[] = [
         {id: 1, title: 'HTML', isDone: true},
         {id: 2, title: 'CSS', isDone: true},
         {id: 3, title: 'JS', isDone: false},
         {id: 4, title: 'React', isDone: false},
     ]*/
    /*let tasks2:PropsTasksType[] = [
        {id:1, title: 'Terminator', isDone: true },
        {id:2, title: 'Terminator 2', isDone: true },
        {id:3, title: 'Terminator 3', isDone: false },
    ]*/

    let [tasks, setTasks] = useState<Array<PropsTasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('All')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        // пропусти те элементы id которых !== переданному
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false};
        let newArrTasks = [newTask, ...tasks];
        setTasks(newArrTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForToDoList = tasks;
    if (filter === 'Completed') {
        tasksForToDoList = tasks.filter(el => el.isDone === true)
    }
    if (filter === 'Active') {
        tasksForToDoList = tasks.filter(el => el.isDone === false)
    }

    return (
        <div className="App">
            <ToDoList title={'What to learn?'}
                      tasks1={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      adTask={addTask}/>
            {/*<ToDoList title={"Movies"} task={tasks2} />*/}

        </div>
    )
}

export default App;
