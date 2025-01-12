import DotService from "../services/DotService";
import {Result} from "../models/data/Result";


export const sendDot = async (id:number, x: string, y: string, r: string) => {

    if (id === undefined || id===null) {
        throw new Error("User ID is not set");
    } else {
        try {
            const response = await DotService.sendDot(id, x, y, r);
            return response.data;
        } catch (error) {
            console.error("Error sending dot:", error);
            throw error;
        }
    }
};

export const fetchDots = async (id:number): Promise<Result[]> => {
    if (id === undefined || id === null) {
        throw new Error("User ID is not set");
    }
    try {
        const response = await DotService.getDots(id);
        return response.data;
    } catch (error) {
        console.error("Error fetching dots:", error);
        throw error;
    }
};