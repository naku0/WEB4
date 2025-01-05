import {JSX, useState} from "react";

export const LoginForm = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Ваш Никнейм"/>

            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Ваш пароль"
            />
            <button>
                Логин
            </button>
        </>
    );
}