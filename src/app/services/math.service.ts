import {Position} from "../map/position";
export class MathService {
    static getRad(deg: number): number {
        return deg * Math.PI/180;
    }
    static getDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }
    static getTangensByDegree(angle: number): number {
        return Math.tan(MathService.getRad(angle));
    }

    static getSinByDegree(angle: number): number {
        return Math.sin(MathService.getRad(angle));
    }

    static getCosByDegree(angle: number): number {
        return Math.cos(MathService.getRad(angle));
    }

    static rotatePointAroundCenter(x: number, y: number, angle: number): Position {
        let rotatedPoint = {x: x, y: y};
        rotatedPoint.x = MathService.getCosByDegree(angle) * x - MathService.getSinByDegree(angle) * y;
        rotatedPoint.y = MathService.getSinByDegree(angle) * x + MathService.getCosByDegree(angle) * y;
        return rotatedPoint;
    }
}