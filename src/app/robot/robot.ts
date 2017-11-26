import {CommunicationChannel} from '../communication/communication-channel';
import {RobotCommunication} from "./robot-communication";
import {Services} from "../services/id-generator";
import {MapApi} from "../map/map-api";

let robotIdGenerator = new Services.IdGenerator();

export class Robot {
    communication: RobotCommunication;
    movement: any = {};
    getId: () => number;
    getLocation: () => {};

    constructor(
      mapApi: MapApi
    ) {
        let id = robotIdGenerator.nextId();
        this.getId = () => {
            return id;
        };
        this.movement.move = (speed: number) => mapApi.move(id, +speed);
        this.movement.rotateTo = (angle: number) => mapApi.rotate(id, +angle);
        this.movement.rotateOn = (angleOffset: number) => mapApi.rotateOn(id, +angleOffset);
        this.getLocation = () => mapApi.getLocation(id);
        this.communication = new RobotCommunication(id);
    }
}
