import {User} from "../data/User";

export interface AuthResponce{
    accessToken: string;
    user: User;
}