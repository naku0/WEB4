import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const LogoutButton = (): JSX.Element => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            navigate("/auth");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <div className="logoutButton">
            <button onClick={handleLogout}>
                <p>Выйти</p>
                <span className="material-symbols-outlined">logout</span>
            </button>
        </div>
    );
};
