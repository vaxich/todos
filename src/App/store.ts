import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {AppActionType, appReducer} from "./app-reduser";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {authReducer} from "../Login/auth-reducer";
import {todolistsReducer} from "../TodolistList/todolists-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers( {
    todolists:todolistsReducer,
    app: appReducer,
    auth:authReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type AllActionType = AppActionType

type HookDispatchType = ThunkDispatch<AppRootStateType, void, AllActionType>
export const useAppDispatch = () => useDispatch<HookDispatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;