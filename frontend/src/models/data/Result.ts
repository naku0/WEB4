import {Dot} from "./Dot";

export interface Result{
    userId: number;
    dot:Dot;
    status:boolean;
    speed:number;
    time:string;
}