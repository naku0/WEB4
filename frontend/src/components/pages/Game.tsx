import React, {JSX, useEffect, useState} from "react";
import {Header} from "../smart/Header";
import {fetchDots} from "../../http/DotActions";
import {Result} from "../../models/data/Result";
import {InputForm} from "../smart/InputForm";
import {useNavigate} from "react-router-dom";
import {CanvasDrawer} from "../../services/CanvasDrawer";

export const Game = (): JSX.Element => {
    const [dots, setDots] = useState<Result[]>([]);
    const [error, setError] = useState<string>('');
    const [userID, setUserId] = useState<number | null>(null);
    const [canvasDrawer, setCanvasDrawer] = useState<CanvasDrawer | null>(null);
    const [radius, setRadius] = useState<number>(1);
    const navigate = useNavigate();

    const addDot = (newDot: Result) => {
        setDots((prevDots: Result[]) => [...prevDots, newDot]);
    };

    useEffect(() => {
        const canvasElement = document.querySelector('canvas') as HTMLCanvasElement;
        if (canvasElement) {
            const drawer = new CanvasDrawer(canvasElement);
            setCanvasDrawer(drawer);

            let lastDot = dots.at(0);
            if (lastDot) {
                const lastR = lastDot.dot.r;
                setRadius(lastR);
                drawer.drawShapes(lastR);
            }
        }
    }, [dots, canvasDrawer]);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            const userID = parsedUserInfo.id;
            setUserId(userID || null);
            (async () => {
                try {
                    const fetchedDots = await fetchDots(userID);
                    setDots(fetchedDots);
                } catch (e) {
                    setError("вы еще не вводили точки!");
                }
            })();
        } else {
            navigate('/auth');
        }
    }, [navigate]);


    return (
        <>
            <Header/>
            <main>
                <div className="container"></div>
                <canvas>
                </canvas>
                <form>
                    <InputForm addDots={addDot} dots={dots}/>
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