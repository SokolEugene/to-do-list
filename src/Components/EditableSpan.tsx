import React, {ChangeEvent, useState} from 'react';

type PropsEditableSpanType = {
    title: string
    onChange: (newValue:string)=>void
}

export function EditableSpan(props: PropsEditableSpanType) {
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
        ? <input value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}