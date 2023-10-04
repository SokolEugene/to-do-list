import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type PropsEditableSpanType = {
    title: string
    onChange: (newValue:string)=>void
}

export const EditableSpan = React.memo((props: PropsEditableSpanType) => {
    console.log('EditableSpan')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    return (
        editMode
        ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})