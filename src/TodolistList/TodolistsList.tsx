import {FC, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../App/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {getTodolistsTC, TodolistDomainType} from "./todolists-reducer";


export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists) // получаем тудулисты
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // получаем таски
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)// получаем статус авторизации

    const dispatch = useAppDispatch();

    useEffect( ()=> {
        dispatch(getTodolistsTC()) //получаем тудулисы
    }, [])

        // если не авторизован - перекидываем на Login
    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }
    console.log(todolists)
    return (
        <div>
            TodolistList
        </div>
    )
}