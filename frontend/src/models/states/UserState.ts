import {User} from "../data/User";

export interface UserState{
    isAuth:boolean,
    user:User|null,
}