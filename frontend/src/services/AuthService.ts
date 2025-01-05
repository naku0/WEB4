import $api from "../http";
import {Axios, AxiosResponse} from "axios";
import {AuthResponce} from "../models/responce/AuthResponce";

export default class AuthService{
    static async login(username:string, password:string):Promise<AxiosResponse<AuthResponce>>{
        return $api.post<AuthResponce>("/auth/login", {username, password})
    }

    static async register(username:string, password:string, secondPassword:string):Promise<AxiosResponse<AuthResponce>>{
        return $api.post<AuthResponce>("/auth/register", {username, password, secondPassword})
    }

    static async logout():Promise<void>{
        return $api.post("/auth/logout")
    }
}