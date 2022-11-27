import React from "react"
import { action } from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatus = action("status changed");
const removeTask = action("task removed");
const changeTaskTitle = action("title changed");

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: "1", isDone: true, title: "CSS"}}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            todolistId={"todolistId1"}
            changeTaskTitle={changeTaskTitle}
        />
        <Task
            task={{id: "2", isDone: false, title: "Storybook"}}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            todolistId={"todolistId2"}
            changeTaskTitle={changeTaskTitle}
        />
    </>
}