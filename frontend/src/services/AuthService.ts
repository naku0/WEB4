import $api from "../http/api";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/responce/AuthResponse";

export default class AuthService{
    static async login(username:string, password:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/authentication/login", {username, password})
    }

    static async register(username:string, password:string, secondPassword:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/authentication/register", {username, password, secondPassword})
    }

    static async refresh(): Promise<AxiosResponse<{ accessToken: string }>> {
        return $api.post<{ accessToken: string }>("/authentication/refresh");
    }

    static async logout():Promise<void>{
        return $api.post("/authentication/logout")
    }
}