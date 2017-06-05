import {MapObject} from "./map-object";
import {MathService} from "../../services/math.service";
import {Geolocation} from "../geolocation";
export class MapObjectView {
    public readonly frontMarkSize: number = 2;
    constructor
    (
        public canvasContext: CanvasRenderingContext2D,
        public object: MapObject,
    ) {

    }
    private initObjectPaint() {
        this.canvasContext.strokeStyle = '#ffffff';
        this.canvasContext.fillStyle = '#f4f4f4';
    }

    private initFrontMarkPaint() {
        this.canvasContext.fillStyle = 'black';
    }

    private drawObject() {
        this.initObjectPaint();
        let margin = -this.object.size / 2;
        this.canvasContext.strokeRect(margin, margin,
            this.object.size, this.object.size);
        this.canvasContext.fillRect(margin + 1, margin + 1,
            this.object.size - 2, this.object.size - 2);
    }
    private drawFrontMark() {
        this.initFrontMarkPaint();
        let margin = -this.object.size / 2
        let x = margin + this.object.size / 2 - this.frontMarkSize / 2;
        let y = margin + 1;
        this.canvasContext.fillRect(x, y, this.frontMarkSize, this.frontMarkSize);
    }
    render() {
        this.canvasContext.save();
        this.canvasContext.translate(this.object.geolocation.x,
                                    this.object.geolocation.y);
        this.canvasContext.rotate(MathService.getRad(this.object.geolocation.angle));
        this.drawObject();
        this.drawFrontMark();
        this.canvasContext.restore();
    }
}