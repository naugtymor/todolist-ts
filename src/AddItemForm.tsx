import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key == "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField
                label="Title" variant="outlined"
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                // onKeyDown={onKeyPressHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addTask}>
                <LibraryAdd/>
            </IconButton>
        </div>
    )
});