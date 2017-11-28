import {Map} from "./map";
import {MathService} from "../services/math.service";
import {AreaBlock} from "./area/area-block";
import {Position} from "./position";
import SquaerService from '../services/square-math.service';
import {MapObject} from "./map-object/map-object";

export class MapApi {
    constructor(
        private map: Map
    ){
    }

    move(id: number, speed: number) {
        let position = this.getMaxPosition(id, speed);
        this.map.areaController.redraw();
        this.map.objects[id].move(position.x, position.y);
    }

    getMaxPosition(id: number, speed: number): Position {
        let object = this.map.objects[id].object;
        let angle = object.geolocation.angle;
        let maxInclineAngle = object.maxInclineAngle;
        let position =  {
            x: object.geolocation.x,
            y: object.geolocation.y
        };
        let offsetX = Math.round(MathService.getSinByDegree(angle) * 1000) /1000;
        let offsetY = Math.round(-MathService.getCosByDegree(angle)* 1000) /1000;
        let pixels = 1;
        let smth = speed;
        while(smth > 0) {
            if(this.isInMap(id, angle, offsetX * pixels, offsetY * pixels)) {
                // console.log(Math.floor(position.y))
                let resistance = this.getBlock(Math.floor(position.y),
                                                Math.floor(position.x)).resistance;
                if(resistance === 0)
                    smth -= 1;
                else
                    smth -= 1 / resistance;
                if(smth >= 0) {
                    if (this.getInclineAngle(id, angle, offsetX * pixels, offsetY * pixels) < maxInclineAngle && !this.isIntersectRobots(id, angle, offsetX, offsetY)) {
                      position.y += offsetY;
                      position.x += offsetX;
                      pixels ++;
                    }
                    else {
                        return position;
                    }
                }
            } else {
                return position;
            }
        }
        return position;
    }

    isIntersectRobots(id: number, angle: number, offsetX: number, offsetY: number) {

      let isIntersect = false;

      const robotRect = this.getRobotRect(id, angle, offsetX, offsetY);

      this.map.objects.forEach((objectController, index) => {
        if (id !== index) {
          if(SquaerService.isIntersect(this.getRobotRect(index), robotRect)) {
            isIntersect = true;
          }
        }
      });

      return isIntersect;

    }

    getRobotRect(id: number, angle?: number, offsetX: number = 0, offsetY: number = 0) {

      const robot = this.map.objects[id].object;
      angle = angle || robot.geolocation.angle;

      const robotRect = {
        cenrer: {
          x: robot.geolocation.x += offsetX,
          y: robot.geolocation.y += offsetY
        },
        angle: angle,
        size: robot.size
      };

      return robotRect;

    }

    isInMap(id: number, angle?: number, offsetX: number = 0, offsetY: number = 0) {
        angle = angle || this.map.objects[id].object.geolocation.angle;
        let wheels = this.map.objects[id].getWheelsPosition(angle);
        wheels.forEach(wheel => {
            wheel.position.x += offsetX;
            wheel.position.y += offsetY;
        });
        for (let wheel of wheels) {
            if(wheel.position.x < 0 ||
                wheel.position.x >= this.map.areaController.area.getLength() ||
                wheel.position.y < 0 ||
                wheel.position.y >= this.map.areaController.area.getWidth()) {
                return false
            }
        }
        return true;
    }

    rotate(id: number, angle: number) {
        let wheels = this.map.objects[id].getWheelsPosition(angle);
        let isValidRotate = true;
        if(!this.isInMap(id, angle)) isValidRotate = false;
        if (this.getInclineAngle(id, angle) > this.map.objects[id].object.maxInclineAngle && this.isIntersectRobots(id, angle, 0, 0))
            isValidRotate = false;
        if(isValidRotate) {
            this.map.areaController.redraw();
            this.map.objects[id].rotate(angle);
        }
    }

    rotateOn(id: number, angleOffset: number) {
          let angle = this.map.objects[id].object.geolocation.angle + angleOffset;
          this.rotate(id, angle);
    }

    getLocation(id: number) {
          let object = this.map.objects[id].object;
          let geolaction = object.geolocation;
          let inclineAngle = this.getInclineAngle(id);
          let centerHeight = this.getBlock(Math.floor(geolaction.y), Math.floor(geolaction.x)).height;
          let location = {
              x: geolaction.x,
              y: geolaction.y,
              angle: geolaction.angle,
              inclineAngle: inclineAngle,
              centerHeight: centerHeight
          };
          return location;
    }

    private getBlock(row: number, col: number): AreaBlock{
        return this.map.areaController.area.getBlock(row, col);
    }

    private getInclineAngle(id: number, angle?: number, offsetX: number = 0, offsetY: number = 0) {
        angle = angle || this.map.objects[id].object.geolocation.angle;
        let wheels = this.map.objects[id].getWheelsPosition(angle);
        wheels.forEach(wheel=> {
            wheel.position.x += offsetX;
            wheel.position.y += offsetY;
        });
        let bottomWheel = wheels[0];
        let topWheel = wheels[0];
        let bottom = this.getBlock(Math.floor(bottomWheel.position.y), Math.floor(bottomWheel.position.x)).height;
        let top = bottom;
        wheels.forEach(wheel => {
            let row = Math.floor(wheel.position.y);
            let col = Math.floor(wheel.position.x);
            let height = this.getBlock(row, col).height;
            if(height < bottom) {
                bottom = height;
                bottomWheel = wheel;
            }
            if(height > top) {
                top = height;
                topWheel = wheel;
            }
        });
        let inclineAngle = 0;
        if(bottomWheel.verticalDirection === topWheel.verticalDirection ||
            bottomWheel.horizontalDirection === topWheel.horizontalDirection)
            inclineAngle = MathService.getDeg(Math.asin((top - bottom) / this.map.objects[id].object.size));
        else
            inclineAngle = MathService.getDeg(Math.asin((top - bottom) / Math.sqrt(2) * this.map.objects[id].object.size));
        return inclineAngle;
    }

}
