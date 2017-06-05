import {Area} from "./area";
import {AreaBlock} from "./area-block";
import {AreaView} from "./area-view";
import {Coordinate} from "./coordinate";
import {RockController} from "./rock/rock-controller";
import {Rock} from "./rock/rock";
export class AreaController {
    public area: Area;
    private areaView: AreaView;
    private rocks: RockController[] = [];
    constructor (
        private width: number,
        private length: number,
        private canvasContext: CanvasRenderingContext2D,
        private maxHeight: number,
        private layersCount: number
    ) {
        this.area = new Area(width, length);
        this.areaView = new AreaView(this.area, this.canvasContext, this.maxHeight / this.layersCount, this.layersCount);
    };

    setCanvasContext(canvasContext: CanvasRenderingContext2D) {
      this.canvasContext = canvasContext;
      this.areaView.setCanvasContext(canvasContext);
    }

    setBlock(row: number, col: number, block: AreaBlock) {
        this.area.setBlock(row, col, block);
    }

    updateView(coordinates: Coordinate[]) {
        this.areaView.update(coordinates);
    }

    redraw() {
        this.areaView.redraw();
    }

    popRock() {
      this.deleteRock(this.rocks.pop());
    }

    deleteRock(rockController: RockController) {
      if(rockController) {
        let rock = rockController.rock;
        let coordinates: Coordinate[] = [];
        for(let i = rock.y; i < rock.size + rock.y; i++)
          for(let j = rock.x; j < rock.size + rock.x; j++) {
            coordinates.push({row: i, col: j});
            this.setBlock(i, j, {
              height: 0,
              resistance: 0
            });
          }
          this.updateView(coordinates);
      }
    }

    addRock(rock: Rock) {
        let rockController = new RockController(rock);
        this.rocks.push(rockController);
        let rockHeightMap = rockController.getRockMap();
        let newBlocksCoordinates: Coordinate[] = [];
        for(let i = rock.y; i < rock.size + rock.y; i++)
            for(let j = rock.x; j < rock.size + rock.x; j++) {
                newBlocksCoordinates.push({row: i, col: j});
                this.setBlock(i, j, {
                    height: rockHeightMap[i - rock.y][j - rock.x],
                    resistance: rock.resistance
                });
            }
        this.updateView(newBlocksCoordinates);

    }
}
