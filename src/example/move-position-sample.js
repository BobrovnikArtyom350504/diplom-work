var previousPosition = undefined;
var angleInDegree = 0;
while(true) {
  const geolocation = robot.getLocation();
  const position = {x: geolocation.x, y: geolocation.y};
  if (!previousPosition || (previousPosition.x !== position.x || previousPosition.y !== position.y)) {
    previousPosition = position;
    const tangens = (target.x - geolocation.x) / (target.y - geolocation.y);
    const angle = Math.atan(tangens);
    angleInDegree = angle * 180 / Math.PI;
    if (target.y < position.y && target.x > position.x) {
      angleInDegree *= -1;
    }
    if (target.y < position.y && target.x < position.x) {
      angleInDegree = 360 - angleInDegree;
    }
    if (target.y > position.y && target.x < position.x) {
      angleInDegree *= -1;
      angleInDegree += 180;
    }
    if (target.y > position.y && target.x > position.x) {
      angleInDegree = 180 - angleInDegree;
    }
    if(target.y === position.y) {
      if(target.x < position.x) angleInDegree = 270;
      if(target.x > position.x) angleInDegree = 90;
    }
    if(target.x === position.x) {
      if(target.y < position.y) angleInDegree = 0;
      if(target.y > position.y) angleInDegree = 180;
    }
    robot.movement.rotateTo(angleInDegree);
    robot.movement.move(5);
  } else { previousPosition = position;
    if(angleInDegree <= 90) { robot.movement.rotateTo(90);
      robot.movement.move(5);
      let pos = robot.getLocation();
      if(previousPosition.x === pos.x && previousPosition.y===pos.y) {
        robot.movement.rotateTo(0);
        robot.movement.move(5);
      }
    } else if(angleInDegree > 90 && angleInDegree <= 180) { robot.movement.rotateTo(90);
      robot.movement.move(5);
      let pos = robot.getLocation();
      if(previousPosition.x === pos.x && previousPosition.y===pos.y) {
        robot.movement.rotateTo(180);
        robot.movement.move(5);
      }
    } else if(angleInDegree > 180 && angleInDegree <= 270) { robot.movement.rotateTo(180);
      robot.movement.move(5);
      let pos = robot.getLocation();
      if(previousPosition.x === pos.x && previousPosition.y===pos.y) {
        robot.movement.rotateTo(270);
        robot.movement.move(5);
      }
    } else if(angleInDegree > 270) { robot.movement.rotateTo(0);
      robot.movement.move(5);
      let pos = robot.getLocation();
      if(previousPosition.x === pos.x && previousPosition.y===pos.y) {
        robot.movement.rotateTo(270);
        robot.movement.move(5);
      }
    }

  }
}
