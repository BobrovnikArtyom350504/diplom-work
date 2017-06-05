import {Rock} from "./rock";
import {MathService} from "../../../services/math.service";
export class RockController {
    private rockHeightMap: number[][];
    constructor(public rock: Rock) {
        this.initRockHeightMap();
        this.calcRockMap();
    }

    setRock(rock: Rock) {
        this.rock = rock;
        this.initRockHeightMap();
        this.calcRockMap();
    }

    getRockMap(): number[][] {
        return this.rockHeightMap;
    }

    private initRockHeightMap() {
        this.rockHeightMap = [];
        for (let i = 0; i < this.rock.size; i++)
            this.rockHeightMap[i] = [];
    }

    private setRectBorder(size: number, height: number) {
        let startPosition = (this.rock.size - size) / 2;
        let endPosition = startPosition + size - 1;
        for (let i = startPosition; i <= endPosition; i++) {
            this.rockHeightMap[startPosition][i] = height;
            this.rockHeightMap[endPosition][i] = height;
            this.rockHeightMap[i][startPosition] = height;
            this.rockHeightMap[i][endPosition] = height;
        }
    }

    private setRect(size: number, height: number) {
        let startPosition = (this.rock.size - size) / 2;
        let endPosition = startPosition + size - 1;
        for(let i = startPosition; i <= endPosition; i++)
            for(let j = startPosition; j <= endPosition; j++)
                this.rockHeightMap[i][j] = height;
    }

    private calcRockMap() {
        let offset = 0;
        for (let i = Math.round(this.rock.size / 2); i > 0; i--) {
            let height = (offset / 2) * MathService.getTangensByDegree(this.rock.angel);
            if(offset === 0 && this.rock.angel === 90)
                height = this.rock.height;
            if(height < this.rock.height)
                this.setRectBorder(this.rock.size - offset, height);
            else {
                this.setRect(this.rock.size - offset, this.rock.height);
                break;
            }
            offset+=2;
        }
    }
}
