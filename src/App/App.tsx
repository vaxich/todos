import React, {useCallback, useEffect} from 'react';
import {initializedTC, RequestStatusType} from "./app-reduser";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {logoutTC} from "../Login/auth-reducer";
import {Button} from "@mui/joy";
import {TodolistsList} from "../TodolistList/TodolistsList";
import {Login} from '../Login/Login';
import {Route, Routes} from "react-router-dom";

import {AppBar, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


function App() {

    //const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)//если true - авторизован

    const dispatch = useAppDispatch();

    useEffect(() => {
        //проверяем - авторизованы ли мы
        dispatch(initializedTC())
    }, [])

    const logoutHandler = useCallback(() => {
        //удаляем авторизацию
        dispatch(logoutTC())
    }, [])

    // if(!initialized) {
    //   return  <div style={{position:"fixed", top:"30%", textAlign:"center", width:"100%"}}>
    //     <CircularProgress
    //         color="primary"
    //         size="lg"
    //         variant="solid"
    //     />
    //   </div>
    // }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button color="primary" onClick={logoutHandler}>Log
                        out</Button>} {/*если авторизован - показать кнопку Log out*/}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>} {/* если статус загрузки - показываем линию загрузки */}
            </AppBar>


            <Routes>
                <Route path='/' index element={<TodolistsList/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>

    );
}

export default App;
