import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../App/app-reduser";
import {authAPI, LoginParamsType} from "../API/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";



const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type ) {
        case "login/SET-IS-LOGGED-IN":
            // если пользователь авторизован - меняем initialState на true
            return {...state, isLoggedIn:action.value}
        default:
            return state
    }
}


// thunk

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then( (res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })

}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))// меняем статус
    authAPI.logout()// запрос на сервер
        .then( (res) => {//ответ от сервера
            if (res.data.resultCode === 0) { //если нет ошибок
                dispatch(setIsLoggedInAC(false)) // меняем статус на false
                dispatch(setAppStatusAC('succeeded'))// меняем статус
            } else {
                handleServerAppError(res.data, dispatch); //показываем ошибку
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })

}

//actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: "login/SET-IS-LOGGED-IN", value} as const)




//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>