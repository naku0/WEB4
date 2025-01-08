import {JSX, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {registerUser} from "../../http/AuthActions";
import {useNavigate} from "react-router-dom";

export const RegForm = () : JSX.Element =>{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secondPassword, setSecondPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleReg = async () => {
        if (!username || !password) {
            setError("Пожалуйста, заполните все поля!");
            return;
        } else if (!validatePassword()){
            return;
        }
        try {
            setError(null);
            await dispatch(registerUser(username, password, secondPassword));
            navigate("/play");
        } catch (err: any) {
            setError("Ошибка входа. Проверьте правильность введённых данных.");
        }
    };

    const validatePassword = (): boolean => {
        if (password === null || secondPassword === null) {
            setError("Заполните поля!")
            return false
        } else if (password !== secondPassword) {
            setError("Пароли не совпадают!");
            return false
        } else if (password.length > 20 || secondPassword.length > 20 ||
            password.length < 4 || secondPassword.length < 4) {
            setError("Анука😡")
            return false
        }
        return true
    }

    return (
        <div className="registration">
            <h1>Регистрация</h1>
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
            <input
                onChange={(e) => setSecondPassword(e.target.value)}
                value={secondPassword}
                type="password"
                placeholder="Повторите пароль"
                required={true}
            />
            <button onClick={handleReg}>
                Регистрация
            </button>
        </div>
    );
}