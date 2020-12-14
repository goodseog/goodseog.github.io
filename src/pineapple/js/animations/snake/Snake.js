import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js";

export default class Snake {
  constructor(points, length) {
    this.points = points;
    this.length = length;
    this.front = 0;
    this.rear = 0;    
  }

  redraw(ctx, frame) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = Colors.RED;
    ctx.moveTo(...Coord.getPos(new vec2D(...this.points[0])).toArray());
    this.points.forEach((point) => {
      ctx.lineTo(...Coord.getPos(new vec2D(...point)).toArray());
    });
    
    ctx.stroke();
  }
}
