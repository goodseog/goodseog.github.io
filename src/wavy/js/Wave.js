import { Point } from "./Point.js";
import { vec2D } from "/static/js/Vector.js";

export default class Wave {
  constructor(freq, amp, w, pi, color) {
    this.freq = freq || 4;
    this.amp = amp || 100;

    this.w = w || 4;
    this.pi = pi || 0;
    this.dpi = Math.PI / this.freq;
    this.color = color || "rgba(255, 0, 0, 0.1)"
  }

  genPoints() {
    this.P = [this.start];
    for (let i = 1; i <= this.freq; i++) {
      let center = this.start.center
        .multiply(1 - i / (this.freq + 1))
        .add(this.end.center.multiply(i / (this.freq + 1)));
      this.P.push(new Point(center, this.amp, this.w, this.pi + this.dpi * i));
    }
    this.P.push(this.end);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.start = new Point(new vec2D(0, height / 2), 0, 0, 0);
    this.end = new Point(new vec2D(width, height / 2), 0, 0, 0);
    this.genPoints();
  }

  redraw(ctx) {
    this.P.forEach((point) => {
      point.update();
      // point.redraw(ctx); // Draw points
    });

    ctx.beginPath();
    ctx.moveTo(this.start.center.x, this.start.center.y);
    for (let i = 1; i < this.P.length; i++) {
      let prev = this.P[i - 1];
      let point = this.P[i];
      const cx = (prev.pos.x + point.pos.x) / 2;
      const cy = (prev.pos.y + point.pos.y) / 2;
      ctx.quadraticCurveTo(prev.pos.x, prev.pos.y, cx, cy);
    }
    ctx.lineTo(this.end.pos.x, this.end.pos.y);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(0, this.height);
    ctx.lineTo(0, this.height / 2);
    ctx.fillStyle = this.color
    ctx.fill();

    // Draw center line
    // ctx.beginPath();
    // ctx.moveTo(this.start.center.x, this.start.center.y);
    // ctx.lineTo(this.end.center.x, this.end.center.y);
    // ctx.stroke();
  }
}
