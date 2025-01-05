import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "../http/AuthActions";
import {AppDispatch} from "../redux/store";

export const LoginForm = (): JSX.Element => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Пожалуйста, заполните все поля!");
            return;
        }

        try {
            setError(null);
            await dispatch(loginUser(username, password));
            alert("Вы успешно вошли в систему!");
        } catch (err: any) {
            setError("Ошибка входа. Проверьте правильность введённых данных.");
        }
    };

    return (
        <div>
            <h2>Войти в систему</h2>
            {error && <div>{error}</div>}
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Ваш Никнейм"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Ваш пароль"
            />
            <button onClick={handleLogin}>
                Логин
            </button>
        </div>
    );
};
