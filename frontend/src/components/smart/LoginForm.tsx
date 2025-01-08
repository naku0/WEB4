import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "../../http/AuthActions";
import {AppDispatch} from "../../redux/store";
import {useNavigate} from "react-router-dom";

export const LoginForm = (): JSX.Element => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Пожалуйста, заполните все поля!");
            return;
        }
        try {
            setError(null);
            await dispatch(loginUser(username, password));
            navigate("/play");
        } catch (err: any) {
            setError("Ошибка входа. Проверьте правильность введённых данных.");
        }
    };

    return (
        <div className="login">
            <h1>Вход</h1>
            {error && <div className = "error">{error}</div>}
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Ваш никнейм"
                required={true}
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Ваш пароль"
                required={true}
            />
            <button onClick={handleLogin}>
                Логин
            </button>
        </div>
    );
};
