export function handleCollision(ball_first, ball_second) {
  let [x1, y1] = ball_first.getCenter();
  let [x2, y2] = ball_second.getCenter();
  let [u1x, u1y] = ball_first.getVelocity();
  let [u2x, u2y] = ball_second.getVelocity();
  let m1 = ball_first.mass;
  let m2 = ball_second.mass;

  let dx = x2 - x1;
  let dy = y2 - y1;

  let distance = Math.sqrt(dx * dx + dy * dy);

  let angle = Math.atan2(dy, dx);

  // rotating along the axis of collision
  let u1x_collision = u1x * Math.cos(angle) + u1y * Math.sin(angle);
  let u1y_collision = u1y * Math.cos(angle) - u1x * Math.sin(angle);
  let u2x_collision = u2x * Math.cos(angle) + u2y * Math.sin(angle);
  let u2y_collision = u2y * Math.cos(angle) - u2x * Math.sin(angle);

  // calculating the velocity after collision
  let vx1_collision_final =
    (u1x_collision * (m1 - m2) + 2 * m2 * u2x_collision) / (m1 + m2);
  let vx2_collision_final =
    (u2x_collision * (m2 - m1) + 2 * m1 * u1x_collision) / (m1 + m2);
  let vy1_collision_final = u1y_collision;
  let vy2_collision_final = u2y_collision;

  // rotating back
  let v1x_final =
    vx1_collision_final * Math.cos(-angle) +
    vy1_collision_final * Math.sin(-angle);
  let v1y_final =
    vy1_collision_final * Math.cos(-angle) -
    vx1_collision_final * Math.sin(-angle);
  let v2x_final =
    vx2_collision_final * Math.cos(-angle) +
    vy2_collision_final * Math.sin(-angle);
  let v2y_final =
    vy2_collision_final * Math.cos(-angle) -
    vx2_collision_final * Math.sin(-angle);

  ball_first.updateVelocity(v1x_final, v1y_final);
  ball_second.updateVelocity(v2x_final, v2y_final);

  // Positional correction
  let overlap = ball_first.width + ball_second.width - distance;
  let correctionX = (overlap / 2) * Math.cos(angle);
  let correctionY = (overlap / 2) * Math.sin(angle);

  // Reposition the balls
  // here 5 and 2 are bias value , to restricut the movement to exteme right side and button side
  //
  ball_first.updatePosition(x1 - correctionX - 5, y1 - correctionY - 2);
  ball_second.updatePosition(x2 + correctionX - 5, y2 + correctionY - 2);

  return [v1x_final, v1y_final, v2x_final, v2y_final];
}
