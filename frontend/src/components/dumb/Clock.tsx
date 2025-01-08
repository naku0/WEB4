import {JSX, useEffect, useState} from "react";
import "../../stylings/Clock.css"

export const Clock = () :JSX.Element =>{
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    function formatNumber(number:number) {
        return number < 10 ? '0' + number : number;
    }

    function updateClock() {
        const now = new Date();
        const hours = formatNumber(now.getHours());
        const minutes = formatNumber(now.getMinutes());
        const seconds = formatNumber(now.getSeconds());
        const date = now.toLocaleDateString();
        setDate(date);
        setTime(`${hours}:${minutes}:${seconds}`);
    }
    useEffect(() => {
        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, [updateClock]);
    return (
        <div className="clock">
            <p>What's the story morning glory?</p>
            <h1>{time}</h1>
            <h3>{date}</h3>
        </div>
    )
}