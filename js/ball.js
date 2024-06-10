const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export class Ball {
  constructor({ position, dimension, color }) {
    this.position = position;
    this.velocity = {
      vx: (Math.random() - 1) * 2,
      vy: (Math.random() - 0.5) * 2,
    };

    this.height = dimension.y;
    this.width = dimension.x;

    this.color = color || "white";
    this.mass = this.width ** 3 * 0.0001;

    this.draw();
  }

  draw() {
    this.ball = document.createElement("div");
    this.ball.style.width = this.width + "px";
    this.ball.style.height = this.height + "px";
    this.ball.style.position = "absolute";
    this.ball.style.top = this.position.y + "px";
    this.ball.style.left = this.position.x + "px";
    this.ball.style.backgroundColor = `${this.color}`;
    this.ball.style.borderRadius = "50%";

    document.body.appendChild(this.ball);
  }

  update() {
    // Handle horizontal collisions
    if (this.position.x + this.velocity.vx + this.width > windowWidth) {
      this.velocity.vx *= -1;
      this.position.x = windowWidth - this.width;
    } else if (this.position.x + this.velocity.vx < 0) {
      this.velocity.vx *= -1;
      this.position.x = 0;
    } else {
      this.position.x += this.velocity.vx;
    }

    // Handle vertical collisions
    if (this.position.y + this.velocity.vy + this.height > windowHeight) {
      this.velocity.vy *= -1;
      this.position.y = windowHeight - this.height;
    } else if (this.position.y + this.velocity.vy < 0) {
      this.velocity.vy *= -1;
      this.position.y = 0;
    } else {
      this.position.y += this.velocity.vy;
    }

    this.ball.style.left = this.position.x + "px";
    this.ball.style.top = this.position.y + "px";
  }

  updatePosition(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.update();
  }

  updateVelocity(vx, vy) {
    this.velocity.vx = vx;
    this.velocity.vy = vy;
  }

  getElement() {
    return this.ball;
  }

  getCenter() {
    return [
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
    ];
  }

  getVelocity() {
    return [this.velocity.vx, this.velocity.vy];
  }
}
