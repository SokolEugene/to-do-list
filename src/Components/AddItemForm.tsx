import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormProps = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormProps) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addTask()
            /*props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('')*/
        }
    }
    const addTask = () => {

        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }
    return (
        <div>
            <TextField
                size={'small'}
                id="outlined-basic"
                label="Add task"
                variant="outlined"
                error={!!error}
                helperText={error}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                // className={error}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <IconButton onClick={addTask}
                color={'primary'}>
<AddTaskIcon/>
            </IconButton>
        </div>
    )
}