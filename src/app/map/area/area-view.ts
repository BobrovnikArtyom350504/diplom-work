import {BitmapService} from "../../services/bitmap.service";
import {GradientService} from "../../services/gradient.service";
import {Area} from "./area";
import {Coordinate} from "./coordinate";

export class AreaView {
    private bitmapService: BitmapService;
    private gradientService: GradientService;
    private imageData: any;
    constructor(
        private area: Area,
        private canvasContext: CanvasRenderingContext2D,
        private layerHeight: number,
        private layersCount: number
    ) {
        this.bitmapService = new BitmapService(this.area.getLength(), this.area.getWidth());
        this.gradientService = new GradientService(layersCount);
        this.initBitmap();
        this.render();
    }

    setCanvasContext(canvasContext: CanvasRenderingContext2D) {
      this.canvasContext = canvasContext;
    }

    render() {
        let imageData = new ImageData(this.bitmapService.getBitmap(), this.area.getLength(), this.area.getWidth());
        this.imageData = imageData;
        let canvas = this.canvasContext.canvas;
        this.canvasContext.putImageData(imageData, 0, 0);
        this.canvasContext.drawImage(canvas, 0, 0 , canvas.width, canvas.height);
    }

    redraw() {
        this.canvasContext.putImageData(this.imageData, 0, 0);
        let canvas = this.canvasContext.canvas;
        this.canvasContext.drawImage(canvas, 0, 0 , canvas.width, canvas.height);
    }

    update(coordinates: Coordinate[]) {
        coordinates.forEach(coordinate => this.bitmapService.setColor(coordinate.row, coordinate.col, this.gradientService.getColor(Math.floor(this.area.getBlock(coordinate.row, coordinate.col).height / this.layerHeight))))
        this.render();
    }

    private initBitmap() {
        for(let i = 0 ; i < this.area.getWidth(); i++)
            for (let j = 0; j < this.area.getLength(); j++) {
                this.bitmapService.setColor(i, j, this.gradientService.getColor(Math.floor(this.area.getBlock(i, j).height / this.layerHeight)));
            }
    }
}
