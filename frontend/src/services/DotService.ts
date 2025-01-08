import {AxiosResponse} from "axios";
import $api from "../http/api";
import {Result} from "../models/data/Result";
import {ResultResponse} from "../models/responce/ResultResponse";

export default class DotService {
    static getDots(): Promise<AxiosResponse<Result[]>> {
        return $api.get<Result[]>("/points")
    }
    static sendDot(userId: number, x:string, y:string, r: string): Promise<AxiosResponse<ResultResponse>> {
        return $api.post<ResultResponse>("/", {userId, x, y, r});
    }
}
