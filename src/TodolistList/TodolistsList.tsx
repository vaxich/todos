import {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {getTodolistsTC, TodolistDomainType} from "./todolists-reducer";
import {TodoList} from "./TodoList";
import { TasksStateType, updateTaskTC} from "./Task/taskReducer";
import {Grid, Paper} from "@mui/material";
import {TaskStatuses} from "../API/todolists-api";


export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists) // получаем тудулисты
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // получаем таски
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)// получаем статус авторизации

    const dispatch = useAppDispatch();

    useEffect( ()=> {
        dispatch(getTodolistsTC()) //получаем тудулисы
    }, [])


    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

        // если не авторизован - перекидываем на Login
    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return   <div>
        <Grid container spacing={3}>
            {
                todolists.map( tl => { //мапим тудулисты
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    todolist={tl}// передаем один тудулист
                                    tasks={allTodolistTasks} //передаем таски одного тудулиста
                                    changeTaskStatus={changeTaskStatus} //передаем функцию изменения статуса
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>

                    </Grid>
                })
            }
        </Grid>


        </div>

}