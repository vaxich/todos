import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4a93d057-d084-4a69-a91d-384fa34f59d8'
    }
}

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
        return promise
    },
    me() {
        const promise = instance.get<ResponseType<{ id: number, email:string, login:string  }>>('auth/me');
        return promise
    },
    logout() {
        const promise = instance.delete<ResponseType<{ userId?: number }>>('auth/login');
        return promise
    }
}
export const todolistsAPI = {
    getTodolists() { //получить тудулисты
        const promise = instance.get<TodolistType[]>('todo-lists');

        return promise;
    },
    getTasks(todolistId: string) { // получить таски
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}


// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
