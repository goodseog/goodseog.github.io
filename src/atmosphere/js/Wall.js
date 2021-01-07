import { vec2D } from "/static/js/Vector.js";

export default class Wall {
  constructor(x1, y1, x2, y2, color = "black") {
    this.type = "wall";
    this.start = new vec2D(x1, y1);
    this.end = new vec2D(x2, y2);
    this.color = color;

    var vec = this.end.sub(this.start);
    this.a = vec.y;
    this.b = -vec.x;
    this.c = -(this.a * x1 + this.b * y1);
    this.normal = new vec2D(this.a, this.b).unit();
  }

  setPos(x1, y1, x2, y2){
    this.start = new vec2D(x1, y1);
    this.end = new vec2D(x2, y2);

    var vec = this.end.sub(this.start);
    this.a = vec.y;
    this.b = -vec.x;
    this.c = -(this.a * x1 + this.b * y1);
    this.normal = new vec2D(this.a, this.b).unit();
  }

  move() {}

  distance(x, y) {
    return (
      Math.abs(this.a * x + this.b * y + this.c) /
      Math.sqrt(this.a ** 2 + this.b ** 2)
    );
  }

  redraw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
  }
}
