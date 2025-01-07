import {JSX, useState} from "react";
import {LoginForm} from "../blocks/LoginForm";
import {RegForm} from "../blocks/RegForm";
import {Header} from "../blocks/Header";
import "../../stylings/Form.css"

export const Auth = (): JSX.Element => {
    const [isLogin, setLogin] = useState<boolean>(true);
    return (
        <div className="authPage">
            {isLogin ? (
                <div className="authForm">
                    <LoginForm/>
                    <button className="changer" onClick={e =>
                        setLogin(!isLogin)}>Регистрация
                    </button>
                </div>
            ) : (
                <div className="authForm">
                    <RegForm/>
                    <button className="changer" onClick={e =>
                        setLogin(!isLogin)}>Вход
                    </button>
                </div>

            )
            }
        </div>
    );
}