import {JSX, useEffect, useState} from "react";
import {Header} from "../smart/Header";
import {fetchDots} from "../../http/DotActions";
import {Result} from "../../models/data/Result";

export const Game = (): JSX.Element => {
    const [dots, setDots] = useState<Result[]>([]);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        (async () => {
            try {
                const fetchedDots = await fetchDots();
                setDots(fetchedDots);
            } catch (err) {
                setError("Failed to fetch dots");
            }
        })();
    }, []);
    return (
        <>
            <Header/>
            <main>
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
                    {dots.map((result,index) => (
                        <tr key={index}>
                            <td>{result.dot.x}</td>
                            <td>{result.dot.y}</td>
                            <td>{result.dot.r}</td>
                            <td>{result.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}