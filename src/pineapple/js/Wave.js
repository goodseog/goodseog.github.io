import { vec2D } from "/static/js/Vector.js";
import Coord from "./Coordinate.js";
import * as Utils from "./Utils.js";

export default class Wave {
  constructor(start, end, color, pointCnt) {
    this.start = new vec2D(start[0], start[1]);
    this.end = new vec2D(end[0], end[1]);
    this.color = color;
    this.points = [];
    for (let i = 0; i < pointCnt; i++) {
      this.points.push(Utils.movingPoint(5));
    }
  }

  redraw(ctx, frame) {
    let s = Coord.getPos(this.start);
    let e = Coord.getPos(this.end);

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();

    let prev = s;
    let pcnt = this.points.length;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    let a, b, next, cx, cy;
    this.points.forEach((point, idx) => {
      a = s.multiply((pcnt - idx + 1) / (pcnt + 2));
      b = e.multiply((idx + 1) / (pcnt + 2));
      next = a.add(b).subtract(new vec2D(0, point[frame] * 20));
      cx = (prev.x + next.x) / 2;
      cy = (prev.y + next.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
      prev = next;
    });
    cx = (prev.x + e.x) / 2;
    cy = (prev.y + e.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
    ctx.lineTo(e.x, e.y);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }
}
