import {Result} from "../models/data/Result";

export class CanvasDrawer {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private fillStyle = "#8c8c8c";
    private startX: number;
    private startY: number;
    private oneCell: number;
    private halfCell: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.startX = canvas.width / 2;
        this.startY = canvas.height / 2;
        this.oneCell = canvas.width / 12;
        this.halfCell = this.oneCell / 2;
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawGrid() {
        this.ctx.beginPath();
        for (let x = 0; x <= this.canvas.width; x += this.oneCell) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.strokeStyle = "lightgray";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        for (let y = 0; y <= this.canvas.height; y += this.oneCell) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.strokeStyle = "lightgray";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    public drawShapes(r:number){
        this.clearCanvas();
        this.drawCircle(r);
        this.drawRect(r);
        this.drawTriangle(r);
        this.drawGrid();
        this.drawAxis();
    }

    public drawAxis() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    public drawPoint(point: Result) {
        const pixelX = this.startX + point.dot.x * this.oneCell;
        const pixelY = this.startY - point.dot.y * this.oneCell;

        this.ctx.fillStyle = point.status ? "#A5D6A7" : "#E57373";
        this.ctx.beginPath();
        this.ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }


    public drawCircle(r:number) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.arc(this.startX, this.startY, r*this.oneCell, 0, Math.PI * 0.5, false);
        this.ctx.closePath();
        this.ctx.fill();
    }

    public drawRect(r:number) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.rect(this.startX, this.startY, r*this.oneCell, -r*this.oneCell);
        this.ctx.closePath();
        this.ctx.fill();

    }

    public drawTriangle(r:number) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineTo(this.startX - r*this.halfCell, this.startY);
        this.ctx.lineTo(this.startX, this.startY + r*this.halfCell);
        this.ctx.closePath();
        this.ctx.fill();
    }

    public redrawPoints(points: Result[], r:number) {
        points.forEach(point => {
            const pixelX = this.canvas.width / 2 + (point.dot.x * (this.canvas.width / 12) / point.dot.r) * r;
            const pixelY = this.canvas.height / 2 - (point.dot.y * (this.canvas.height / 12) / point.dot.r) * r;
            this.ctx.fillStyle = point.status ? '#A5D6A7' : '#E57373';
            this.ctx.beginPath();
            this.ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        });
        console.log(`Redrawn points for R=${r}`);
    }
}
