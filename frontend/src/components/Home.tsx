import React, {JSX} from 'react';
import {Header} from "./Header";
import { Link } from 'react-router-dom';
import {LoginForm} from "./LoginForm";

export const Home = (): JSX.Element => {
    return (
        <>
            <Header/>
            <Link to="/auth"/ >
        </>
    );
};

