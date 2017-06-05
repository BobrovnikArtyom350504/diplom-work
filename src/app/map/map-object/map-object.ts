import {Geolocation} from "../geolocation";
export class MapObject {
    constructor(
        public geolocation: Geolocation,
        public readonly maxInclineAngle: number,
        public readonly size: number
    ) {
    }
}