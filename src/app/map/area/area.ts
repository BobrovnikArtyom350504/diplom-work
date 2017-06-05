import {AreaBlock} from "./area-block";

export class Area {
    private blocks: AreaBlock[][] = [];
    constructor (
        private width: number = 100,
        private length: number = 100,
        blocks?: AreaBlock[][]
    ) {
        if(blocks)
            this.blocks = blocks;
        else
            this.initBlocks();
    }

    setBlock(row: number, col: number, block: AreaBlock) {
        this.blocks[row][col] = block;
    }

    getWidth(): number {
        return this.width;
    }

    getLength(): number {
        return this.length;
    }

    getBlock(row: number, col: number): AreaBlock {
        return this.blocks[row][col];
    }

    private initBlocks() {
        for (let i = 0; i < this.width; i++) {
            this.blocks[i] = [];
            for (let j = 0; j < this.length; j++)
                this.setBlock(i, j, {
                    resistance: 0.5,
                    height: 0
                });
        }
    }
}