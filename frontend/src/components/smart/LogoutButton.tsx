import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const LogoutButton = (): JSX.Element => {
    const navigate = useNavigate();

    const handleLogout = async (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            localStorage.removeItem('userInfo');
            navigate('/auth');
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
