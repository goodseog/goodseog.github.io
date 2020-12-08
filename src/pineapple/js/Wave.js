import Coord from "./Coordinate.js";
import { vec2D } from "/static/js/Vector.js";

export default class Wave {
  constructor(start, end, color) {
    this.start = new vec2D(start[0], start[1]);
    this.end = new vec2D(end[0], end[1]);
    this.color = color;
  }

  redraw(ctx) {
    ctx.beginPath();
    let s = Coord.getPos(this.start);
    let e = Coord.getPos(this.end);
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
