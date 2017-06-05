import {CommunicationChannel} from '../communication/communication-channel';
import {RobotCommunication} from "./robot-communication";
import {Services} from "../services/id-generator";
import {MapApi} from "../map/map-api";

let robotIdGenerator = new Services.IdGenerator();

export class Robot {
    communication: RobotCommunication;
    movement: any = {};
    getId: () => number;

    constructor(
      mapApi: MapApi
    ) {
        let id = robotIdGenerator.nextId();
        this.getId = () => {
            return id;
        };
        this.movement.move = (speed: number) => mapApi.move(id, speed);
        this.movement.rotate = (angle: number) => mapApi.rotate(id, angle);
        this.communication = new RobotCommunication(id);
    }
}
