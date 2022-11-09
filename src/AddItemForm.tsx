import React, {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
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
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                // onKeyDown={onKeyPressHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />
            <Button variant={"outlined"} color={'primary'} onClick={addTask}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}