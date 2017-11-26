var previousPosition = undefined;
while(true) {
  const geolocation = robot.getLocation();
  const position = {x: geolocation.x, y: geolocation.y};
  if (!previousPosition || (previousPosition.x !== position.x || previousPosition.y !== position.y)) {
    previousPosition = position;
    const tangens = (target.x - geolocation.x) / (target.y - geolocation.y);
    const angle = Math.atan(tangens);
    let angleInDegree = angle * 180 / Math.PI;
    if (target.y < position.y && target.x < position.x) {
      angleInDegree *= -1;
    }
    if (target.y > position.y && target.x < position.x) {
      angleInDegree *= -1;
      angleInDegree += 180;
      console.log(angleInDegree);
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
    robot.movement.move(50);
  } else { previousPosition = position; robot.movement.move(-70); robot.movement.rotateOn(-30); robot.movement.move(50); }
}
