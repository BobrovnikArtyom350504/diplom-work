let previousPosition = null;
const {robot} = window;
window.followRoute = function (positions, robot) {
  if (!positions.length) {
    return true;
  }
  const onCheckPoint = moveTo(positions[0], robot);

  if (onCheckPoint) {
    positions.shift();
  }

  return false;
};

function moveTo(destinationPosition, robot) {
  const currentPosition = robot.getLocation();
  if (isPositionEquals(currentPosition, destinationPosition)) {
    return true;
  }

  if (!previousPosition || !isPositionEquals(previousPosition, currentPosition)) {
    robot.movement.rotateTo(getAngleInDegree());
    robot.movement.move(5);
  }

  return false;
}

function isPositionEquals(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

function getAngleInDegree(position1, position2) {
  const angleInRadians = Math.atan2(position2.x - position1.x, position2.y - position1.y);
  let angleInDegree = angleInRadians * 180 / Math.PI;

  return angleInDegree > 0 ? angleInDegree : angleInDegree + 360;
}

