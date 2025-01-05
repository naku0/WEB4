import {AxiosResponse} from "axios";
import $api from "../http";
import {Result} from "../models/data/Result";

export default class DotService {
    static getDots(): Promise<AxiosResponse<Result[]>> {
        return $api.get<Result[]>("/points")
    }
}