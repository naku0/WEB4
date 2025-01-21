import React, {JSX, useEffect, useState} from "react";
import {Header} from "../smart/Header";
import {fetchDots, sendDot} from "../../http/DotActions";
import {Result} from "../../models/data/Result";
import {InputForm} from "../smart/InputForm";
import {useNavigate} from "react-router-dom";
import {CanvasDrawer} from "../../services/CanvasDrawer";
import "../../stylings/Game.css";

export const Game = (): JSX.Element => {
    const [dots, setDots] = useState<Result[]>([]); // Убедитесь, что dots всегда массив
    const [error, setError] = useState<string>('');
    const [userID, setUserId] = useState<number | null>(null);
    const [canvasDrawer, setCanvasDrawer] = useState<CanvasDrawer | null>(null);
    const [radius, setRadius] = useState<number>(1);
    const navigate = useNavigate();

    const addDot = (newDot: Result) => {
        setDots((prevDots: Result[]) => [...prevDots, newDot]);
    };

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvasElement = event.currentTarget;

        const rect = canvasElement.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;

        const x = (canvasX - 400 / 2) / (400 / 12);
        const y = (400 / 2 - canvasY) / (400 / 12);

        if (userID) {
            setError("");
            sendDot(userID, x.toString(), y.toString(), radius.toString())
                .then(response => {
                    const result = response.result;
                    const updatedDots = [...dots, result];
                    setDots(updatedDots);
                    sessionStorage.setItem("points", JSON.stringify(updatedDots));
                    canvasDrawer?.drawPoint(result);
                })
                .catch(error => {
                    if (error.status === 400) {
                        setError("Проблема с введеными данными. Перепроверьте их");
                    }
                });
        } else {
            setError("Проблема с пользователем");
        }
    };

    useEffect(() => {
        const canvasElement = document.querySelector('canvas') as HTMLCanvasElement;
        if (canvasElement) {
            const drawer = new CanvasDrawer(canvasElement);
            setCanvasDrawer(drawer);

            const points = sessionStorage.getItem('points');
            let storedDots: Result[] = [];
            if (points) {
                try {
                    storedDots = JSON.parse(points) as Result[];
                    if (!Array.isArray(storedDots)) {
                        throw new Error("Invalid stored dots format");
                    }
                    setDots(storedDots);
                    if (storedDots.length > 0) {
                        const lastR = storedDots[storedDots.length - 1].dot.r;
                        setRadius(lastR);
                        drawer.drawShapes(lastR);
                        storedDots.forEach(dot => drawer.drawPoint(dot));
                    } else {
                        drawer.drawShapes(1);
                    }
                } catch (err) {
                    console.error("Failed to parse stored points:", err);
                    setDots([]);
                }
            } else {
                drawer.drawShapes(1);
            }
        }
    }, []);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            const userID = parsedUserInfo.id;
            setUserId(userID || null);
            (async () => {
                try {
                    const fetchedDots = await fetchDots(userID);
                    if (Array.isArray(fetchedDots)) {
                        sessionStorage.setItem("points", JSON.stringify(fetchedDots));
                        setDots(fetchedDots);
                    } else {
                        console.error("Fetched dots are not an array");
                        setDots([]);
                    }
                } catch (e) {
                    console.error("Error fetching dots:", e);
                    setError("Вы еще не вводили точки!");
                }
            })();
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="graph">
                        <canvas width="400px" height="400px" onClick={handleClick}></canvas>
                    </div>
                    <form>
                        <InputForm addDots={addDot} dots={dots} radius={radius} setRadius={setRadius} />
                    </form>
                </div>
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
                    {Array.isArray(dots) && dots.map((result, index) => (
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
};
