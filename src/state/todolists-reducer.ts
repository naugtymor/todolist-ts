import {TaskType} from "../TodoList";

type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: Array<TaskType>, action: ActionType): Array<TaskType> => {
    switch (action.type) {

        default:
            throw new Error("I don't understand this type");
    }
}