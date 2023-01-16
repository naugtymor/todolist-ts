import React, {useEffect, useState} from 'react'
import {taskAPI, TaskPriority, TaskStatus, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a5ec2a6b-4d14-4857-9e4a-ebc7dbcaef21'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ae8275d-831d-4e00-ad6e-c21be167433d';
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1ae8275d-831d-4e00-ad6e-c21be167433d';
        taskAPI.createTask(todolistId,"NEW TASK")
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06322fb1-db14-4966-aa7a-e50a290127f6';
        const taskId = 'ed24a95f-3bac-4178-8924-78d974c49943';
        taskAPI.deleteTask(todolistId, taskId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2479de28-1469-46d3-bf1d-c14c7a72c498'
        const taskId = 'ed24a95f-3bac-4178-8924-78d974c49943';
        const object = {
            id: "1",
            title: "string",
            description: "string",
            status: 1,
            priority: 0,
            startDate: "01.01.2021",
            deadline: "07.01.2021",
            todoListId: "2479de28-1469-46d3-bf1d-c14c7a72c498",
            addedDate: "01.01.2021",
            order: 124
        }
        taskAPI.updateTask(todolistId, object, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
