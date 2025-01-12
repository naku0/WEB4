import {AppDispatch} from "../redux/store";
import AuthService from "../services/AuthService";
import {login, logout} from "../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

export const loginUser =
    (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.login(username, password);
            const {user, accessToken} = response.data;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("userInfo", JSON.stringify(user))
            dispatch(login({user}));
        } catch (error:any) {
            if (error.response.data.message){
                throw new Error(error.response.data.message)
            }
        }
    };

export const registerUser =
    (username: string, password: string, secondPassword: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.register(username, password, secondPassword);
            const {user, accessToken} = response.data;
            localStorage.setItem("token", accessToken);
            dispatch(login({user}));
        } catch (error:any) {
            if (error.response.data.message){
                throw new Error(error.response.data.message)
            }
        }
    };





