import {Dispatch} from "redux";
import {authAPI} from "../API/todolists-api";
import {setIsLoggedInAC} from "../Login/auth-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }

}



//actions
export const setAppInitializedAC = (value:  boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

//thunk
export const initializedTC = () => (dispatch: Dispatch) => {
    //делаем запрос на сервер.
    authAPI.me()
        .then( res => {
            // если ошибки нет и мы авторизованы( resultCode === 0 ), dispatch authReducer с setIsLoggedInAC
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            }
            //если пришла ошибка - dispatch appReducer с setAppInitializedAC
            dispatch(setAppInitializedAC(true))
        })
}


//types

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение инициализировалось
    isInitialized: boolean
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionType =  ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>