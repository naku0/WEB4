import React, {JSX} from 'react';
import {Header} from "../smart/Header";
import {Clock} from "../dumb/Clock";
import {useNavigate} from "react-router-dom";
import "../../stylings/Home.css"

export const Home = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <Header/>
            <Clock />
            <div className="playButtonContainer">
                <button className="goPlayButton" onClick={e => navigate("/play")}>Играть</button>
            </div>
        </div>
    );
};

