import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskId: string,
    todolistId: string,
    isDone: boolean,
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskId: string,
    todolistId: string,
    title: string,
}
type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
                stateCopy[action.todolistId] = tasks;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
                stateCopy[action.todolistId] = tasks;
            }
            return stateCopy
        }
        case 'A'
        default:
            throw new Error("I don't understand this type");
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
