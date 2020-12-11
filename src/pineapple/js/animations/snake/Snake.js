import Coord from "../../Coordinate.js";
import { vec2D } from "/static/js/Vector.js";
import * as Colors from "../../Colors.js"
import { FRAME_PER_POINT } from "./Snakes.js";

export default class Snake {
  constructor(points) {
    this.points = points;
    console.log(this.points);
  }

  redraw(ctx, frame) {
    ctx.beginPath();

    ctx.moveTo(...Coord.getPos(new vec2D(...this.points[0])).toArray());

    this.points.forEach(point => {
      ctx.lineTo(...Coord.getPos(new vec2D(...point)).toArray());
    });
    
    ctx.lineCap = "round";
    ctx.lineWidth = 15;
    ctx.strokeStyle = Colors.RED;
    ctx.stroke();
  }
}
