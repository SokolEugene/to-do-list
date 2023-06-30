import React from 'react';
import './App.css';
import {PropsTasksType, ToDoList} from './Components/ToDoList';

function App() {

    let tasks1:PropsTasksType[] = [
        {id:1, title: 'HTML', isDone: true },
        {id:2, title: 'CSS', isDone: true },
        {id:3, title: 'React', isDone: false }
    ]
    let tasks2:PropsTasksType[] = [
        {id:1, title: 'Terminator', isDone: true },
        {id:2, title: 'Terminator 2', isDone: true },
        {id:3, title: 'Terminator 3', isDone: false }
    ]

    return (
        <div className="App">
            <ToDoList title={'What to learn?'} task={tasks1}/>
            <ToDoList title={"Movies"} task={tasks2} />

        </div>
    )
}

export default App;
