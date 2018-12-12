import { MapMark } from './map-mark';
import { Position } from '../position';
import { getDistance } from '../../services/distance.service';

export class MapMarks {
  private marks: Map<string, Array<MapMark>>;

  constructor() {
    this.marks = new Map();
  }

  public addMark(mark: MapMark) {
    const { type } = mark;
    if (!this.marks.has(type.name)) {
      this.marks.set(type.name, []);
    }

    this.marks.get(mark.type.name).push(mark);
  }

  public removeMark(mark: MapMark) {
    const marks = this.marks.get(mark.type.name);

    marks.splice(marks.indexOf(mark), 1);
  }

  public getNearest(position: Position, type: string) {
    const marks = this.getMarks(type);

    let nearestMark: MapMark;
    let minDistance: number = Infinity;

    marks.forEach(mark => {
      if (getDistance(position, mark.position) < minDistance) {
        nearestMark = mark;
      }
    });

    return {
      distance: minDistance,
      mark: nearestMark
    };
  }

  public getMarks(type: string) {
    return this.marks.get(type);
  }

  public getAllMarks() {
    let marks: Array<MapMark> = [];
    this.marks.forEach(typeMarks => { marks = marks.concat(typeMarks); });

    return marks;
  }
}

