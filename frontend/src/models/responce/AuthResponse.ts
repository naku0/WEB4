import {User} from "../data/User";

export interface AuthResponse {
    accessToken: string;
    user: User;
}