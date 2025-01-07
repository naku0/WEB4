import axios from "axios";
import AuthService from "../services/AuthService";
import {store} from "../redux/store";
import {logout} from "../redux/slices/userSlice";

export const API_URL = 'http://localhost:8080/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const refreshResponse = await AuthService.refresh();
                const newAccessToken = refreshResponse.data.accessToken;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return $api.request(originalRequest);
            } catch (refreshError) {
                console.error("Ошибка обновления токена:", refreshError);
                localStorage.removeItem('token');
                store.dispatch(logout());
                window.location.href = '/auth';
            }
        }

        return Promise.reject(error);
    }
);

export default $api;