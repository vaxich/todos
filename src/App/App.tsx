import React, {useCallback, useEffect} from 'react';
import {initializedTC} from "./app-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {logoutTC} from "../Login/auth-reducer";
import {Button, CircularProgress} from "@mui/joy";
import {TodolistsList} from "../TodolistList/TodolistsList";
import { Login } from '../Login/Login';
import {Route, Routes} from "react-router-dom";


function App() {

  //const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)

  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)//если true - авторизован

  const dispatch = useAppDispatch();

  useEffect( () => {
    //проверяем - авторизованы ли мы
    dispatch(initializedTC())
  }, [])

  const logoutHandler = useCallback( () => {
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

          {isLoggedIn && <Button color="primary" onClick={logoutHandler}>Log out</Button> } {/*если авторизован - показать кнопку Log out*/}

        <Routes>
          <Route path='/' index element={ <TodolistsList />}/>
          <Route path ='/login' element={ <Login />}/>
        </Routes>
      </div>

  );
}

export default App;
