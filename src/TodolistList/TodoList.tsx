import {getTodolistsTC, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../API/todolists-api";
import {Task} from "./Task/Task";
import React, {useEffect} from "react";
import {useAppDispatch} from "../App/store";
import {getTasksTC} from "./Task/taskReducer";



export const TodoList = React.memo( (props: TodoListPropsType) => {

    const dispatch = useAppDispatch();

    useEffect( ()=> {
        dispatch(getTasksTC(props.todolist.id)) //получаем таски
    }, [])

    let taskForTodolist = props.tasks




    return <div >
            <p>{props.todolist.title}</p>
        {
            taskForTodolist.map( task => {

                return  <div key={task.id}>
                    <Task
                        key={task.id}
                        task={task}
                        todolistId={props.todolist.id} //передаем айдишку тудулиста
                        changeTaskStatus={props.changeTaskStatus} //передаем функцию изменения статуса
                        changeTaskTitle={props.changeTaskTitle}// передаем функция изменения титла
                    />
                </div>

            })
        }

    </div>
}
)


export type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}





