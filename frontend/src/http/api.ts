import axios from "axios";
import AuthService from "../services/AuthService";
import {store} from "../redux/store";
import {logout} from "../redux/slices/userSlice";

const $api = axios.create({
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error.response?.status);
        if (error.response?.status === 403) {
            try {
                const refreshResponse = await AuthService.refresh();
                console.log(refreshResponse.data);
                const newAccessToken = refreshResponse.data.accessToken;

                localStorage.setItem('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return $api.request(originalRequest);
            } catch (refreshError:any) {
                console.error("Ошибка обновления токена:", refreshError);
                if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
                    console.error("Обновление токена не удалось. Завершаем сессию.");
                    localStorage.removeItem('token');
                    store.dispatch(logout());
                    window.location.href = '/auth';
                }
            }
        }
        return Promise.reject(error);
    }
);


export default $api;