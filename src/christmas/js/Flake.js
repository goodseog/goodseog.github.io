import { vec2D } from "/static/js/Vector.js";

export default class Flask {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.dx = (Math.random() - 0.5) * 0.5;
    this.dy = Math.random() * 0.6 + 1.0;
    this.r = 1.5 * Math.random() + 1.5;
  }

  redraw(ctx, width, height) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width) this.x = (this.x + width) % width;
    if (this.y > height) this.y = this.y - height;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
