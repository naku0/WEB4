import React, {JSX, useEffect, useState} from 'react';
import {Header} from "../smart/Header";
import {Clock} from "../dumb/Clock";
import {useNavigate} from "react-router-dom";
import "../../stylings/Home.css"

export const Home = (): JSX.Element => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
    }, []);
    return (
        <div className="home">
            <Header/>
            <Clock />
            {isAuthenticated ? (
                <div className="playButtonContainer">
                    <button className="goPlayButton" onClick={e => navigate("/play")}>Играть</button>
                </div>
            ): (
                <div className="playButtonContainer">
                    <button className="goPlayButton" onClick={e => navigate("/auth")}>Вход</button>
                </div>
            )}
        </div>
    );
};

