import {useSelector} from "react-redux";
import {AppRootStateType} from "../App/store";
import {Navigate} from "react-router-dom";


export const Login = () => {

    const isAuth = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)

    if(isAuth) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div>
            Login
        </div>
    )
}