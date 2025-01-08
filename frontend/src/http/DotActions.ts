import DotService from "../services/DotService";
import {Result} from "../models/data/Result";

export const sendDot = async (userId: number, x: string, y: string, r: string) => {
    try {
        const response = await DotService.sendDot(userId, x, y, r);
        return response.data;
    } catch (error) {
        console.error("Error sending dot:", error);
        throw error;
    }
};

export const fetchDots = async (): Promise<Result[]> => {
    try {
        const response = await DotService.getDots();
        return response.data;
    } catch (error) {
        console.error("Error fetching dots:", error);
        throw error;
    }
};