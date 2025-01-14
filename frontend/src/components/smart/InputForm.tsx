import React, {JSX, useEffect, useState} from "react";
import {sendDot} from "../../http/DotActions";
import {Result} from "../../models/data/Result";
import {CanvasDrawer} from "../../services/CanvasDrawer";

interface InputFormProps {
    addDots: (result: Result) => void;
    dots: Result[];
}


export const InputForm = ({addDots, dots}: InputFormProps): JSX.Element => {
    const [x, setX] = useState<number | null>(null);
    const [y, setY] = useState<string>("");
    const [r, setR] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [userID, setUserId] = useState<number | null>(null);
    const [canvasDrawer, setCanvasDrawer] = useState<CanvasDrawer | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUserId(parsedUserInfo.id);
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
        if (canvasDrawer) {
            canvasDrawer.clearCanvas();
            canvasDrawer.drawShapes(value);
            canvasDrawer.redrawPoints(dots, value);
            canvasDrawer.drawAxis();

        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!userID) {
            setError("User ID not loaded yet. Please wait.");
            return;
        }

        if (x === null || r === null || y.trim() === "") {
            setError("All fields are required!");
        } else {
            setError("");
            sendDot(userID, x.toString(), y, r.toString())
                .then(response => {
                    const result = response.result;
                    addDots(result);
                    canvasDrawer?.drawPoint(result)
                })
                .catch(error => {
                    if (error.status === 400) {
                        setError("Проблема с введеными данными. Перепроверьте их")
                    }
                });
        }
    }

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

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}
