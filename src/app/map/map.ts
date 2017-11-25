import {Rock} from './area/rock/rock';
import {AreaController} from './area/area-controller';
import {MapObjectController} from './map-object/map-object-controller';
import {MapObject} from './map-object/map-object';
import MapSettings from  './map-settings';

export class Map {
    public areaController: AreaController;
    public objects: MapObjectController[] = [];

    constructor(
        private width: number,
        private length: number,
        private maxHeight: number,
        private layerNumber: number,
        public canvasContext: CanvasRenderingContext2D
    ) {
        this.areaController = new AreaController(this.width, this.length, this.canvasContext, this.maxHeight, layerNumber);
    }

    setCanvasContext(canvasContext: CanvasRenderingContext2D) {
      this.canvasContext = canvasContext;
      this.areaController.setCanvasContext(canvasContext);
      this.objects.forEach(object => object.setCanvasContext(canvasContext));
    }

    addRock(rock: Rock) {
        this.areaController.addRock(rock);
    }

    popRock() {
      this.areaController.popRock();
    }

    addObject(object: MapObject): number {
        let controller = new MapObjectController(object, this.canvasContext);
        this.objects.push(controller);
        return (this.objects.length - 1);
    }

    popObject() {
      this.objects.pop();
    }

    getSettings(): MapSettings {

      let map = this;
      const settings = {
        width: map.width,
        length: map.length,
        maxHeight: map.maxHeight,
        layersCount: map.layerNumber
      };

      return settings;

    }

    getRocks(): Rock[] {

      let rocks = this.areaController.getRocks();

      return rocks;

    }
}
