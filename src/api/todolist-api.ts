import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a5ec2a6b-4d14-4857-9e4a-ebc7dbcaef21'
    }
}

export const todolistAPI = {
    getTodolist() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    },
    updateTodolist(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    }
}
//
// import axios, {AxiosResponse} from 'axios'
//
// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'a5ec2a6b-4d14-4857-9e4a-ebc7dbcaef21'
//     }
// })
//
// export const todolistAPI = {
//     updateTodolist(title: string, todolistId: string) {
//         return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
//     },
//     getTodolist() {
//         return instance.get<TodolistType[]>(`todo-lists/`,)
//     },
//     createTodolist(title: string) {
//         return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
//     },
//     deleteTodolist(todolistId: string) {
//         return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
//     }
// }

