import { MapMarkType } from './map-mark-type';
import { Position } from '../position';

export class MapMark {
  constructor(
    public type: MapMarkType,
    public position: Position,
    public canvasContext: CanvasRenderingContext2D,
  ) {}

  render() {
    const { type, position } = this;
    const { size, color } = type;

    this.canvasContext.strokeStyle = '#ffffff';
    this.canvasContext.fillStyle = color;

    this.canvasContext.save();

    const markPadding = size / 2;
    this.canvasContext.translate(position.x - markPadding, position.y - markPadding);

    this.canvasContext.fillRect(0, 0, size, size);
    this.canvasContext.strokeRect(0, 0, size, size);

    this.canvasContext.restore();
  }

  setCanvasContext(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
  }
}
