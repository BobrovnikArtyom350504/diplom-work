import Square from './square';
import {MathService} from "./math.service";
import {Direction} from "../map/direction";

export default class SquareMathService {

  static getVertex(square: Square, verticalDirection, horizontalDirection) {

    const center = square.cenrer;
    const size = square.size;

    const x = horizontalDirection === Direction.right ? (size / 2) : (- (size / 2));
    const y = verticalDirection === Direction.back ? (size / 2) : (- (size / 2));
    const angle = square.angle;

    let rotatedPoint = MathService.rotatePointAroundCenter(x, y, angle);
    rotatedPoint.x += center.x;
    rotatedPoint.y += center.y;

    rotatedPoint.x = Math.round(rotatedPoint.x * 1000) / 1000;
    rotatedPoint.y = Math.round(rotatedPoint.y * 1000) / 1000;

    return rotatedPoint;

  }

  static getVertices(square: Square) {
    let vertices = [];
    let squareMathService = this;
    vertices.push(
      {
        position: squareMathService.getVertex(square, Direction.forward, Direction.left),
        horizontalDirection: Direction.left,
        verticalDirection: Direction.forward
      }
    );
    vertices.push(
      {
        position: squareMathService.getVertex(square, Direction.forward, Direction.right),
        horizontalDirection: Direction.right,
        verticalDirection: Direction.forward
      }
    );
    vertices.push(
      {
        position: squareMathService.getVertex(square, Direction.back, Direction.left),
        horizontalDirection: Direction.left,
        verticalDirection: Direction.back
      }
    );
    vertices.push(
      {
        position: squareMathService.getVertex(square, Direction.back, Direction.right),
        horizontalDirection: Direction.right,
        verticalDirection: Direction.back
      }
    );

    return vertices;

  }

    static isIntersect(square1: Square, square2: Square) {

    const vertices1 = this.getVertices(square1).map(vertex => [vertex.position.x, vertex.position.y]);
    const vertices2 = this.getVertices(square2).map(vertex => [vertex.position.x, vertex.position.y]);

    const isIntersect = window.rectanglesIntersect(vertices1, vertices2);

    return isIntersect;

  }
}
