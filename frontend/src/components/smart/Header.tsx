import {JSX, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {UserCard} from "../dumb/UserCard";
import "../../stylings/Header.css"
import {LogoutButton} from "./LogoutButton";

export const Header = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    localStorage.setItem("token", "asdfvg12wrfrf23");
    localStorage.setItem("userInfo", JSON.stringify({username: "JohnDoe"}));

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUsername(JSON.parse(userInfo).username || 'user');
        }
    }, []);

    return (
        <div className="header">
            {isAuthenticated ? (
                <>
                    <UserCard username={username}/>
                    <LogoutButton/>
                </>
            ) : (
                <Link to="/auth">Вход</Link>
            )}
        </div>
    );
}