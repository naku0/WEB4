import {AppDispatch} from "../redux/store";
import AuthService from "../services/AuthService";
import {login, logout} from "../redux/slices/userSlice";

export const loginUser =
    (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.login(username, password);
            const {user, accessToken} = response.data;
            localStorage.setItem("token", accessToken);
            dispatch(login({user}));
        } catch (error) {
            console.error("Ошибка при входе:", error);
        }
    };

export const registerUser =
    (username: string, password: string, secondPassword: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.register(username, password, secondPassword);
            const {user, accessToken} = response.data;
            localStorage.setItem("token", accessToken);
            dispatch(login({user}));
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    };


export const logoutUser =
    () => async (dispatch: AppDispatch) => {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            dispatch(logout());
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };


const validatePassword = (pswd1: string, pswd2: string): boolean => {
    if (pswd1 === null || pswd2 === null) {
        return false
    } else if (pswd1 !== pswd2) {
        return false
    } else if (pswd1.length > 20 || pswd2.length > 20 || pswd1.length < 4 || pswd2.length < 4) {
        return false
    }
    return true
}