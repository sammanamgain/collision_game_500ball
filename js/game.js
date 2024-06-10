const gravity = 9.8;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
import { getRandomColor } from "./utils/getColor";
import { handleCollision } from "./utils/handleCollision";
import { getDistance, isColliding } from "./utils/getDistance";

import { Ball } from "./ball";
const game = document.getElementsByClassName("game")[0];
game.style.border = "3px solid red";
game.style.backgroundColor = "white";

const ballList = [];

function generateBall(radius) {
  const randomX = Math.max(Math.random() * (windowWidth - radius - 20), radius);
  const randomY = Math.max(
    Math.random() * (windowHeight - radius - 20),
    radius
  );
  return {
    position: { x: randomX, y: randomY },
    dimension: { x: radius, y: radius },
    color: getRandomColor(),
  };
}

for (let i = 0; i < 500; i++) {
  //let radius = 20;
  let radius = Math.floor(Math.random() * 10) + 10;
  let ball;
  let attempts = 0;

  do {
    ball = generateBall(radius);
    attempts++;
  } while (
    // .some method return true if one ball also collides
    ballList.some((existingBall) => isColliding(existingBall, ball)) &&
    attempts < 100
  );

  if (attempts < 100) {
    ballList.push(new Ball(ball));
  } else {
    console.log("Failed to place ball without collision after 100 attempts");
  }
}

for (let ball of ballList) {
  game.appendChild(ball.getElement());
}

function Animate() {
  // for (let ball of ballList) {
  //   ball.update();
  // }
  //checkCollisionsInGrid();
  for (let i = 0; i < ballList.length; i++) {
    let ball_first = ballList[i];
    ball_first.update();
    for (let j = i + 1; j < ballList.length; j++) {
      let ball_second = ballList[j];

      let first_center = ball_first.getCenter();
      let second_center = ball_second.getCenter();

      let radiusSum = ball_first.width / 2 + ball_second.width / 2;

      if (getDistance(...first_center, ...second_center) <= radiusSum + 2) {
        let [v1x_final, v1y_final, v2x_final, v2y_final] = handleCollision(
          ball_first,
          ball_second
        );

        ball_first.updateVelocity(v1x_final, v1y_final);
        ball_second.updateVelocity(v2x_final, v2y_final);
      }
    }
  }

  window.requestAnimationFrame(Animate);
}

Animate();
