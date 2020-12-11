import { vec2D } from "/static/js/Vector.js";
import Coord from "../../Coordinate.js";
import { EDGES, FRAMES } from "./Waves.js";

const WAVE_HEIGHT = 15;

export default class Wave {
  constructor(start, end, color, pointCnt) {
    this.start = new vec2D(start[0], start[1]);
    this.end = new vec2D(end[0], end[1]);
    this.color = color;
    this.points = [];
    for (let i = 0; i < pointCnt; i++) {
      this.points.push(movingPoint(EDGES, FRAMES));
    }
  }

  redraw(ctx, frame) {
    let s = Coord.getPos(this.start);
    let e = Coord.getPos(this.end);

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
    ctx.lineWidth = 1;
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
      next = a.add(b).subtract(new vec2D(0, point[frame] * WAVE_HEIGHT));
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
    ctx.strokeStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }
}

function movingPoint(edges, frames) {
  let heights = [];
  let curr = 0.0;
  for (let edge = 0; edge < edges; edge++) {
    let next = Math.random() * 0.9 + 0.1;
    for (let i = 0; i < frames; i++) {
      heights.push((curr * (frames - i) + next * i) / frames);
    }
    curr = next;
  }

  for (let i = 0; i <= frames; i++) {
    heights.push((curr * (frames - i)) / frames);
  }

  return heights;
}
