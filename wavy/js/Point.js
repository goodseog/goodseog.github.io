import { vec2D } from "./Vector.js";

export class Point {
  constructor(center, amp, w, pi) {
    this.center = center || new vec2D(0, 0);
    this.amp = amp || 0;
    this.w = w || 0.1;
    this.pi = pi || 0;
  }

  resize(center) {
    this.center = center;
  }

  update() {
    let angle = Date.now() * 0.001 * this.w + this.pi;
    let ampVec = new vec2D(0, this.amp * Math.sin(angle));
    this.pos = this.center.add(ampVec);
  }

  redraw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
