import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserState} from "../../models/states/UserState";
import {User} from "../../models/data/User";

const initialState: UserState = {
    isAuth: false,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User }>) => {
            state.isAuth = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
