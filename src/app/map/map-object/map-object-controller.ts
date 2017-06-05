import {MapObject} from "./map-object";
import {MapObjectView} from "./map-object-view";
import {Direction} from "../direction";
import {MathService} from "../../services/math.service";
import {Wheel} from "../wheel";

export class MapObjectController {
    public view: MapObjectView;
    constructor(
        public object: MapObject,
        canvasContext: CanvasRenderingContext2D
    ) {
        this.view = new MapObjectView(canvasContext, this.object);
        this.view.render();
    }

    move(x: number, y: number) {
        this.object.geolocation.x = x;
        this.object.geolocation.y = y;
        this.view.render();
    }

    setCanvasContext(canvasContext: CanvasRenderingContext2D) {
      this.view.canvasContext = canvasContext;
    }

    rotate(angle: number) {
        this.object.geolocation.angle = angle;
        this.view.render();
    }

    private getWheelPosition(verticalDirection: number, horizontalDirection: number, angle?: number) {
        let geolocation = this.object.geolocation;
        let size = this.object.size;
        let x = - size / 2;
        let y = - size / 2;
        angle = angle || geolocation.angle;
        if(verticalDirection === Direction.back)
            y *= -1;
        if(horizontalDirection === Direction.right)
            x *= -1;
        let rotatedPoint = MathService.rotatePointAroundCenter(x, y, angle);
        rotatedPoint.x += geolocation.x;
        rotatedPoint.y += geolocation.y;
        rotatedPoint.x = Math.round(rotatedPoint.x * 1000) / 1000;
        rotatedPoint.y = Math.round(rotatedPoint.y * 1000) / 1000;
        return rotatedPoint;
    }

    getWheelsPosition(angle?: number): Wheel[] {
        let wheelsPosition = [];
        angle = angle || this.object.geolocation.angle;
        wheelsPosition.push(
            {
                position: this.getWheelPosition(Direction.forward, Direction.left, angle),
                horizontalDirection: Direction.left,
                verticalDirection: Direction.forward
            }
        );
        wheelsPosition.push(
            {
                position: this.getWheelPosition(Direction.forward, Direction.right, angle),
                horizontalDirection: Direction.right,
                verticalDirection: Direction.forward
            }
        );
        wheelsPosition.push(
            {
                position: this.getWheelPosition(Direction.back, Direction.left, angle),
                horizontalDirection: Direction.left,
                verticalDirection: Direction.back
            }
        );
        wheelsPosition.push(
            {
                position: this.getWheelPosition(Direction.back, Direction.right, angle),
                horizontalDirection: Direction.right,
                verticalDirection: Direction.back
            }
        );
        return wheelsPosition;
    }
}
