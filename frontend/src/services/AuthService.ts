import $api from "../http/api";
import {Axios, AxiosResponse} from "axios";
import {AuthResponse} from "../models/responce/AuthResponse";

export default class AuthService{
    static async login(username:string, password:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/login", {username, password})
    }

    static async register(username:string, password:string, secondPassword:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/register", {username, password, secondPassword})
    }

    static async logout():Promise<void>{
        return $api.post("/auth/logout")
    }
}