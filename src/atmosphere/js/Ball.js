import { vec2D } from "/static/js/Vector.js";

export default class Ball {
  constructor(x, y, r, vx, vy, color = "black") {
    this.type = "ball";
    this.pos = new vec2D(x, y);
    this.r = r || 1;
    this.m = 1;
    this.vel = new vec2D(vx, vy);
    this.color = color;
  }

  move() {
    this.pos = this.pos.add(this.vel);
  }

  redraw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
