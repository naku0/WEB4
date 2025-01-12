import React, {JSX, useEffect, useState} from "react";
import {Header} from "../smart/Header";
import {fetchDots} from "../../http/DotActions";
import {Result} from "../../models/data/Result";
import {InputForm} from "../smart/InputForm";

export const Game = (): JSX.Element => {
    const [dots, setDots] = useState<Result[]>([]);
    const [error, setError] = useState<string>('');
    const [userID, setUserId] = useState<number>(0);
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUserId(parsedUserInfo.userId || 0);
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const fetchedDots = await fetchDots(userID);
                setDots(fetchedDots);
            } catch (err) {
                setError("Failed to fetch dots")
            }
        })();
    }, [userID]);

    return (
        <>
            <Header/>
            <main>
                <div className="container"></div>
                <canvas>
                </canvas>
                <form>
                    <InputForm/>
                </form>
                <p className="error">{error}</p>
                <table>
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dots.map((result, index) => (
                        <tr key={index}>
                            <td>{result.dot.x}</td>
                            <td>{result.dot.y}</td>
                            <td>{result.dot.r}</td>
                            <td>{result.status ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
    );

}