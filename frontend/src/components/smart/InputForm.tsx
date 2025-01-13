import React, {JSX, useEffect, useState} from "react";
import {sendDot} from "../../http/DotActions";
import {data} from "react-router-dom";


export const InputForm = () : JSX.Element => {
    const [x, setX] = useState<number | null>(null);
    const [y, setY] = useState<string>("");
    const [r, setR] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [userID, setUserId] = useState<number>(0);
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUserId(parsedUserInfo.userId || 0);
        }
    }, []);

    const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setX(value);
    };

    const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setY(event.target.value);
    };

    const handleRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setR(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (x === null || r === null || y.trim() === "") {
            setError("All fields are required!");
        } else {
            setError("");
            sendDot(userID, x.toString(),y,r.toString())
                .then(responce => console.log(responce));
        }
    };

    return (
        <form>
            <fieldset>
                <legend>Select X:</legend>
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((number) => (
                    <label key={number} htmlFor={`x-${number}`}>
                        <input
                            type="checkbox"
                            id={`x-${number}`}
                            value={number}
                            onChange={handleXChange}
                            checked={x === number}
                        />
                        {number}
                    </label>
                ))}
            </fieldset>

            <div>
                <label htmlFor="y-input">
                    Enter Y:
                    <input
                        type="text"
                        id="y-input"
                        value={y}
                        onChange={handleYChange}
                        placeholder="Enter Y value"
                    />
                </label>
            </div>

            <fieldset>
                <legend>Select R:</legend>
                {[1, 2, 3, 4].map((number) => (
                    <label key={number} htmlFor={`r-${number}`}>
                        <input
                            type="checkbox"
                            id={`r-${number}`}
                            value={number}
                            onChange={handleRChange}
                            checked={r === number}
                        />
                        {number}
                    </label>
                ))}
            </fieldset>

            {error && <p className="error">{error}</p>}

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
};
