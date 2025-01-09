import {AxiosResponse} from "axios";
import $api from "../http/api";
import {Result} from "../models/data/Result";
import {ResultResponse} from "../models/responce/ResultResponse";

export default class DotService {
    static getDots(userId:number): Promise<AxiosResponse<Result[]>> {
        return $api.get<Result[]>(`/points/${userId}`)
    }
    static sendDot(userId: number, x:string, y:string, r: string): Promise<AxiosResponse<ResultResponse>> {
        return $api.post<ResultResponse>("/dot", {userId, x, y, r});
    }
}
