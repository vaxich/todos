import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../App/app-reduser";

import {handleServerNetworkError} from "../utils/error-utils";
import {todolistsAPI} from "../API/todolists-api";
import {Dispatch} from "redux";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType > = initialState  , action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map( tl => ({...tl, filter:'all', entityStatus:'idle'}))
        default:
            return state
    }

}

//atcions
export const getTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)



//thunk

export const getTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

//type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ActionsType =
    | ReturnType<typeof getTodolistsAC>


type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>