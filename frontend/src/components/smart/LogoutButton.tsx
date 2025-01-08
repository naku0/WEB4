import {JSX} from "react";
import {logoutUser} from "../../http/AuthActions";

export const LogoutButton = (): JSX.Element => {
    return (
        <div className="logoutButton">
            <button onClick={logoutUser}>
                <p>Выйти</p>
                <span className="material-symbols-outlined">logout</span>
            </button>

        </div>
    );
}